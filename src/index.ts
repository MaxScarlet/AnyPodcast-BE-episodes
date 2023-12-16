import { APIGatewayProxyEvent } from 'aws-lambda';
import { DistrService as Service } from './services/distrService';
import { CrudApiController } from './controllers/crudApiController';
import MongoDbHelper from './helpers/mongoHelper';
import { Episode, EpisodeDoc, EpisodeSchema } from './models/Episode';
// import { DynamoDbHelper } from './helpers/dynamoDbHelper';

const tableName = process.env.DB_TABLE!;

const dbHelper = new MongoDbHelper<EpisodeDoc>('Distributor', EpisodeSchema, tableName);
// const dbHelper = new DynamoDbHelper<Distributor>(tableName);
const crudService = new Service(dbHelper);
const crudController = new CrudApiController(crudService);

export const handler = async (event: APIGatewayProxyEvent) => {
  console.log(`Event: ${JSON.stringify(event)}`);
  await dbHelper.connect();
  return crudController.handleRequest(event);
};