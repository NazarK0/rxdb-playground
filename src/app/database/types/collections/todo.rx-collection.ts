import { RxCollection } from "rxdb";
import { TodoType } from "../documents/todo.rx-document";

type RxTodoCollectionType = RxCollection<TodoType, {}, {}>;

export default RxTodoCollectionType;
