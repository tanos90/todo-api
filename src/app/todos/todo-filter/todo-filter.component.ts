import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent implements OnInit {
  @Input() todos: Todo[];
  searchText = new FormControl();

  searchForm: FormGroup = this.formBuilder.group({
    searchText: this.searchText,
  });
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.init();
  }

  init() {
    this.searchText.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((text: any) => {
          return this.filterTodos(text.toLowerCase());
        })
      )
      .subscribe();
  }

  filterTodos(text) {
    return this.todos.map((todo) => {
      todo.show = todo.name.toLowerCase().indexOf(text) > -1;
      return todo;
    });
  }
}
