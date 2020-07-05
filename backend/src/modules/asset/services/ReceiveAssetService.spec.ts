import FakeTransferRepsitory from '@modules/asset/repositories/fakes/FakeTransferRepository';
import FakeAssetRepository from '@modules/asset/repositories/fakes/FakeAssetRepository';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import CreateSiteService from '@modules/site/services/CreateSiteService';
import AppError from '@shared/errors/AppError';
import CreateAssetRepositoy from './CreateAssetService';
import TransferOutService from './TransferOutService';
import ReceiveAssetService from './ReceiveAssetService';

let fakeTransferRepsitory: FakeTransferRepsitory;
let transfer: TransferOutService;
let fakeAssetRepository: FakeAssetRepository;
let createAsset: CreateAssetRepositoy;
let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;
let receive: ReceiveAssetService;

describe('ReceiveAsset', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    fakeSiteRepository = new FakeSiteRepository();
    createSite = new CreateSiteService(fakeSiteRepository);
    createAsset = new CreateAssetRepositoy(
      fakeAssetRepository,
      fakeSiteRepository
    );
    fakeTransferRepsitory = new FakeTransferRepsitory();
    transfer = new TransferOutService(
      fakeTransferRepsitory,
      fakeAssetRepository,
      fakeSiteRepository
    );
    receive = new ReceiveAssetService(
      fakeTransferRepsitory,
      fakeAssetRepository
    );
  });

  it('be able to receive an asset that is in transit', async () => {
    const site1 = await createSite.execute({
      name: 'site1',
    });
    const site2 = await createSite.execute({
      name: 'site2',
    });
    const asset = await createAsset.execute({
      partnumber: 'partnumber',
      serie: 'serie',
      site_id: site1.id,
    });

    const inTransit = await transfer.execute({
      asset_id: asset.id,
      site_destination_id: site2.id,
      invoice: 'invoice',
    });

    const in_transit_id = inTransit.id;
    const receivedInTransit = await receive.execute({ in_transit_id });
    const receivedAsset = await fakeAssetRepository.findById(asset.id);

    expect(receivedInTransit.delivered).toBeTruthy();
    expect(receivedAsset.site_id).toBe(site2.id);
  });

  it('not be able to receive an asset with invalid id', async () => {
    const in_transit_id = -1;
    await expect(receive.execute({ in_transit_id })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
