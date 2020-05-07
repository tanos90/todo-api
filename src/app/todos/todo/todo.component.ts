import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Todo } from '../shared/todo.model';
import { TodosService } from '../shared/todos.service';
import { randomId } from '../../shared/helpers/random-id-generator';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() closeTodo = new EventEmitter();

  todoItem = '';
  errorMessage = '';
  dynamicForm: FormGroup;
  submitted = false;
  currentItems = [];

  error: any;
  navigated = false;

  get f() {
    return this.dynamicForm.controls;
  }
  get i() {
    return this.f.items as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      todoName: ['', Validators.required],
      items: new FormArray([]),
    });

    // this.dynamicForm = this.formBuilder.group({
    //   todoNumber: [
    //     '',
    //     Validators.pattern('^[-+]?(?:[0-9]+,)*[0-9]+(?:.[0-9]+)?$'),
    //   ],
    // });
  }

  initializeTodo() {
    if (this.i.length > 0) {
      this.clearFormArray(this.i);
    }
    if (this.todo && this.todo.id) {
      this.navigated = true;
      this.f.todoName.setValue(this.todo.name);
      this.todo.items.forEach((item) => this.onAddItem(item));
    } else {
      this.navigated = false;
      this.todo = new Todo();
    }
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  onAddItem(item: Item = null) {
    this.i.push(
      this.formBuilder.group({
        name: [item?.name, Validators.required],
        status: [item?.status],
      })
    );
  }

  todoSubmit(): void {
    if (this.dynamicForm.valid) {
      this.errorMessage = '';

      if (this.todo.id) {
        this.updateTodo();
      } else {
        this.addTodo();
      }
      this.goBack();
    } else {
      this.todoItem = '';
      this.errorMessage = 'Todo Name is required';
    }
  }

  addTodo(): void {
    const newTodo = new Todo({
      name: this.f.todoName.value,
      id: randomId(),
      items: [],
    });

    const items = this.f.items.value;
    if (items.length > 0) {
      items.forEach((item) => {
        newTodo.items.push(item as Item);
      });
    }
    this.todosService.addTodo(newTodo);
  }

  updateTodo(): void {
    this.todo.items = [];
    const items = this.f.items.value;
    if (items.length > 0) {
      items.forEach((item) => {
        this.todo.items.push(item as Item);
      });
    }
    this.todosService.updateTodo(this.todo);
  }

  goBack(savedTodo: Todo = null): void {
    this.closeTodo.emit(savedTodo);
  }
}
