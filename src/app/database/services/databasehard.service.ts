import { Injectable, isDevMode } from '@angular/core';
import { createRxDatabase, addRxPlugin } from 'rxdb/plugins/core';
import { RxDBNoValidatePlugin } from 'rxdb/plugins/no-validate';
import { RxDBLeaderElectionPlugin } from 'rxdb/plugins/leader-election';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBReplicationPlugin } from 'rxdb/plugins/replication';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { RxDBEncryptionPlugin } from 'rxdb/plugins/encryption';
import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import dbCollections from '../database.collections';
import RxAppDatabaseType, { RxAppCollectionsType } from '../types/RxDB';

async function loadRxDBPlugins(): Promise<any> {
  addRxPlugin(RxDBLeaderElectionPlugin);
  addRxPlugin(RxDBUpdatePlugin);
  addRxPlugin(RxDBReplicationPlugin);
  addRxPlugin(RxDBJsonDumpPlugin);
  addRxPlugin(RxDBEncryptionPlugin);
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

async function _create(): Promise<RxAppDatabaseType> {
  await loadRxDBPlugins();

  console.log('DatabaseService: creating database..');
  const db = await createRxDatabase<RxAppCollectionsType>({
    name: 'appdb',           // <- name
    adapter: 'idb',          // <- storage-adapter
    password: 'TacticVITIProject',     // <- password (optional)
    multiInstance: false,         // <- multiInstance (optional, default: true)
    eventReduce: true // <- eventReduce (optional, default: true)
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
  await Promise.all(dbCollections.map(colData => db.addCollections(colData)));

  return db;
}

let DB_INSTANCE: RxAppDatabaseType;

/**
 * This is run via APP_INITIALIZER in app.module.ts
 * to ensure the database exists before the angular-app starts up
 */
export async function initDatabase() {
    console.log('initDatabase()');
    DB_INSTANCE = await _create();
}

@Injectable()
export class DatabaseHardService {
  get db(): RxAppDatabaseType {
    return DB_INSTANCE;
  }

  async dumpDb(): Promise<void> {
    const dump = await DB_INSTANCE.dump();
    console.dir(dump);
    console.log('db dump created successfuly');
  }

  async restoreDb(): Promise<void> {
    await DB_INSTANCE.remove();
    // await this.database.importDump({});
    console.log('db restored successfuly');
  }
  async clearDb(): Promise<void> {
    await DB_INSTANCE.remove();
    console.log('db deleted successfuly');
  }
}
