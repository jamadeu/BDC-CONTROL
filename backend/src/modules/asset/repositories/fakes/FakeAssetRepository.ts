import { uuid } from 'uuidv4';
import ICreateAssetDTO from '@modules/asset/dtos/ICreateAssetDTO';
import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import IAsseRepository from '../IAssetRepository';

class FakeAssetRepository implements IAsseRepository {
  private assets: Asset[] = [];

  public async create(data: ICreateAssetDTO): Promise<Asset> {
    const asset = new Asset();
    Object.assign(asset, { id: uuid() }, data, {
      status: 'Available',
    });
    this.assets.push(asset);
    return asset;
  }

  public async changeStatus(status: string, asset_id: string): Promise<Asset> {
    const findIndex = this.assets.findIndex(
      (findAsset) => findAsset.id === asset_id
    );
    const asset = new Asset();
    Object.assign(asset, this.assets[findIndex]);
    asset.status = status;
    this.assets[findIndex] = asset;
    return asset;
  }

  public async findByScan(scan: string): Promise<Asset | undefined> {
    const assetToFind = scan.toUpperCase().slice(1);
    const findIndex = this.assets.findIndex((findAsset) =>
      findAsset.partnumber_serie.endsWith(assetToFind)
    );
    return this.assets[findIndex];
  }

  public async findById(id: string): Promise<Asset | undefined> {
    return this.assets.find((asset) => asset.id === id);
  }

  public async findAll(): Promise<Asset[]> {
    return this.assets;
  }

  public async changesAssetLocation(
    asset_id: string,
    site_id: string
  ): Promise<Asset> {
    const asset = this.assets.find(
      (assetToCheck) => assetToCheck.id === asset_id
    );
    asset.site_id = site_id;
    return asset;
  }
}

export default FakeAssetRepository;
