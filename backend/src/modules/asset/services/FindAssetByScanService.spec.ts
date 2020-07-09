import AppError from '@shared/errors/AppError';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import FindByScanService from './FindAssetByScanService';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';

let fakeAssetRepository: FakeAssetRepository;
let findByScan: FindByScanService;
let fakeSiteRepository: FakeSiteRepository;

describe('FindAssetByScan', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    fakeSiteRepository = new FakeSiteRepository();
    findByScan = new FindByScanService(fakeAssetRepository);
  });

  it('be able to find an asset by scanning', async () => {
    const site = await fakeSiteRepository.create({
      name: 'site',
    });
    const asset = await fakeAssetRepository.create({
      partnumber: 'partnumber',
      serie: 'serie',
      partnumber_serie: '1SPARTNUMBERSERIE',
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
