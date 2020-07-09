import { isUuid } from 'uuidv4';
import FakeTransferRepsitory from '@modules/asset/repositories/fakes/FakeTransferRepository';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import AppError from '@shared/errors/AppError';
import TransferOutService from './TransferOutService';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';

let fakeTransferRepsitory: FakeTransferRepsitory;
let transfer: TransferOutService;
let fakeAssetRepository: FakeAssetRepository;
let fakeSiteRepository: FakeSiteRepository;

describe('TransferOut', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    fakeSiteRepository = new FakeSiteRepository();
    fakeTransferRepsitory = new FakeTransferRepsitory();
    transfer = new TransferOutService(
      fakeTransferRepsitory,
      fakeAssetRepository,
      fakeSiteRepository
    );
  });

  it('be able to transfer an asset to another site', async () => {
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

    const inTransit = await transfer.execute({
      asset_id: asset.id,
      site_destination_id: site2.id,
      invoice: 'invoice',
    });

    expect(inTransit).toHaveProperty('id');
    expect(isUuid(inTransit.id)).toBeTruthy();
    expect(inTransit.asset_id).toBe(asset.id);
    expect(inTransit.site_origem_id).toBe(site1.id);
    expect(inTransit.site_destination_id).toBe(site2.id);
  });

  it('not be able to transfer an asset with a invalid id', async () => {
    const site = await fakeSiteRepository.create({
      name: 'site',
    });

    await expect(
      transfer.execute({
        asset_id: 'invalid asset id',
        site_destination_id: site.id,
        invoice: 'invoice',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able to transfer an asset if it is already in transit', async () => {
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

    await transfer.execute({
      asset_id: asset.id,
      site_destination_id: site2.id,
      invoice: 'invoice',
    });

    await expect(
      transfer.execute({
        asset_id: asset.id,
        site_destination_id: site2.id,
        invoice: 'invoice',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able to transfer an asset to a site with a invalid site id', async () => {
    const site = await fakeSiteRepository.create({
      name: 'site',
    });
    const asset = await fakeAssetRepository.create({
      partnumber: 'partnumber',
      serie: 'serie',
      partnumber_serie: '1SPARTNUMBERSERIE',
      site_id: site.id,
    });

    await expect(
      transfer.execute({
        asset_id: asset.id,
        site_destination_id: 'invalid site id',
        invoice: 'invoice',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
