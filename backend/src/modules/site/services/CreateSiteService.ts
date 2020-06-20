/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import { inject, injectable } from 'tsyringe';
import Site from '@modules/site/infra/typeorm/entities/Site';
import AppError from '@shared/errors/AppError';
import ISiteRepository from '../repositories/ISiteRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateSiteService {
  constructor(
    @inject('SiteRepository')
    private siteRepository: ISiteRepository
  ) {}

  public async execute({ name }: IRequest): Promise<Site> {
    const checkSiteExists = await this.siteRepository.findByNameSite(name);
    if (checkSiteExists) {
      throw new AppError('Site already exists');
    }

    const createdSite = await this.siteRepository.create({ name });
    return createdSite;
  }
}

export default CreateSiteService;
