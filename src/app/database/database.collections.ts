import todoSchema from "./schemas/todo.schema";

const dbCollections: any[] = [
    {
      todos: { schema: todoSchema, },
    }
];

export default dbCollections;