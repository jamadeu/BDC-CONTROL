import AppError from '@shared/errors/AppError';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';
import ChangeAssetStatusService from './ChangeAssetStatusService';

let fakeAssetRepository: FakeAssetRepository;
let changeStatus: ChangeAssetStatusService;
let fakeSiteRepository: FakeSiteRepository;

describe('ChangeAssetStatus', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    changeStatus = new ChangeAssetStatusService(fakeAssetRepository);
    fakeSiteRepository = new FakeSiteRepository();
  });

  it('be able to change the status of an asset', async () => {
    const site = await fakeSiteRepository.create({
      name: 'site',
    });
    const asset = await fakeAssetRepository.create({
      partnumber: 'partnumber',
      serie: 'serie',
      partnumber_serie: '1SPARTNUMBERSERIE',
      site_id: site.id,
    });
    const updatedAsset = await changeStatus.execute({
      status: 'REPAIR',
      asset_id: asset.id,
    });
    expect(updatedAsset.id).toEqual(asset.id);
    expect(updatedAsset.status).toBe('REPAIR');
  });

  it('not be able to change the status of an asset that does not exist', async () => {
    await expect(
      changeStatus.execute({
        status: 'REPAIR',
        asset_id: 'invalid id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
