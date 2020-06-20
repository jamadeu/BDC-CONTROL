/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import CreateSiteService from './CreateSiteService';
import ListAllSites from './ListAllSitesService';

let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;
let listSites: ListAllSites;

describe('UpdateSite', () => {
  beforeEach(() => {
    fakeSiteRepository = new FakeSiteRepository();
    createSite = new CreateSiteService(fakeSiteRepository);
    listSites = new ListAllSites(fakeSiteRepository);
  });

  it('be able to list all sites', async () => {
    const siteOne = await createSite.execute({
      name: 'site1',
    });

    const siteTwo = await createSite.execute({
      name: 'site2',
    });

    const listSite = await listSites.execute();

    expect(listSite).toEqual(expect.arrayContaining([siteOne, siteTwo]));
  });
});
