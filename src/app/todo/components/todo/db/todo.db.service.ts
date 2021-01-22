import { Injectable } from '@angular/core';
import { RxCollection } from 'rxdb';
import { Observable } from 'rxjs';
import { AppDbService } from 'src/app/database/app.db.service';
import RxCollectionsEnum from 'src/app/database/collections.enum';
import TodoType from 'src/app/todo/types/todo.type';

@Injectable()
export default class TodoDbService {
  protected collection!: RxCollection;

  constructor(private dbService: AppDbService) { }

  getTodoItems(): Observable<TodoType[]> {
    console.log(RxCollectionsEnum.Todos, 'collection')
    return  this.dbService.collection(RxCollectionsEnum.Todos).find().$;
  }
  getDoneTodoItems(): Observable<TodoType[]> {
    return this.dbService.collection(RxCollectionsEnum.Todos).find({ selector: {isCompleted: true } }).$;
  }

  async createTodoItem(title: string): Promise<void> {
    this.dbService.collection(RxCollectionsEnum.Todos).insert({
      title,
      id: new Date().toString(),
    });
  }

  async updateTodoStatus(todoId: string, status: boolean): Promise<void> {
    const query = this.dbService.collection(RxCollectionsEnum.Todos).findOne({ selector: {id: todoId } });
    const newValues = { isCompleted: status };
    await query.update({ $set: newValues });
  }
  
}
