import FakeTransferRepsitory from '@modules/asset/repositories/fakes/FakeTransferRepository';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import CreateSiteService from '@modules/site/services/CreateSiteService';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';
import TransferOutService from './TransferOutService';
import CreateAssetRepositoy from './CreateAssetService';
import ListAllInTransitNotDelivered from './ListAllInTransitNotDeliveredService';

let fakeTransferRepsitory: FakeTransferRepsitory;
let transfer: TransferOutService;
let fakeAssetRepository: FakeAssetRepository;
let createAsset: CreateAssetRepositoy;
let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;
let list: ListAllInTransitNotDelivered;

describe('ListAllInTransitNotDelivered', () => {
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
    list = new ListAllInTransitNotDelivered(fakeTransferRepsitory);
  });

  it('be able to list all inTransit that were not delivered', async () => {
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

    const asset2 = await createAsset.execute({
      partnumber: 'partnumber2',
      serie: 'serie2',
      site_id: site1.id,
    });

    const inTransit = await transfer.execute({
      asset_id: asset.id,
      site_destination_id: site2.id,
      invoice: 'invoice',
    });

    const inTransit2 = await transfer.execute({
      asset_id: asset2.id,
      site_destination_id: site2.id,
      invoice: 'invoice2',
    });

    const listAllNotDelivered = await list.execute();

    expect(listAllNotDelivered).toEqual(
      expect.arrayContaining([inTransit, inTransit2])
    );
  });
});
