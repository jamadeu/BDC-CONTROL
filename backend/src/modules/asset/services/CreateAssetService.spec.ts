import AppError from '@shared/errors/AppError';
import { isUuid } from 'uuidv4';
import FakeSiteRepository from '@modules/site/repositories/fakes/FakeSiteRepository';
import FakeAssetRepository from '../repositories/fakes/FakeAssetRepository';
import CreateAssetRepositoy from './CreateAssetService';

let fakeAssetRepository: FakeAssetRepository;
let createAsset: CreateAssetRepositoy;
let fakeSiteRepository: FakeSiteRepository;

describe('CreateAsset', () => {
  beforeEach(() => {
    fakeAssetRepository = new FakeAssetRepository();
    fakeSiteRepository = new FakeSiteRepository();
    createAsset = new CreateAssetRepositoy(
      fakeAssetRepository,
      fakeSiteRepository
    );
  });

  it('be able to create a new asset', async () => {
    const site = await fakeSiteRepository.create({
      name: 'site',
    });
    const asset = await createAsset.execute({
      partnumber: 'partnumber',
      serie: 'serie',
      site_id: site.id,
    });

    expect(asset).toHaveProperty('id');
    expect(isUuid(asset.id)).toBeTruthy();
    expect(asset.partnumber).toBe('PARTNUMBER');
    expect(asset.serie).toBe('SERIE');
    expect(asset.partnumber_serie).toBe('1SPARTNUMBERSERIE');
    expect(asset.status).toBe('Available');
    expect(asset.site_id).toBe(site.id);
  });

  it('not be able to create a new asset if it already exists', async () => {
    const site = await fakeSiteRepository.create({
      name: 'site',
    });
    await createAsset.execute({
      partnumber: 'partnumber',
      serie: 'serie',
      site_id: site.id,
    });

    await expect(
      createAsset.execute({
        partnumber: 'partnumber',
        serie: 'serie',
        site_id: site.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('not be able to create a new asset with a invalid site id', async () => {
    await expect(
      createAsset.execute({
        partnumber: 'partnumber',
        serie: 'serie',
        site_id: 'invalid site id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
