import { Document } from 'mongoose';
import MongoDbHelper from '../helpers/mongoHelper';
import { Media } from './Media';

export interface IEpisode {
    Created: string;
    PodcastID: string;
    Title: string;
    Description: string;
    IsVisible: boolean;
    Media: Media;
}
export class Episode implements IEpisode {
  Created: string = "";
  PodcastID: string = "";
  Title: string = "";
  Description: string = "";
  IsVisible: boolean = false;
  Media: Media = new Media();

  constructor(data?: Episode | string) {
    if (data) {
      if (typeof data !== "object") data = JSON.parse(data);
      Object.assign(this, data);
    } else {
    }
  }

  forList() {
    const { Media: MediaSources, ...objFiltered } = this;
    return objFiltered;
  }
  processMediaSources() {
    // some code
  }
}

export const EpisodeSchema = MongoDbHelper.generateSchemaFromInterface(new Episode());

export interface EpisodeDoc extends IEpisode, Document {}
