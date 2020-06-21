/*
 * @Author: Jean Amadeu
 */

import { container } from 'tsyringe';

import ISiteRepository from '@modules/site/repositories/ISiteRepository';
import SiteRepository from '@modules/site/infra/typeorm/repositories/SiteRepository';

import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import AssetRepository from '@modules/asset/infra/typeorm/repositories/AssetRepository';

container.registerSingleton<ISiteRepository>('SiteRepository', SiteRepository);

container.registerSingleton<IAssetRepository>(
  'AssetRepository',
  AssetRepository
);
