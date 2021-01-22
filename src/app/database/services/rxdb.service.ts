import { RxCollection } from 'rxdb';
import { SyncStatusEnum } from './../types/documents/todo.rx-document';
import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { Observable } from 'rxjs';
import pouchdb from 'pouchdb-adapter-idb';
import todoSchema from '../schemas/todo.schema';
import { TodoType } from '../types/documents/todo.rx-document';
import { RxAppCollectionsType } from '../types/RxDB';
import RxCollectionsEnum from '../types/collections/collections.enum';

@Injectable({
  providedIn: 'root'
})
export default class RxDbService {
  protected appCollections!: RxAppCollectionsType;
  protected database!: RxDatabase<RxAppCollectionsType>;

  async ensureDbIsCreated() {
    if (this.appCollections) {
      return;
    }

    addRxPlugin(pouchdb);
    this.database = await createRxDatabase<RxAppCollectionsType>({
      name: 'appdb',           // <- name
      adapter: 'idb',          // <- storage-adapter
      password: 'TacticVITIProject',     // <- password (optional)
      multiInstance: false,         // <- multiInstance (optional, default: true)
      eventReduce: true // <- eventReduce (optional, default: true)
    });

    this.appCollections = await this.database.addCollections({
      todos: { schema: todoSchema, },
    });
  }

  // getTodoItems(): Observable<TodoType[]> {
  //   return this.appCollections.todos.find().$;
  // }
  // getDoneTodoItems(): Observable<TodoType[]> {
  //   return this.appCollections.todos.find({ selector: {isCompleted: true } }).$;
  // }
  // async getUnsyncedItems(): Promise<TodoType[]> {
  //   const items = this.appCollections.todos
  //     .find({ selector: {syncStatus: SyncStatusEnum.NeedSync } })
  //     .exec();

  //     return items;
  // }

  // async createTodoItem(title: string, isCompleted=false): Promise<void> {
  //   this.appCollections.todos.insert({
  //     title,
  //     id: new Date().toString(),
  //     isCompleted,
  //     syncStatus: SyncStatusEnum.NeedSync,
  //   });
  // }

  // async updateTodoStatus(todoId: string, status: boolean): Promise<void> {
  //   const query = this.appCollections.todos.findOne({ selector: {id: todoId } });
  //   const newValues = { isCompleted: status, syncStatus: SyncStatusEnum.NeedSync};
  //   await query.update({ $set: newValues });
  // }
  
  async dumpDb(): Promise<void> {
    const dump = await this.database.dump();
    console.dir(dump);
    console.log('db dump created successfuly');
  }

  async restoreDb(): Promise<void> {
    await this.database.remove();
    // await this.database.importDump({});
    console.log('db restored successfuly');
  }
  async clearDb(): Promise<void> {
    await this.database.remove();
    console.log('db deleted successfuly');
  }

  getCollection(collection: RxCollectionsEnum): RxCollection {
    console.log(this.database)
    return this.database.collections[collection];
  }
}
