import InTransit from '@modules/asset/infra/typeorm/entities/InTransit';
import ITransferOutDTO from '@modules/asset/dtos/ITransferOutDTO';

export default interface ITransferRepository {
  transferOut(data: ITransferOutDTO): Promise<InTransit>;
  toReceive(inTransit: InTransit): Promise<InTransit>;
  findById(in_transit_id: number): Promise<InTransit | undefined>;
}
