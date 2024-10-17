var express = require('express');
var router = express.Router();


const { getCategoies,createUrlImg,saveCategory,changeState,updateImgCategory,getById,
} = require('../controllers/categories');


router.post('/',  saveCategory);
router.get('/',getCategoies)
router.put('/:id',updateImgCategory)
router.get('/image/:id',createUrlImg)
router.put('/state/:id',changeState)
router.put('/updateImageCategory/:id', updateImgCategory)
router.get('/:id', getById)

module.exports = router;
 