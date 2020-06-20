import AppError from '@shared/errors/AppError';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import UpdateSiteService from './UpdateSiteService';
import CreateSiteService from './CreateSiteService';

let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;
let updateSite: UpdateSiteService;

describe('UpdateSite', () => {
  beforeEach(() => {
    fakeSiteRepository = new FakeSiteRepository();
    createSite = new CreateSiteService(fakeSiteRepository);
    updateSite = new UpdateSiteService(fakeSiteRepository);
  });

  it('be able to update a site', async () => {
    const site = await createSite.execute({
      name: 'site',
    });

    const updatedSite = await updateSite.execute({
      id: site.id,
      name: 'updated-site',
    });
    expect(updatedSite.id).toBe(site.id);
    expect(updatedSite.name).toBe('updated-site');
  });

  it('not be able to update a site with a invalid id', async () => {
    await expect(
      updateSite.execute({
        id: -1,
        name: 'site',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able update the name site to a name that is already in use', async () => {
    await createSite.execute({
      name: 'site',
    });

    const siteToUpdate = await createSite.execute({
      name: 'siteToUpdate',
    });

    await expect(
      updateSite.execute({
        id: siteToUpdate.id,
        name: 'site',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
