import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';


const routes: Routes = [
  { path: '', component: SignUpComponent},
  { path: 'todo', component: TodoListComponent},
  { path: '**',  redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
