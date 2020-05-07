import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { last } from 'rxjs/operators';
import { Item } from './item.model';
import { randomId } from '../../shared/helpers/random-id-generator';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  /**
   *
   */

  todos: Todo[];

  private todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private http: HttpClient) {
    this.todos = this.mockTodos();
    this.todos$.next(this.todos);
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.todos$.next(this.todos);
  }

  updateTodo(todo: Todo) {
    this.todos.forEach((t, i) => {
      if (t.id === todo.id) {
        this.todos[i] = todo;
      }
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$.asObservable();
  }

  getTodo(id: string): Observable<Todo> {
    this.getTodos().subscribe((resp) => {
      return resp.find((todo) => todo.id === id);
    });
    return null;
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.todos$.next(this.todos);
  }

  mockTodos(): Todo[] {
    return [
      new Todo({
        id: randomId(),
        name: 'Shop List',
        items: [new Item({ name: 'Milk', status: true })],
      }),
      new Todo({
        id: randomId(),
        name: 'Chores',
        items: [new Item({ name: 'Mop floors', status: false })],
      }),
    ];
  }
}
