var express = require('express');
var router = express.Router();


const { getCategories,createUrlImg,saveCategory,changeState,updateImgCategory,getById,getVideoUrl
} = require('../controllers/categories');


router.get('/',getCategories)
router.patch('/state/:id',changeState)
router.post('/',  saveCategory);
router.put('/:id',updateImgCategory)
router.get('/image/:id',createUrlImg)
router.get('/video/:id',getVideoUrl)
router.put('/updateImageCategory/:id', updateImgCategory)
router.get('/:id', getById)

module.exports = router;