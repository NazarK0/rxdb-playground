import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import RxDbService from './database/services/rxdb.service';
import { TodoType } from './database/types/documents/todo.rx-document';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'new-app';
  todoItems$!: Observable<TodoType[]>;
  completedItems$!: Observable<TodoType[]>;
  newTodo = 'new itemmm';

  constructor(private rxdbService: RxDbService) {}

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.rxdbService.ensureDbIsCreated();
    this.todoItems$ = this.rxdbService.getTodoItems();
    this.completedItems$ = this.rxdbService.getDoneTodoItems();

    this.rxdbService.getTodoItems().subscribe((data) => {
      console.log('data', data)
    })
  }

  async addNewTodo(): Promise<void> {
    await this.rxdbService.createTodoItem(this.newTodo);
    this.newTodo = '';
  }

  async toggleStatus(todo: TodoType): Promise<void> {
    await this.rxdbService.updateTodoStatus(todo.id, !todo.isCompleted);
  }
}
