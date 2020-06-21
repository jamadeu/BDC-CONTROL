/*
 * @Author: Jean Amadeu
 */

import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AssetController from '../controllers/AssetController';

const assetRouter = Router();
const assetController = new AssetController();

assetRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      partnumber: Joi.string().required(),
      serie: Joi.string().required(),
      site_id: Joi.number().required(),
    },
  }),
  assetController.create
);

assetRouter.put(
  '/:asset_id',
  celebrate({
    [Segments.PARAMS]: {
      asset_id: Joi.number().required(),
    },
    [Segments.BODY]: {
      status: Joi.string().required(),
    },
  }),
  assetController.update
);

assetRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      scan: Joi.string().required(),
    },
  }),
  assetController.show
);

export default assetRouter;
