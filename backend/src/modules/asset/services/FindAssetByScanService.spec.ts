import AppError from '@shared/errors/AppError';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import CreateSiteService from '@modules/site/services/CreateSiteService';
import FindByScanService from './FindAssetByScanService';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';
import CreateAssetRepositoy from './CreateAssetService';

let fakeAssetRepository: FakeAssetRepository;
let findByScan: FindByScanService;
let createAsset: CreateAssetRepositoy;
let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;

describe('FindAssetByScan', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    findByScan = new FindByScanService(fakeAssetRepository);
    fakeSiteRepository = new FakeSiteRepository();
    createSite = new CreateSiteService(fakeSiteRepository);
    createAsset = new CreateAssetRepositoy(
      fakeAssetRepository,
      fakeSiteRepository
    );
  });

  it('be able to find an asset by scanning', async () => {
    const site = await createSite.execute({
      name: 'site',
    });
    const asset = await createAsset.execute({
      partnumber: 'partnumber',
      serie: 'serie',
      site_id: site.id,
    });
    const scan = `1S${asset.partnumber}${asset.serie}`.toUpperCase();
    const foundAsset = await findByScan.execute({ scan });

    expect(foundAsset).toEqual(asset);
  });

  it('not be able to find an asset that does not exist', async () => {
    const scan = 'non-exists-scan';
    await expect(findByScan.execute({ scan })).rejects.toBeInstanceOf(AppError);
  });
});
