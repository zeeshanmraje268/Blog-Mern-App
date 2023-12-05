const express=require('express');
const router=express.Router();
const {getAllUsers,registerController,loginController}=require('../controller/userController');
router.get('/all-user',getAllUsers);
router.post('/register',registerController);
router.post('/login',loginController);
module.exports=router;