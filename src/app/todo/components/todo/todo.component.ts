import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AppDbService } from "src/app/database/app.db.service";
import TodoType from "../../types/todo.type";
import TodoDbService from "./db/todo.db.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoDbService],
})
export default class TodoComponent implements OnInit {
  
  todoItems$!: Observable<TodoType[]>;
  completedItems$!: Observable<TodoType[]>;
  newTodo = 'new item';

  constructor(
    private todoDbService: TodoDbService,
    private appDbService: AppDbService,
    ) {}

  async ngOnInit(): Promise<void> {
    this.todoItems$ = this.todoDbService.getTodoItems();
    this.completedItems$ = this.todoDbService.getDoneTodoItems();
  }

  async addNewTodo(): Promise<void> {
    await this.todoDbService.createTodoItem(this.newTodo);
    this.newTodo = '';
  }

  async toggleStatus(todo: TodoType): Promise<void> {
    await this.todoDbService.updateTodoStatus(todo.id, !todo.isCompleted);
  }

  async dump(): Promise<void> {
    await this.appDbService.dumpDb();
  }
  async restore(): Promise<void> {
    await this.appDbService.restoreDb();
  }
  async remove(): Promise<void> {
    await this.appDbService.clearDb();
  }
}