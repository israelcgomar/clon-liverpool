/**
 * @author    Conecta
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    image: {
        type: String,
        required: false
    },
    linkImage: {
        type: String,
        required: false
    },
    extImg: {
      type: String,
      required: false
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model("Article", ArticleSchema);