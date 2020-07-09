import FakeTransferRepsitory from '@modules/asset/repositories/fakes/FakeTransferRepository';
import FakeAssetRepository from '@modules/asset/repositories/fakes/FakeAssetRepository';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import AppError from '@shared/errors/AppError';
import ReceiveAssetService from './ReceiveAssetService';

let fakeTransferRepsitory: FakeTransferRepsitory;
let fakeAssetRepository: FakeAssetRepository;
let fakeSiteRepository: FakeSiteRepository;
let receive: ReceiveAssetService;

describe('ReceiveAsset', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    fakeSiteRepository = new FakeSiteRepository();
    fakeTransferRepsitory = new FakeTransferRepsitory();
    receive = new ReceiveAssetService(
      fakeTransferRepsitory,
      fakeAssetRepository
    );
  });

  it('be able to receive an asset that is in transit', async () => {
    const site1 = await fakeSiteRepository.create({
      name: 'site1',
    });
    const site2 = await fakeSiteRepository.create({
      name: 'site2',
    });
    const asset = await fakeAssetRepository.create({
      partnumber: 'partnumber',
      serie: 'serie',
      partnumber_serie: '1SPARTNUMBERSERIE',
      site_id: site1.id,
    });

    const inTransit = await fakeTransferRepsitory.transferOut({
      asset_id: asset.id,
      site_origem_id: site1.id,
      site_destination_id: site2.id,
      invoice: 'invoice',
      sla: 'GREEN',
      delivered: false,
    });

    const in_transit_id = inTransit.id;
    const receivedInTransit = await receive.execute({ in_transit_id });
    const receivedAsset = await fakeAssetRepository.findById(asset.id);

    expect(receivedInTransit.delivered).toBeTruthy();
    expect(receivedAsset.site_id).toBe(site2.id);
  });

  it('not be able to receive an asset with invalid id', async () => {
    const in_transit_id = 'invalid id';
    await expect(receive.execute({ in_transit_id })).rejects.toBeInstanceOf(
      AppError
    );
  });
});
