/*
 * @Author: Jean Amadeu
 */

import { getRepository, Repository, Like } from 'typeorm';
import ICreateAssetDTO from '@modules/asset/dtos/ICreateAssetDTO';
import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import IAssetRepository from '@modules/asset/repositories/IAssetRepository';

class AssetRepository implements IAssetRepository {
  private ormRepository: Repository<Asset>;

  constructor() {
    this.ormRepository = getRepository(Asset);
  }

  public async create(data: ICreateAssetDTO): Promise<Asset> {
    const asset = this.ormRepository.create(data);
    asset.status = 'AVAILABLE';
    await this.ormRepository.save(asset);
    return asset;
  }

  public async changeStatus(status: string, asset_id: number): Promise<Asset> {
    const asset = await this.ormRepository.findOne(asset_id);
    asset.status = status;
    await this.ormRepository.save(asset);
    return asset;
  }

  public async findByScan(scan: string): Promise<Asset | undefined> {
    const assetToFind = scan.toUpperCase().slice(1);
    const foundAsset = await this.ormRepository.findOne({
      where: {
        partnumber_serie: Like(`%${assetToFind}`),
      },
    });

    return foundAsset;
  }

  public async findById(id: number): Promise<Asset | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(): Promise<Asset[]> {
    return this.ormRepository.find();
  }
}

export default AssetRepository;
