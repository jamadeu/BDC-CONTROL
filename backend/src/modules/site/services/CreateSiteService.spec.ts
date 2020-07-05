import AppError from '@shared/errors/AppError';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import CreateSiteService from './CreateSiteService';

let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;

describe('CreateSite', () => {
  beforeEach(() => {
    fakeSiteRepository = new FakeSiteRepository();
    createSite = new CreateSiteService(fakeSiteRepository);
  });

  it('be able to create a new site', async () => {
    const site = await createSite.execute({
      name: 'site',
    });
    expect(site).toHaveProperty('id');
    expect(site.name).toBe('site');
  });

  it('not be able to create a new site with a name that is already in use', async () => {
    await createSite.execute({
      name: 'site',
    });

    await expect(
      createSite.execute({
        name: 'site',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
