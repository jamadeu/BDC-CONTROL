import ICreateAssetDTO from '@modules/asset/dtos/ICreateAssetDTO';
import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import IAsseRepository from '../IAssetRepository';

class FakeAssetRepository implements IAsseRepository {
  private assets: Asset[] = [];

  private nextIdAvailable = 1;

  public async create(data: ICreateAssetDTO): Promise<Asset> {
    const asset = new Asset();
    Object.assign(asset, { id: this.nextIdAvailable }, data, {
      status: 'Available',
    });
    this.nextIdAvailable += 1;
    this.assets.push(asset);
    return asset;
  }

  public async changeStatus(status: string, asset_id: number): Promise<Asset> {
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

  public async findById(id: number): Promise<Asset | undefined> {
    return this.assets.find((asset) => asset.id === id);
  }

  public async findAll(): Promise<Asset[]> {
    return this.assets;
  }

  public async changesAssetLocation(
    asset_id: number,
    site_id: number
  ): Promise<Asset> {}
}

export default FakeAssetRepository;
