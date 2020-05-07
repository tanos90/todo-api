import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodosComponent } from './todos.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', component: TodosComponent },
  { path: 'todo/:id', component: TodoComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class TodosRoutingModule {}
