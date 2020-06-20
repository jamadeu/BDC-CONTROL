/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import { inject, injectable } from 'tsyringe';
import Site from '@modules/site/infra/typeorm/entities/Site';
import ISiteRepository from '../repositories/ISiteRepository';

@injectable()
class ListAllSitesService {
  constructor(
    @inject('SiteRepository')
    private siteRepository: ISiteRepository
  ) {}

  public async execute(): Promise<Site[]> {
    return this.siteRepository.findAll();
  }
}

export default ListAllSitesService;
