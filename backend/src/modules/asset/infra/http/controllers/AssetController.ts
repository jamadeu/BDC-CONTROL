import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAssetService from '@modules/asset/services/CreateAssetService';
import ChangeAssetStatusService from '@modules/asset/services/ChangeAssetStatusService';
import FindAssetByScanService from '@modules/asset/services/FindAssetByScanService';

export default class AssetController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { partnumber, serie, site_id } = request.body;
    const createAsset = container.resolve(CreateAssetService);
    const asset = await createAsset.execute({ partnumber, serie, site_id });
    return response.json(asset);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { scan } = request.query;
    const findAssetByScan = container.resolve(FindAssetByScanService);
    const asset = await findAssetByScan.execute({ scan: String(scan) });
    return response.json(asset);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { asset_id } = request.params;
    const { status } = request.body;
    const changeStatus = container.resolve(ChangeAssetStatusService);
    const asset = await changeStatus.execute({
      asset_id: Number(asset_id),
      status,
    });
    return response.json(asset);
  }
}
