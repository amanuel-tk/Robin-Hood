const express=require('express')
const router=express.Router()
const{registerUser,loginUser,buyStock,getStocksBySymbol,sellStock}=require('../controllers/userControllers')




router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/buy', buyStock)
router.get('/stocks/:symbol', getStocksBySymbol);
router.delete('/sell/:symbol', sellStock);

module.exports=router