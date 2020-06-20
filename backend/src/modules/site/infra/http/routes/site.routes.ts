/*
 * @Author: Jean Amadeu
 * @Date: 2020-06-20 14:53:43
 * @Last Modified by: Jean Amadeu
 * @Last Modified time: 2020-06-20 14:56:20
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
      name: Joi.string().required(),
    },
  }),
  siteController.update
);

sitesRouter.get('/', siteController.index);

export default sitesRouter;
