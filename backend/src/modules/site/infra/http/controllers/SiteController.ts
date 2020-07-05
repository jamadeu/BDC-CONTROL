import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSiteService from '@modules/site/services/CreateSiteService';
import UpdateSiteService from '@modules/site/services/UpdateSiteService';
import ListAllSitesService from '@modules/site/services/ListAllSitesService';

export default class SiteController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createSite = container.resolve(CreateSiteService);
    const site = await createSite.execute({ name });
    return response.json(site);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;
    const updateSite = container.resolve(UpdateSiteService);
    const site = await updateSite.execute({ id, name });
    return response.json(site);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listSites = container.resolve(ListAllSitesService);
    const sites = await listSites.execute();
    return response.json(sites);
  }
}
