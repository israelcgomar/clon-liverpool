/**
 * @author    Israel Castillo  <israel5837@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   AGPL-3.0
 */

 import fs from 'fs';
 import path from 'path';
 import $Articles from '../../db/models/articles';
 import format from "accounting";
 

 export async function createImageArticle(req, res, next) {

    try {

        const { name, price } = req.body;
        const randomId = Math.floor(Math.random() * 6382) + 1;  
        
      
        if (!name)
         return res.status(400).json({message: 'Ingrese el nombre del producto'})
        
        if (!price)
          return res.status(400).json({ message: "Ingrese el precio" });
      
        const priceFormat = format.formatMoney(Number(price));
        const findArticle = await $Articles.findOne({ name: name });
        
        if (findArticle)
          return res.status(400).json({ success: false, message: "El articulo ya se encuentra en existencia." });
    
         const file = req.files.file;

         const fileExt = `.${file.filename.split('.').pop().toString()}`;
         const fileVal = /(\.jpg|\.jpeg|\.png)$/i;

         if (!fileVal.exec(fileExt)) return res
             .status(200)
             .json({ success: false, message: "Archivo inválido" });
 
         const tmpDir = path.resolve(__dirname, "../../uploads");

         if (!fs.existsSync(tmpDir)) {
           fs.mkdirSync(tmpDir);
         }

         const tmpFilePath = path.join(tmpDir, `${randomId + fileExt}`);
         
         const reader = await fs.createReadStream(file.file);         
         const stream = await fs.createWriteStream(tmpFilePath);
         
         const articles = await $Articles.create({
           name,
           price: priceFormat,
           image: randomId,
           linkImage: `http://localhost:8010/api/v1/articles-image/${randomId}`,
           extImg: randomId + fileExt
         });

         reader.pipe(stream);
         res.status(200).json({ success: true, article: articles });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Ha ocurrido un error, favor de intentar más tarde.'});
    }
    

 }

 export async function consultImageArticle(req, res, next) {

    try {
        const { id } = req.params;
 
        const findArticle = await $Articles.find({ image: id });
      
        if (!findArticle)
          return res.status(400).json({ success: false, message: 'El articulo no existe, favor de validar.' });

        if (findArticle.image === '')
          return res.status(400).json({ success: false, message: 'Articulo sin imagen asignada' });
        
        const tmpDir = path.resolve(__dirname, `../../uploads/${findArticle[0].extImg}`);
        
        const image = await fs.readFileSync(tmpDir);
        
        res.writeHead(200, { 'Content-Type': (findArticle[0].image.split('.').pop() === 'png') ? 'image/png' : 'image/jpeg' });

        res.write(image, 'binary');
          
        return res.end();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Ha ocurrido un error, favor de intentar más tarde.'});
    }
   
  

 }