import { Document, Schema, SchemaDefinition } from 'mongoose';
import MongoDbHelper from '../helpers/mongoHelper';
import { MediaSource } from './MediaSource';

export interface IEpisode {
    ID: number;
    Created: string;
    PodcastID: string;
    Title: string;
    Description: string;
    IsVisible: boolean;
    Media: MediaSource;
}
export class Episode implements IEpisode {
    ID: number = 0;
    Created: string = '';
    PodcastID: string = '';
    Title: string = '';
    Description: string = '';
    IsVisible: boolean = false;
    Media: MediaSource = new MediaSource();

    constructor(data?: Episode | string) {
        if (data) {
            if (typeof data !== 'object') data = JSON.parse(data);
            Object.assign(this, data);
        } else {
            
        }
    }

    forList() {
        const {Media: MediaSources, ...objFiltered} = this;
        return objFiltered;
    }
    processMediaSources() {
        // some code
    }
}

export const EpisodeSchema = MongoDbHelper.generateSchemaFromInterface(new Episode());

export interface EpisodeDoc extends IEpisode, Document {}
