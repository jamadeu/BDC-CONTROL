import { inject, injectable } from 'tsyringe';
import InTransit from '@modules/asset/infra/typeorm/entities/InTransit';
import ITransferRepository from '@modules/asset/repositories/ITransferRepository';
import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  in_transit_id: string;
}

@injectable()
class ReceiveAssetService {
  constructor(
    @inject('TransferRepository')
    private transferRepository: ITransferRepository,

    @inject('AssetRepository')
    private assetRepository: IAssetRepository
  ) {}

  public async execute({ in_transit_id }: IRequest): Promise<InTransit> {
    const inTransit = await this.transferRepository.findById(in_transit_id);
    if (!inTransit) {
      throw new AppError('Intransit not found');
    }

    await this.assetRepository.changesAssetLocation(
      inTransit.asset_id,
      inTransit.site_destination_id
    );

    return this.transferRepository.toReceive(inTransit);
  }
}

export default ReceiveAssetService;
