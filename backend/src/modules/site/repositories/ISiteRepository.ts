import Site from '@modules/site/infra/typeorm/entities/Site';
import ICreateSiteDTO from '@modules/site/dtos/ICreateSiteDTO';

export default interface ISiteRepository {
  create(date: ICreateSiteDTO): Promise<Site>;
  update(site: Site): Promise<Site>;
  findById(id: number): Promise<Site | undefined>;
  findByNameSite(nameSite: string): Promise<Site | undefined>;
  findAll(): Promise<Site[]>;
}
