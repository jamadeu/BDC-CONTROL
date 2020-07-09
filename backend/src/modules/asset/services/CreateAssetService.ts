import { inject, injectable } from 'tsyringe';
import Asset from '@modules/asset/infra/typeorm/entities/Asset';
import AppError from '@shared/errors/AppError';
import ISiteRepository from '@modules/site/repositories/ISiteRepository';
import IAssetRepository from '../repositories/IAssetRepository';

interface IRequest {
  partnumber: string;
  serie: string;
  site_id: string;
}

@injectable()
class CreateAssetService {
  constructor(
    @inject('AssetRepository')
    private assetRepository: IAssetRepository,

    @inject('SiteRepository')
    private siteRepository: ISiteRepository
  ) {}

  public async execute({
    partnumber,
    serie,
    site_id,
  }: IRequest): Promise<Asset> {
    const partnumber_serie = `1S${partnumber}${serie}`.toUpperCase();
    const checkAssetExists = await this.assetRepository.findByScan(
      partnumber_serie
    );

    if (checkAssetExists) {
      throw new AppError('Asset already exists');
    }

    const checkSiteExists = await this.siteRepository.findById(site_id);
    if (!checkSiteExists) {
      throw new AppError('Site not found');
    }

    const asset = await this.assetRepository.create({
      partnumber: partnumber.toUpperCase(),
      serie: serie.toUpperCase(),
      partnumber_serie,
      site_id,
    });
    return asset;
  }
}

export default CreateAssetService;
