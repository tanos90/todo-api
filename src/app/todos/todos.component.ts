import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { TodosService } from './shared/todos.service';
import { Todo } from './shared/todo.model';
import { Router } from '@angular/router';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  @ViewChild(TodoComponent, { static: false }) todoComponent: TodoComponent;
  todos: Todo[];
  selectedTodo: Todo;
  showTodoComponent: boolean;
  error: string;

  constructor(
    private ref: ChangeDetectorRef,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todosService.getTodos().subscribe(
      (todos) => (this.todos = todos),
      (error) => (this.error = error)
    );
  }

  onSelect(todo: Todo): void {
    this.showTodoComponent = true;
    this.selectedTodo = todo;
    this.ref.detectChanges();
    this.todoComponent.todo = todo;
    this.todoComponent.initializeTodo();
  }

  deleteTodo(todo: Todo, event): void {
    this.todosService.deleteTodo(todo.id);
    this.getTodos();
  }

  addTodo() {
    this.showTodoComponent = true;
    this.ref.detectChanges();
    this.todoComponent.initializeTodo();
  }

  close(savedTodo: Todo): void {
    this.showTodoComponent = false;
    if (savedTodo) {
      this.getTodos();
    }
  }
}
