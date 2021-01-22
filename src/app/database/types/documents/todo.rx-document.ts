import { RxDocument } from "rxdb";

export type TodoType = {
    id: string;
    title: string;
    isCompleted: boolean;
}

// ORM methods
// export type RxTodoDocMethodsType = {
//     hpPercent(): number;
// };


type RxTodoDocumentType = RxDocument<TodoType, {}>;
// type RxTodoDocumentType = RxDocument<TodoType, RxTodoDocMethodsType>;

export default RxTodoDocumentType;