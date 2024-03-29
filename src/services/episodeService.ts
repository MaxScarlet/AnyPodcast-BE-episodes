import { CrudApiService } from "../controllers/crudApiController";
import { IDbHelper } from "../helpers/IDbHelper";

import { Episode, EpisodeDoc } from "../models/Episode";
import { SearchParams } from "../models/SearchParams";

export class EpisodeService implements CrudApiService<Episode> {
	constructor(private dbHelper: IDbHelper<EpisodeDoc> | IDbHelper<Episode>) {}

	async get_all(queryString: SearchParams): Promise<Episode[] | null> {
		if (queryString && !queryString.PodcastID) {
			return null;
		}
		const fields = ["Title", "Description"];
		const getItems = await this.dbHelper.get_list<Episode>(queryString, fields);
		const found = getItems.find((item) => item.IsVisible && !item.Published);
		if (found) {
			for (const item of getItems) {
				if (item.IsVisible && !item.Published) {
					item.Published = item.Created;
					await this.dbHelper.update<Episode>(item["_id"], item);
				}
			}
		}
		return getItems;
	}

	async get(id: string): Promise<Episode | null> {
		const item = await this.dbHelper.get<Episode>(id);
		return item || null;
	}

	async create(item: Episode): Promise<Episode> {
		item.Created = new Date().toISOString();
		const response = await this.dbHelper.create<Episode>(item);
		return response;
	}

	async update(id: string, updated: Episode): Promise<Episode | null> {
		const item = await this.dbHelper.update<Episode>(id, updated);
		return item || null;
	}

	async delete(id: string): Promise<void> {
		await this.dbHelper.delete<Episode>(id);
	}
}
