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
      site: 'site',
    });
    expect(site).toHaveProperty('id');
    expect(site.site).toBe('site');
  });

  it('not possible to create a new site with a name that is already in use', async () => {
    await createSite.execute({
      site: 'site',
    });

    await expect(
      createSite.execute({
        site: 'site',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
