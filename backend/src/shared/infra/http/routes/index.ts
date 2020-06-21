/*
 * @Author: Jean Amadeu
 */

import { Router } from 'express';
import sitesRouter from '@modules/site/infra/http/routes/site.routes';
import assetRouter from '@modules/asset/infra/http/routes/asset.routes';

const routes = Router();

routes.use('/sites', sitesRouter);
routes.use('/assets', assetRouter);

export default routes;
