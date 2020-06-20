/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import ICreateAssetDTO from '@modules/asset/dtos/ICreateAssetDTO';

type Status = {
  status:
    | 'RAA'
    | 'REPAIR'
    | 'ANALISYS_PENDING'
    | 'IN_TRANSIT'
    | 'DEPLOYED'
    | 'PENDING_GARS'
    | 'SCRAP'
    | 'GARS';
};

export default interface IAssetRepository {
  create(data: ICreateAssetDTO): Promise<Asset>;
  update(asset: Asset): Promise<Asset>;
  findById(id: number): Promise<Asset | undefined>;
  findAll(): Promise<Asset[]>;
  findByScan(scan: string): Promise<Asset | undefined>;
  changeStatus(status: Status, asset_id: number): Promise<Asset>;
  changeSite(asset_id: number, site_id: number): Promise<Asset>;
}
