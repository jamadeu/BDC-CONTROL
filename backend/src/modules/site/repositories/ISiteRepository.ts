import Site from '@modules/site/infra/typeorm/entities/Site';
import ICreateSiteDTO from '@modules/site/dtos/ICreateSiteDTO';

export default interface ISiteRepository {
  create(data: ICreateSiteDTO): Promise<Site>;
  findById(id: string): Promise<Site | undefined>;
  findByNameSite(name: string): Promise<Site | undefined>;
  findAll(): Promise<Site[]>;
  update(site: Site): Promise<Site>;
}
