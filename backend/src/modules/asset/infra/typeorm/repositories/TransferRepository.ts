// TODO refactor

import InTransit from '@modules/asset/infra/typeorm/entities/InTransit';
import ITransferOutDTO from '@modules/asset/dtos/ITransferOutDTO';
import ITransferRepository from '@modules/asset/repositories/ITransferRepository';

class TransferRepository implements ITransferRepository {
  private inTransits: InTransit[] = [];

  private nextIdAvailable = 1;

  public async transferOut(data: ITransferOutDTO): Promise<InTransit> {
    const inTransit = new InTransit();
    Object.assign(inTransit, { id: this.nextIdAvailable }, data);
    this.nextIdAvailable += 1;
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
    return received;
  }

  public async findById(in_transit_id: number): Promise<InTransit | undefined> {
    return this.inTransits.find((inTransit) => inTransit.id === in_transit_id);
  }
}

export default TransferRepository;
