import { inject, injectable } from 'tsyringe';
import InTransit from '@modules/asset/infra/typeorm/entities/InTransit';
import ITransferRepository from '@modules/asset/repositories/ITransferRepository';
import ISiteRepository from '@modules/site/repositories/ISiteRepository';
import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  asset_id: string;
  site_destination_id: string;
  invoice: string;
}

@injectable()
class TransferOutService {
  constructor(
    @inject('TransferRepository')
    private transferRepository: ITransferRepository,

    @inject('AssetRepository')
    private assetRepository: IAssetRepository,

    @inject('SiteRepository')
    private siteRepository: ISiteRepository
  ) {}

  public async execute({
    asset_id,
    site_destination_id,
    invoice,
  }: IRequest): Promise<InTransit> {
    const asset = await this.assetRepository.findById(asset_id);
    if (!asset) {
      throw new AppError('Asset not found');
    }
    if (asset.status === 'IN_TRANSIT') {
      throw new AppError('Asset already in transit');
    }
    const checkDestinationExists = await this.siteRepository.findById(
      site_destination_id
    );
    if (!checkDestinationExists) {
      throw new AppError('Destination not found');
    }

    const inTransit = await this.transferRepository.transferOut({
      asset_id,
      site_origem_id: asset.site_id,
      site_destination_id,
      invoice,
      delivered: false,
    });
    const assetStatus = 'IN_TRANSIT';
    await this.assetRepository.changeStatus(assetStatus, asset_id);
    return inTransit;
  }
}

export default TransferOutService;
