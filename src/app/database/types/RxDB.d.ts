import { RxCollection, RxDatabase } from 'rxdb';
import RxTodoCollectionType from './collections/todo.rx-collection';

export type RxAppCollectionsType = {
    [key: string]: RxCollection<any, {}, { [key: string]: any;}>;
};

type RxTodoDatabaseType = RxDatabase<RxAppCollectionsType>;

export default RxTodoDatabaseType;
