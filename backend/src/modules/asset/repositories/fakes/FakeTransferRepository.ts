import { uuid } from 'uuidv4';
import InTransit from '@modules/asset/infra/typeorm/entities/InTransit';
import ITransferOutDTO from '@modules/asset/dtos/ITransferOutDTO';
import ITransferRepository from '../ITransferRepository';

class FakeTransferRepository implements ITransferRepository {
  private inTransits: InTransit[] = [];

  public async transferOut(data: ITransferOutDTO): Promise<InTransit> {
    const inTransit = new InTransit();
    Object.assign(inTransit, { id: uuid() }, data);
    this.inTransits.push(inTransit);
    return inTransit;
  }

  public async toReceive(inTransit: InTransit): Promise<InTransit> {
    const findIndex = this.inTransits.findIndex(
      (findInT) => findInT.id === inTransit.id
    );
    const received = new InTransit();
    Object.assign(received, this.inTransits[findIndex]);
    received.delivered = true;
    this.inTransits[findIndex] = received;
    return received;
  }

  public async findById(in_transit_id: string): Promise<InTransit | undefined> {
    return this.inTransits.find((inTransit) => inTransit.id === in_transit_id);
  }

  public async findAllNotDelivered(): Promise<InTransit[]> {
    return this.inTransits.filter((inTransit) => inTransit.delivered === false);
  }
}

export default FakeTransferRepository;
