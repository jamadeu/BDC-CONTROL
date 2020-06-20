/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import { inject, injectable } from 'tsyringe';
import Site from '@modules/site/infra/typeorm/entities/Site';
import AppError from '@shared/errors/AppError';
import ISiteRepository from '../repositories/ISiteRepository';

interface IRequest {
  id: number;
  name: string;
}

@injectable()
class UpdateSiteService {
  constructor(
    @inject('SiteRepository')
    private siteRepository: ISiteRepository
  ) {}

  public async execute({ id, name }: IRequest): Promise<Site> {
    const checkSiteExists = await this.siteRepository.findById(id);
    if (!checkSiteExists) {
      throw new AppError('Site not found');
    }

    const checkNameSiteIsInUse = await this.siteRepository.findByNameSite(name);
    if (checkNameSiteIsInUse) {
      throw new AppError('Site already exists');
    }

    checkSiteExists.name = name;

    const updatedSite = await this.siteRepository.update(checkSiteExists);
    return updatedSite;
  }
}

export default UpdateSiteService;
