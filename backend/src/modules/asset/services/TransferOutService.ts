/*
 * @Author: Jean Amadeu
 */

import { inject, injectable } from 'tsyringe';
import InTransit from '@modules/asset/infra/typeorm/entities/InTransit';
import ITransferRepository from '@modules/asset/repositories/ITransferRepository';
import ISiteRepository from '@modules/site/repositories/ISiteRepository';
import IAssetRepository from '@modules/asset/repositories/IAssetRepository';

interface IRequest {
  asset_id: number;
  site_destination_id: number;
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
    // TODO validar se asset e destino existem
    const asset = await this.assetRepository.findById(asset_id);
    const inTransit = await this.transferRepository.transferOut({
      asset_id,
      site_origem_id: asset.site_id,
      site_destination_id,
      invoice,
      sla: 'GREEN',
    });
    const assetStatus = 'IN_TRANSIT';
    await this.assetRepository.changeStatus(assetStatus, asset_id);
    return inTransit;
  }
}

export default TransferOutService;
