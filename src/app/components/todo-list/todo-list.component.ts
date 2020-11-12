import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ITodo } from 'src/app/models/todo.model';
import { TodoListService } from 'src/app/services/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChildren('editInput')
  public input: QueryList<any>;
  private sub: Subscription;
  public todoForm: FormGroup = this.fb.group({
    addTodo: ['', Validators.required],
  });

  public editTodoForm: FormGroup = this.fb.group({
    editTodo: ['', Validators.required]
  });

  private userId = 0;
  public todos = [];

  constructor(private fb: FormBuilder,
              private todoService: TodoListService) { }

  public ngOnInit(): void {
    this.showTodos();
  }

  private showTodos(): void {
    this.sub = this.todoService.showTodos().subscribe(todos => {
      this.todos = [...todos];
    });
  }

  public onTodoAdd(): void {
    const todoData = {
      userId: this.userId,
      title: this.todoForm.value.addTodo,
      completed: false
    };
    this.todos.unshift(todoData);
    this.sub = this.todoService.addTodo(todoData).subscribe();
    this.todoForm.reset();
  }

  public completeTodo(todo: ITodo, id: number): void {
    todo.completed = !todo.completed;
    this.sub = this.todoService.editTodo(todo, id).subscribe();
  }

  // I know todo.id is undefined, but Jsnoplaceholder is mocked API,
  // and it always return id 201, so i made it like it should be, pass id in method

  public deleteTodo(id: number, index: number): void {
    this.todos.splice(index, 1);
    this.sub = this.todoService.removeTodo(id).subscribe();
  }

  public editTodo(todo: ITodo, id: number): void {
    this.todos = this.todos.map(item => {
      item.isEdit = item.id === id && !item.isEdit;
      return item;
    });
    this.editTodoForm.controls.editTodo.valueChanges.subscribe(inputValue => inputValue = todo.title);
  }

  public submitEdit(todo: ITodo, id: number): void {
    this.sub = this.todoService.editTodo(todo, id).subscribe();
    todo.title = this.editTodoForm.value.editTodo;
    todo.isEdit = false;
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
