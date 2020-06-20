/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import { Router } from 'express';
import sitesRouter from '@modules/site/infra/http/routes/site.routes';

const routes = Router();

routes.use('/sites', sitesRouter);

export default routes;
