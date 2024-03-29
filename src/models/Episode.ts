import { Document } from "mongoose";
import MongoDbHelper from "../helpers/mongoHelper";

export interface IEpisode {
	Created?: string;
	PodcastID: string;
	Title: string;
	Description: string;
	Scheduled?: string;
	IsVisible: boolean;
	PosterName: string;
	MediaFile?: string;
	MediaFileOriginal?: string;
	Published?: string;
}
export class Episode implements IEpisode {
	Created?: string = "";
	PodcastID: string = "";
	Title: string = "";
	Description: string = "";
	Scheduled?: string = "";
	IsVisible: boolean = false;
	PosterName: string = "";
	MediaFile?: string = "";
	MediaFileOriginal?: string = "";
	Published?: string = "";

	constructor(data?: Episode | string) {
		if (data) {
			if (typeof data !== "object") data = JSON.parse(data);
			Object.assign(this, data);
		}
	}
}

export const EpisodeSchema = MongoDbHelper.generateSchemaFromInterface(new Episode());

export interface EpisodeDoc extends IEpisode, Document {}
