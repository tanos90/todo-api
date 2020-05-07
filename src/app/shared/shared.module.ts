import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TodosService } from '../todos/shared/todos.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [ReactiveFormsModule, HttpClientModule],
  providers: [TodosService],
  exports: [ReactiveFormsModule, HttpClientModule],
})
export class SharedModule {}
