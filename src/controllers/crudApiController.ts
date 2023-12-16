import { APIGatewayProxyEvent } from 'aws-lambda';
import { GenericApiController } from './genericApiController';
import { StatusCodes } from 'http-status-codes';

export class CrudApiController<T> extends GenericApiController {
  constructor(private service: CrudApiService<T>) {
    super();
  }

  async handleRequest(event: APIGatewayProxyEvent): Promise<any> {
    try {
      const { httpMethod, path, body } = event;

      switch (httpMethod) {
        case 'GET':
          const id = event.pathParameters?.id;
          let resp: any;
          if (id) {
            resp = await this.service.get(id);
          } else {
            resp = await this.service.get_all();
          }
          // return this.handleresponse({statusCode: StatusCodes.OK, resp}, {statusCode: StatusCodes.NOT_FOUND, message: 'Not found'})
          if (!resp) {
            return this.errorResponse(StatusCodes.NOT_FOUND);
          }
          return this.successResponse(resp);

        case 'POST':
          const itemPost = JSON.parse(body!);
          await this.service.create(itemPost);
          return this.successResponse(null, StatusCodes.CREATED);

        case 'PUT':
          const idPut = event.pathParameters?.id;
          if (!idPut) {
            return this.errorResponse(StatusCodes.BAD_REQUEST, 'ID is required');
          }
          const updatedItem = JSON.parse(body!);
          const itemPut = await this.service.update(idPut, updatedItem);
          if (!itemPut) {
            return this.errorResponse(StatusCodes.NOT_FOUND);
          }
          return this.successResponse(itemPut);

        // case 'DELETE':
        //   const idDelete = event.pathParameters?.id;
        //   if (!idDelete) {
        //     return this.errorResponse(StatusCodes.BAD_REQUEST, 'ID is required');
        //   }
        //   await this.service.delete(idDelete);
        //   return this.successResponse(StatusCodes.GONE);

        default:
          return this.errorResponse(StatusCodes.METHOD_NOT_ALLOWED);
      }
    } catch (error) {
      console.error('Error:', error);
      return this.errorResponse(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export interface CrudApiService<T> {
  get(id: string): Promise<T | null>;
  get_all(): Promise<T[] | null>;
  create(item: T): Promise<void>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}
