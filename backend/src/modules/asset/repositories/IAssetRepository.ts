/*
 * @Author: Jean Amadeu
 */

import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import ICreateAssetDTO from '@modules/asset/dtos/ICreateAssetDTO';

export default interface IAssetRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
  findById(id: number): Promise<Asset | undefined>;
  findAll(): Promise<Asset[]>;
  findByScan(scan: string): Promise<Asset | undefined>;
  changeStatus(status: string, asset_id: number): Promise<Asset>;
}
