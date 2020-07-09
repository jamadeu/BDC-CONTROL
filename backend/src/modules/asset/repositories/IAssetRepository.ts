import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import ICreateAssetDTO from '@modules/asset/dtos/ICreateAssetDTO';

export default interface IAssetRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
  findById(id: string): Promise<Asset | undefined>;
  findAll(): Promise<Asset[]>;
  findByScan(scan: string): Promise<Asset | undefined>;
  changeStatus(status: string, asset_id: string): Promise<Asset>;
  changesAssetLocation(asset_id: string, site_id: string): Promise<Asset>;
}
