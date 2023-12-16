import { APIGatewayProxyEvent } from 'aws-lambda';
import { EpisodeService as Service } from './services/episodeService';
import { CrudApiController } from './controllers/crudApiController';
import MongoDbHelper from './helpers/mongoHelper';
import { Episode, EpisodeDoc, EpisodeSchema } from './models/Episode';
// import { DynamoDbHelper } from './helpers/dynamoDbHelper';

const tableName = process.env.DB_TABLE!;

const dbHelper = new MongoDbHelper<EpisodeDoc>('Episode', EpisodeSchema, tableName);
// const dbHelper = new DynamoDbHelper<Distributor>(tableName);
const crudService = new Service(dbHelper);
const crudController = new CrudApiController(crudService);

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`Event: ${JSON.stringify(event)}`);
  await dbHelper.connect();
  return crudController.handleRequest(event);
};