/*
 * @Author: Jean Amadeu
 * @Date: 2020-06-20 15:31:42
 * @Last Modified by:   Jean Amadeu
 * @Last Modified time: 2020-06-20 15:31:42
 */

import { getRepository, Repository } from 'typeorm';
import ICreateSiteDTO from '@modules/site/dtos/ICreateSiteDTO';
import Site from '@modules/site/infra/typeorm/entities/Site';
import ISiteRepository from '@modules/site/repositories/ISiteRepository';

class SiteRepository implements ISiteRepository {
  private ormRepository: Repository<Site>;

  constructor() {
    this.ormRepository = getRepository(Site);
  }

  public async create(siteData: ICreateSiteDTO): Promise<Site> {
    const site = this.ormRepository.create(siteData);
    await this.ormRepository.save(site);
    return site;
  }

  public async update(site: Site): Promise<Site> {
    return this.ormRepository.save(site);
  }

  public async findById(id: number): Promise<Site | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByNameSite(nameSite: string): Promise<Site | undefined> {
    return this.ormRepository.findOne({
      where: { name: nameSite },
    });
  }

  public async findAll(): Promise<Site[]> {
    return this.ormRepository.find();
  }
}

export default SiteRepository;
