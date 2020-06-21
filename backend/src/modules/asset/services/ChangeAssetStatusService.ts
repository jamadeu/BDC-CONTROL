/*
 * @Author: Jean Amadeu
 */

import { inject, injectable } from 'tsyringe';
import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import AppError from '@shared/errors/AppError';
import IAssetRepository from '../repositories/IAssetRepository';

interface IRequest {
  status: 'AVAILABLE' | 'REPAIR' | 'IN_TRANSIT';
  asset_id: number;
}

@injectable()
class ChangeAssetStatusService {
  constructor(
    @inject('AssetRepository')
    private assetRepository: IAssetRepository
  ) {}

  public async execute({ status, asset_id }: IRequest): Promise<Asset> {
    const foundAsset = await this.assetRepository.findById(asset_id);
    if (!foundAsset) {
      throw new AppError('Asset not found');
    }
    foundAsset.status = status;
    return foundAsset;
  }
}

export default ChangeAssetStatusService;
