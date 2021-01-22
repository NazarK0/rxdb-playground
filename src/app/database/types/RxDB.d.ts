import { RxCollection, RxDatabase } from 'rxdb';

export type RxAppCollectionsType = {
    [key: string]: RxCollection<any, {}, { [key: string]: any;}>;
};

type RxAppDatabaseType = RxDatabase<RxAppCollectionsType>;

export default RxAppDatabaseType;
