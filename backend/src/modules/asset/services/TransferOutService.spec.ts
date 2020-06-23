/*
 * @Author: Jean Amadeu
 */

// TODO validar se asset existe
// TODO validar se o site existe
// TODO validar se o asset ja não está em transito

import FakeTransferRepsitory from '@modules/asset/repositories/fakes/FakeTransferRepository';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import CreateSiteService from '@modules/site/services/CreateSiteService';
import AppError from '@shared/errors/AppError';
import TransferOutService from './TransferOutService';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';
import CreateAssetRepositoy from './CreateAssetService';

let fakeTransferRepsitory: FakeTransferRepsitory;
let transfer: TransferOutService;
let fakeAssetRepository: FakeAssetRepository;
let createAsset: CreateAssetRepositoy;
let fakeSiteRepository: FakeSiteRepository;
let createSite: CreateSiteService;

describe('TransferOut', () => {
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
  });

  it('be able to transfer an asset to another site', async () => {
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

    expect(inTransit).toHaveProperty('id');
    expect(inTransit.asset_id).toBe(asset.id);
    expect(inTransit.site_origem_id).toBe(site1.id);
    expect(inTransit.site_destination_id).toBe(site2.id);
    expect(inTransit.sla).toBe('GREEN');
  });

  it('not be able to transfer an asset with a invalid id', async () => {
    const site = await createSite.execute({
      name: 'site',
    });

    await expect(
      transfer.execute({
        asset_id: -1,
        site_destination_id: site.id,
        invoice: 'invoice',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
