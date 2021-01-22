import { SyncStatusEnum } from './../types/documents/todo.rx-document';

import { RxJsonSchema } from 'rxdb';
import { TodoType } from '../types/documents/todo.rx-document';

const todoSchema: RxJsonSchema<TodoType> = {
  title: 'todo schema',
  description: 'list of todos',
  version: 0,
  keyCompression: false,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true,
    },
    title: {
      type: 'string',
      default: 'default title',
    },
    isCompleted: {
      type: 'boolean',
      default: false,
    },
    syncDate: {
      type: 'string',
    },
    syncStatus: {
      type: 'number'
    }
  },
};

export default todoSchema;
