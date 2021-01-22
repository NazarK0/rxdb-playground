import todoSchema from "../todo/components/todo/db/todo.schema";

const dbCollections: any[] = [
    {
      todos: { schema: todoSchema, },
    }
];

export default dbCollections;