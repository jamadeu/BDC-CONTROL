import FakeTransferRepsitory from '@modules/asset/repositories/fakes/FakeTransferRepository';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';
import ListAllInTransitNotDelivered from './ListAllInTransitNotDeliveredService';

let fakeTransferRepsitory: FakeTransferRepsitory;
let fakeAssetRepository: FakeAssetRepository;
let fakeSiteRepository: FakeSiteRepository;
let list: ListAllInTransitNotDelivered;

describe('ListAllInTransitNotDelivered', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    fakeSiteRepository = new FakeSiteRepository();
    fakeTransferRepsitory = new FakeTransferRepsitory();
    list = new ListAllInTransitNotDelivered(fakeTransferRepsitory);
  });

  it('be able to list all inTransit that were not delivered', async () => {
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

    const asset2 = await fakeAssetRepository.create({
      partnumber: 'partnumber2',
      serie: 'serie2',
      partnumber_serie: '1SPARTNUMBER2SERIE2',
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

    const inTransit2 = await fakeTransferRepsitory.transferOut({
      asset_id: asset2.id,
      site_origem_id: site1.id,
      site_destination_id: site2.id,
      invoice: 'invoice2',
      sla: 'GREEN',
      delivered: false,
    });

    const listAllNotDelivered = await list.execute();

    expect(listAllNotDelivered).toEqual(
      expect.arrayContaining([inTransit, inTransit2])
    );
  });
});
