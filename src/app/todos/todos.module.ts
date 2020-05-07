import { NgModule } from '@angular/core';

import { TodosComponent } from './todos.component';

import { SharedModule } from '../shared/shared.module';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';
import { MaterialModule } from '../shared/material.module';
import { TodosRoutingModule } from './todos.routing.module';
import { TodoComponent } from './todo/todo.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TodosComponent, TodoFilterComponent, TodoComponent],
  imports: [SharedModule, MaterialModule, TodosRoutingModule, CommonModule],
  providers: [],
  bootstrap: [TodosComponent],
})
export class TodosModule {}
