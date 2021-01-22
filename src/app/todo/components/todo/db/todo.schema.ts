import { RxJsonSchema } from 'rxdb';
import TodoType from 'src/app/todo/types/todo.type';

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
  },
};

export default todoSchema;
