/*
 * @Author: Jean Amadeu
 * @Last Modified by:   Jean Amadeu
 */

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SiteController from '../controllers/SiteController';

const sitesRouter = Router();
const siteController = new SiteController();

sitesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  siteController.create
);

sitesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.number().required(),
      name: Joi.string().required(),
    },
  }),
  siteController.update
);

sitesRouter.get('/', siteController.index);

export default sitesRouter;
