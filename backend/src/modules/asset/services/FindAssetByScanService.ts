import { inject, injectable } from 'tsyringe';
import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import AppError from '@shared/errors/AppError';
import IAssetRepository from '../repositories/IAssetRepository';

interface IRequest {
  scan: string;
}

@injectable()
class FindAssetByScanService {
  constructor(
    @inject('AssetRepository')
    private assetRepository: IAssetRepository
  ) {}

  public async execute({ scan }: IRequest): Promise<Asset> {
    const foundAsset = await this.assetRepository.findByScan(
      scan.toUpperCase()
    );

    if (!foundAsset) {
      throw new AppError('Asset not found');
    }
    return foundAsset;
  }
}

export default FindAssetByScanService;
