import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import ListAllSites from './ListAllSitesService';

let fakeSiteRepository: FakeSiteRepository;
let listSites: ListAllSites;

describe('UpdateSite', () => {
  beforeEach(() => {
    fakeSiteRepository = new FakeSiteRepository();
    listSites = new ListAllSites(fakeSiteRepository);
  });

  it('be able to list all sites', async () => {
    const siteOne = await fakeSiteRepository.create({
      name: 'site1',
    });

    const siteTwo = await fakeSiteRepository.create({
      name: 'site2',
    });

    const listSite = await listSites.execute();

    expect(listSite).toEqual(expect.arrayContaining([siteOne, siteTwo]));
  });
});
