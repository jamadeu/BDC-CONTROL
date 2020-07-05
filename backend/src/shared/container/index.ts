import { container } from 'tsyringe';

import ISiteRepository from '@modules/site/repositories/ISiteRepository';
import SiteRepository from '@modules/site/infra/typeorm/repositories/SiteRepository';

import IAssetRepository from '@modules/asset/repositories/IAssetRepository';
import AssetRepository from '@modules/asset/infra/typeorm/repositories/AssetRepository';

import ITransferRepository from '@modules/asset/repositories/ITransferRepository';
import TransferRepository from '@modules/asset/infra/typeorm/repositories/TransferRepository';

container.registerSingleton<ISiteRepository>('SiteRepository', SiteRepository);

container.registerSingleton<IAssetRepository>(
  'AssetRepository',
  AssetRepository
);

container.registerSingleton<ITransferRepository>(
  'TransferRepository',
  TransferRepository
);
