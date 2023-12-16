import { CrudApiService } from '../controllers/crudApiController';
import { IDbHelper } from '../helpers/IDbHelper';

import { Episode, EpisodeDoc } from '../models/Episode';

// import MongoDbHelper from '../helpers/mongoHelper';
// import { DynamoDbHelper } from '../helpers/dynamoDbHelper';

export class EpisodeService implements CrudApiService<Episode> {
    // private readonly dbHelper: MongoDbHelper<DistributorDoc> | DynamoDbHelper<Distributor>;

    constructor(private dbHelper: IDbHelper<EpisodeDoc> | IDbHelper<Episode>) {
        // this.dbHelper = new MongoDbHelper<DistributorDoc>('Distributor', DistributorSchema, tableName);
        // this.dbHelper = new DynamoDbHelper<Distributor>(tableName);
    }

    async get_all(): Promise<Episode[]> {
        const items = await this.dbHelper.get_list<Episode>();
        return items;
    }

    async get(id: string): Promise<Episode | null> {
        const item = await this.dbHelper.get<Episode>(id);
        return item || null;
    }

    async create(item: Episode): Promise<void> {
        await this.dbHelper.create<Episode>(item);
    }

    async update(id: string, updated: Episode): Promise<Episode | null> {
        const item = await this.dbHelper.update<Episode>(id, updated);
        return item || null;
    }

    async delete(id: string): Promise<void> {
        await this.dbHelper.delete<Episode>(id);
    }
}