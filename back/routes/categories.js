var express = require('express');
var router = express.Router();


const { getCategoies,saveCategory,putCategorie,changeState,updateImgCategory} = require('../controllers/categories');


router.post('/',  saveCategory);
router.get('/',getCategoies)
router.put('/:id',putCategorie)
router.put('/state/:id',changeState)
router.put('/updateImageCategory/:id',updateImgCategory)

module.exports = router;
 