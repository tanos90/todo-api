import { TestBed, async, tick } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TodosService } from './shared/todos.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let testData: any;
  let todosService: any;
  let sendTodo: any;
  let fixture: any;
  let todoedItemEl: any;
  beforeEach(async(() => {
    testData = { res: '123,124,125' };

    todosService = jasmine.createSpyObj('todosService', ['sendTodo']);
    sendTodo = todosService.sendTodo.and.returnValue(of(testData));

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, FormsModule],
      providers: [{ provide: TodosService, useValue: todosService }],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  it('should create the todos', async () => {
    fixture = TestBed.createComponent(TodosComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should send the todo and receive it sorted', async () => {
    fixture = TestBed.createComponent(AppComponent);

    const component = fixture.componentInstance;
    component.todoForm = {};
    console.log(component.todoForm);
    component.todoForm.valid = true;
    component.todoForm.value = {};
    component.todoForm.value.TodoNumber = '123';
    component.submitTodo('123');

    fixture.detectChanges();

    todoedItemEl = fixture.nativeElement.querySelector('.todoed-item');
    expect(todoedItemEl.textContent).toBe(`Todoed Item: ${testData.res}`);
  });
});
