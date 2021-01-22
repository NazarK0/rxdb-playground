import { RxJsonSchema } from "rxdb";

const todoSchema: RxJsonSchema = {
  "title": "todo schema",
  "version": 0,
  "description": "describes a todo item",
  "type": "object",
  "keyCompression": false,
  "properties": {
      "id": {
          "type": "string",
          "primary": true
      },
      "title": {
          "type": "string",
          "default": 'default title'
      },
    }
}

export default todoSchema;
