/**
 * @author    Israel Castillo  <israel5837@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   AGPL-3.0
 */

/* Dependencies */
import express from 'express';
import bb from 'express-busboy';

import {
  createArticle,
  allArticles,
  findArticule,
  editArticle,
  deleteArticle,
} from '../controllers/articles';

import articlesLiverpool from '../controllers/articles/livepool-articles'

import { 
  createImageArticle, 
  consultImageArticle } from '../controllers/articles/image-article'

const router = express.Router();
const prefix = '/articles';
const app = express();

router.post(prefix, createArticle);
router.get(prefix, allArticles);
router.get(`${prefix}/:id`, findArticule);
router.put(`${prefix}/:id`, editArticle);
router.delete(`${prefix}/:id`, deleteArticle);

router.post(
  `${prefix}-image`,
  bb.extend(app, { upload: true }),
  createImageArticle
);

router.get(`${prefix}-image/:id`, consultImageArticle);

router.get(`${prefix}-liverpool`, articlesLiverpool);

export default router;
