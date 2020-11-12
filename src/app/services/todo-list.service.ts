import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/backend.constant';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient) { }

  public showTodos(): Observable<any> {
    return this.http.get(`${API.backendLink}todos?userId=1&_page=1&_limit=3`);
  }

  public addTodo(todo: ITodo): Observable<object> {
    return this.http.post(`${API.backendLink}todos`, todo);
  }

  public editTodo(todo: ITodo, id: number): Observable<object> {
    return this.http.patch(`${API.backendLink}todos/${id}`, todo);
  }

  public removeTodo(id: number): Observable<object> {
    return this.http.delete(`${API.backendLink}todos/${id}`);
  }
}
