import { inject, injectable } from 'tsyringe';
import InTransit from '@modules/asset/infra/typeorm/entities/InTransit';
import ITransferRepository from '@modules/asset/repositories/ITransferRepository';

@injectable()
class ListAllInTransitNotDeliveredService {
  constructor(
    @inject('TransferRepository')
    private transferRepository: ITransferRepository
  ) {}

  public async execute(): Promise<InTransit[]> {
    const allInTransitNotDelivered = await this.transferRepository.findAllNotDelivered();
    return allInTransitNotDelivered;
  }
}

export default ListAllInTransitNotDeliveredService;
