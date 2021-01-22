import { RxDocument } from "rxdb";
import TodoType from "src/app/todo/types/todo.type";

type RxTodoDocumentType = RxDocument<TodoType, {}>;

export default RxTodoDocumentType;