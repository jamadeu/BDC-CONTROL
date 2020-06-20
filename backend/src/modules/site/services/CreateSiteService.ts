import { inject, injectable } from 'tsyringe';
import Site from '@modules/site/infra/typeorm/entities/Site';
import AppError from '@shared/errors/AppError';
import ISiteRepository from '../repositories/ISiteRepository';

interface IRequest {
  site: string;
}

@injectable()
class CreateSiteService {
  constructor(
    @inject('SiteRepository')
    private siteRepository: ISiteRepository
  ) {}

  public async execute({ site }: IRequest): Promise<Site> {
    const checkSiteExists = await this.siteRepository.findByNameSite(site);
    if (checkSiteExists) {
      throw new AppError('Site already exists');
    }

    const createdSite = await this.siteRepository.create({ site });
    return createdSite;
  }
}

export default CreateSiteService;
