import { RxCollectionCreator } from './../../../../../rxdb/src/types/rx-collection.d';
import { Injectable, isDevMode } from '@angular/core';
import todoSchema from '../schemas/todo.schema';
import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core';
import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';
import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';
import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import RxTodoDocumentType, { TodoType } from '../types/documents/todo.rx-document';
import RxTodoDatabase, { RxAppCollectionsType } from '../types/RxDB';
import RxTodoDatabaseType from '../types/RxDB';

const collections: RxCollectionCreator[] = [
    {
        name: 'todos',
        schema: todoSchema,
        methods: {
            hpPercent(this: RxTodoDocumentType): number {
                return 67;
            }
        },
    }
];

console.log('hostname: ' + window.location.hostname);
const syncURL = 'http://' + window.location.hostname + ':10101/';

let doSync = true;
if (window.location.hash == '#nosync') doSync = false;


async function loadRxDBPlugins(): Promise<any> {
  addRxPlugin(RxDBLeaderElectionPlugin);
  addRxPlugin(RxDBReplicationPlugin);
  addRxPlugin(PouchdbAdapterHttp);
  addRxPlugin(PouchdbAdapterIdb);

  if (isDevMode()) {
    await Promise.all([
      import('rxdb/plugins/dev-mode').then(
        module => addRxPlugin(module)
      ),
      import('rxdb/plugins/validate').then(
        module => addRxPlugin(module)
      )
    ]);
  } else {
    addRxPlugin(RxDBNoValidatePlugin);
  }
}

async function _create(): Promise<RxTodoDatabase> {
  await loadRxDBPlugins();

  console.log('DatabaseService: creating database..');
  const db = await createRxDatabase<RxAppCollectionsType>({
    name: 'todoTestdb',
    adapter: 'idb'
    // password: 'myLongAndStupidPassword' // no password needed
  });
  console.log('DatabaseService: created database');
  (window as any)['db'] = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership()
    .then(() => {
      console.log('isLeader now');
      document.title = '♛ ' + document.title;
    });

  // create collections
  console.log('DatabaseService: create collections');
  await Promise.all(collections.map(colData => db.addCollections(colData)));

  // hooks
  console.log('DatabaseService: add hooks');
  db.collections.todos.preInsert(function (docObj: TodoType) {
      const id = docObj.id;
      return db.collections.todos
          .findOne({ selector: { id } })
          .exec()
          .then((has: RxTodoDocumentType | null) => {
              if (has != null) {
                  alert('another todo already has the Id ' + id);
                  throw new Error('id already there');
              }
              return db;
          });
  }, false);

  // sync with server
  if (doSync) {
      console.log('DatabaseService: sync');
      await db.todos.sync({
          remote: syncURL + '/hero'
      });
  }

  return db;
}

let DB_INSTANCE: RxTodoDatabaseType;

/**
 * This is run via APP_INITIALIZER in app.module.ts
 * to ensure the database exists before the angular-app starts up
 */
export async function initDatabase() {
    console.log('initDatabase()');
    DB_INSTANCE = await _create();
}

@Injectable()
export class DatabaseService {
    get db(): RxTodoDatabaseType {
        return DB_INSTANCE;
    }
}
