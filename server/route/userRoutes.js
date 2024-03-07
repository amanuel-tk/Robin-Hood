const express=require('express')
const router=express.Router()
const {authProtect}=require('../middleware/authMiddleware')
const{registerUser,recharge,profile,loginUser,buyStock,getStocksBySymbol,sellStock}=require('../controllers/userControllers')




router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/buy',authProtect, buyStock)
router.post('/recharge',authProtect, recharge)
router.get('/profile',authProtect, profile)
router.get('/stocks/:symbol',authProtect, getStocksBySymbol);
router.delete('/sell/:symbol',authProtect, sellStock);

module.exports=router