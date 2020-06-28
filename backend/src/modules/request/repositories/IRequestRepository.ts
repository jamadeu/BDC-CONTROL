import Request from '@modules/request/infra/typeorm/entities/Request';
import ICreateRequestDTO from '@modules/request/dtos/ICreateRequestDTO';

export default interface IRequestRepository {
  create(data: ICreateRequestDTO): Promise<Request>;
  findById(id: number): Promise<Request | undefined>;
  findByRequestIdentification(
    identification: string
  ): Promise<Request | undefined>;
  findByStatus(status: string): Promise<Request[]>;
  changeStatus(
    status: string,
    request_id: number
  ): Promise<Request | undefined>;
  addAsset(asset_id: number, request_id: number): Promise<Request | undefined>;
}
