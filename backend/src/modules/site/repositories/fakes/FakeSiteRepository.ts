import { uuid } from 'uuidv4';
import ICreateSiteDTO from '@modules/site/dtos/ICreateSiteDTO';
import Site from '@modules/site/infra/typeorm/entities/Site';
import ISiteRepository from '../ISiteRepository';

class FakeSiteRepository implements ISiteRepository {
  private sites: Site[] = [];

  public async create(data: ICreateSiteDTO): Promise<Site> {
    const site = new Site();
    Object.assign(site, { id: uuid() }, data);
    this.sites.push(site);
    return site;
  }

  public async update(site: Site): Promise<Site> {
    const findIndex = this.sites.findIndex(
      (findSite) => findSite.id === site.id
    );
    this.sites[findIndex] = site;
    return site;
  }

  public async findById(id: string): Promise<Site | undefined> {
    return this.sites.find((site) => site.id === id);
  }

  public async findByNameSite(nameSite: string): Promise<Site | undefined> {
    return this.sites.find((site) => site.name === nameSite);
  }

  public async findAll(): Promise<Site[]> {
    return this.sites;
  }
}

export default FakeSiteRepository;
