import { RxDocument } from "rxdb";

export enum SyncStatusEnum {
  Synced = 1,
  Syncing,
  NeedSync,
};

export type TodoType = {
    id: string;
    title: string;
    isCompleted: boolean;
    syncDate: Date | null;
    syncStatus: SyncStatusEnum;
}

// ORM methods
// export type RxTodoDocMethodsType = {
//     hpPercent(): number;
// };


type RxTodoDocumentType = RxDocument<TodoType, {}>;
// type RxTodoDocumentType = RxDocument<TodoType, RxTodoDocMethodsType>;

export default RxTodoDocumentType;