import { Injectable } from '@angular/core';
import { addRxPlugin, createRxDatabase } from 'rxdb';
import { Observable } from 'rxjs';
import pouchdb from 'pouchdb-adapter-idb';
import todoSchema from '../schemas/todo.schema';
import { TodoType } from '../types/documents/todo.rx-document';
import { RxAppCollectionsType } from '../types/RxDB';

@Injectable()
export default class RxDbService {
  appCollections!: RxAppCollectionsType;

  async ensureDbIsCreated() {
    if (this.appCollections) {
      return;
    }

    addRxPlugin(pouchdb);
    const db = await createRxDatabase<RxAppCollectionsType>({
      name: 'tododb',           // <- name
      adapter: 'idb',          // <- storage-adapter
      password: 'TacticVITIProject',     // <- password (optional)
      multiInstance: false,         // <- multiInstance (optional, default: true)
      eventReduce: true // <- eventReduce (optional, default: true)
    });

    this.appCollections = await db.addCollections({
      todos: { schema: todoSchema, },
    });
  }

  getTodoItems(): Observable<TodoType[]> {
    return this.appCollections.todos.find().$;
  }
  getDoneTodoItems(): Observable<TodoType[]> {
    return this.appCollections.todos.find({ selector: {isCompleted: true } }).$;
  }

  async createTodoItem(title: string, isCompleted=false): Promise<void> {
    this.appCollections.todos.insert({
      title,
      id: new Date().toString(),
      isCompleted,
    });
  }

  async updateTodoStatus(todoId: string, status: boolean): Promise<void> {
    // this.appCollections.todos.upsert({
    //   id: todoId,

    // })
    const query = this.appCollections.todos.findOne({ selector: {id: todoId } });
    const updated = await query.update({ $set:{ isCompleted: status } });
    console.table(updated);
  }
}
