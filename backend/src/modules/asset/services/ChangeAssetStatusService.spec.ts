/*
 * @Author: Jean Amadeu
 */
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import CreateSiteService from '@modules/site/services/CreateSiteService';
import AppError from '@shared/errors/AppError';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';
import ChangeAssetStatus from './ChangeAssetStatusService';
import CreateAssetRepositoy from './CreateAssetService';

let fakeAssetRepository: FakeAssetRepository;
let changeStatus: ChangeAssetStatus;
let createAsset: CreateAssetRepositoy;
let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;

describe('ChangeAssetStatus', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    changeStatus = new ChangeAssetStatus(fakeAssetRepository);
    fakeSiteRepository = new FakeSiteRepository();
    createSite = new CreateSiteService(fakeSiteRepository);
    createAsset = new CreateAssetRepositoy(
      fakeAssetRepository,
      fakeSiteRepository
    );
  });

  it('be able to change the status of an asset', async () => {
    const site = await createSite.execute({
      name: 'site',
    });
    const asset = await createAsset.execute({
      partnumber: 'partnumber',
      serie: 'serie',
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
        asset_id: -1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
