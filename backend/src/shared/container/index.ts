/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import { container } from 'tsyringe';

import ISiteRepository from '@modules/site/repositories/ISiteRepository';
import SiteRepository from '@modules/site/infra/typeorm/repositories/SiteRepository';

container.registerSingleton<ISiteRepository>('SiteRepository', SiteRepository);
