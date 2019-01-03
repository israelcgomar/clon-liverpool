/**
 * @author    Israel Castillo  <israel5837@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   AGPL-3.0
 */

 import axios from 'axios';
 import _ from 'lodash';

 export default async function (req, res, next) {
        axios
          .get(process.env.liverpool_api)
          .then(function(response) {
            
            const data =  response.data.contents;
            
            let mainContent = [];
            for (let i = 0; i < data.length; i++) {
              mainContent = data[i];              
            }

            let contentsArticle = [];
            for (let i = 0; i < mainContent.mainContent.length; i++) {
                contentsArticle = mainContent.mainContent[i].contents;
            }
            
            let records = [];
            for (let i = 0; i < contentsArticle.length; i++) {
                records = contentsArticle[i].records;                            
            }

            /**
             * Get Articles
             */
            const getNameArticles = _.map(records, "productDisplayName");            
            const concat = [...new Set([].concat(...getNameArticles))];

            let name;
            const outputName = _.zipWith(name,concat,(name, concat) => ({name,concat}));

            /**
             * Get Price
             */
            const getPrice = _.map(records, "listPrice");        
            const concatPrice = [...new Set([].concat(...getPrice))];
                        
            let price;
            const outputPrice = _.zipWith(price,concatPrice,(price, concatPrice) => ({price, concatPrice}));

            /**
             * Get Image 
             */
            const getImg = _.map(records, "largeImage");        
            const concatImg = [...new Set([].concat(...getImg))];

            let img;
            const outputImg = _.zipWith(img,concatImg,(img, concatImg) => ({img,concatImg}));

            const marge = _.merge(outputName, outputPrice, outputImg);
            
            res.status(200).json({articles: marge});

          })
          .catch(function(error) {
            console.log(error);
          });
        
 }