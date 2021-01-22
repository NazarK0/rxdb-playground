import { Injectable } from '@angular/core';
import { RxCollection } from 'rxdb';
import { Observable } from 'rxjs';
import { DatabaseHardService } from 'src/app/database/services/databasehard.service';
import RxDbService from 'src/app/database/services/rxdb.service';
import { TodoType, SyncStatusEnum } from 'src/app/database/types/documents/todo.rx-document';
import RxCollectionsEnum from '../../../../database/types/collections/collections.enum';

@Injectable()
export default class TodoDbService {
  protected collection!: RxCollection;

  constructor(private dbService: DatabaseHardService) {
    // this.collection = dbService.db[RxCollectionsEnum.Todo];
    
  }

  getTodoItems(): Observable<TodoType[]> {
    return  this.dbService.db.todos.find().$;
  }
  getDoneTodoItems(): Observable<TodoType[]> {
    return this.dbService.db.todos.find({ selector: {isCompleted: true } }).$;
  }
  async getUnsyncedItems(): Promise<TodoType[]> {
    const items = this.dbService.db.todos
      .find({ selector: {syncStatus: SyncStatusEnum.NeedSync } })
      .exec();

      return items;
  }

  async createTodoItem(title: string, isCompleted=false): Promise<void> {
    this.dbService.db.todos.insert({
      title,
      id: new Date().toString(),
      isCompleted,
      syncStatus: SyncStatusEnum.NeedSync,
    });
  }

  async updateTodoStatus(todoId: string, status: boolean): Promise<void> {
    const query = this.dbService.db.todos.findOne({ selector: {id: todoId } });
    const newValues = { isCompleted: status, syncStatus: SyncStatusEnum.NeedSync};
    await query.update({ $set: newValues });
  }
  
}
