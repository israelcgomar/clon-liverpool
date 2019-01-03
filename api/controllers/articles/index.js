/**
 * @author    Israel Castillo  <israel5837@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   AGPL-3.0
 */

 import $Articles from '../../db/models/articles';
 import format from 'accounting';

 export async function createArticle(req, res, next) {

    try {

    const { name, price } = req.body;

    if (!price.match(/^[1-9]\d*(\.\d+)?$/))
       return res.status(400).json({ success: false, message: 'Precio incorrecto, favor de validar.' });
    
    const priceFormat = format.formatMoney(Number(price));
      
    const findArticle = await $Articles.findOne({ name: name, price: priceFormat });
    
    if (findArticle) 
      return res.status(400).json({  success: false, message: 'El articulo ya se encuentra en existencia.' });

    const articles = await $Articles.create({ name, price: priceFormat, image: '' });
    
    return articles;
    
        
    } catch (error) {
     res.status(500).json({ error: 'Ha ocurrido un error favor de intentarlo más tarde' })   
    }
 }

  export async function allArticles(req, res, next) {
    try {
       const allArticles = await $Articles.find();

       if (allArticles.length === 0)
         return res.status(400).json({ success: false, message: 'No existen articulos.' })

         res.status(200).json({ articles: allArticles });
    } catch (error) {       
       res.status(500).json({ error: 'Ha ocurrido un error, favor de intentarlo más tarde' }) 
    }
 }

 export async function findArticule (req, res, next) {
     try {
       const { id } = req.params;
 
        if (!id.match(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
          return res.status(400).json({ success: false, message: 'El articulo no existe, favor de validar.' });
        
        const findArticle = await $Articles.findById({ _id: id });
       
        if (!findArticle)
          return res.status(400).json({ success: false, message: 'El articulo no existe, favor de validar.' });
       
          res.status(200).json({ articles: findArticle });
          
    } catch (error) {
       res.status(500).json({ error: 'Ha ocurrido un error, favor de intentarlo más tarde' }) 
    }
 }

 export async function editArticle(req, res,  next) {
     try {
       const { id } = req.params;
       const { name, price } = req.body;
       const priceFormat = format.formatMoney(price)

        if (!price.match(/^[1-9]\d*(\.\d+)?$/))
          return res.status(400).json({ success: false, message: 'Precio incorrecto, favor de validar.' });
    
        if (!id.match(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
          return res.status(400).json({ success: false, message: 'El articulo no existe, favor de validar.' });
        
        const findArticle = await $Articles.findById({ _id: id });

        if (!findArticle) 
            return res.status(400).json({ success: false, message: 'Articulo no encontrado.' });
           
        await $Articles.findOneAndUpdate({ _id: findArticle.id }, { $set: { name: name, price: priceFormat } });

        if (!editArticle)
          return res.status(400).json({ success: false, message: 'El articulo no existe, favor de validar.' });

          const updateReady = await $Articles.findById({ _id: id });
          return res.status(200).json({ articles: updateReady });
          
    } catch (error) {
       console.log(error);
       
       res.status(500).json({ error: 'Ha ocurrido un error, favor de intentarlo más tarde' }) 
    }
 }

 export async function deleteArticle(req, res, next) {
    const { id } = req.params;

    if (!id.match(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/))
    return res.status(400).json({ success: false, message: 'El articulo no existe, favor de validar.' });

    const removeArticle = await $Articles.findByIdAndRemove({ _id: id });

    if (!removeArticle)
          return res.status(400).json({ success: false, message: 'El articulo que desea eliminar no existe, favor de validar.' });

          res.status(200).json({ articles: removeArticle });
 }