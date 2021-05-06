const express = require('express')
const {createClub, deleteClub, approveClub, argumentClub, approveArgument, getAllClubs, getClubsOnName, getClubsOnTopic} = require('../controllers/club')
const auth = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/create', auth, createClub)
router.delete('/delete/:slug', auth, deleteClub)
router.put('/:_id/approve', auth, approveClub) 
router.put('/:_id/argument', auth, argumentClub) //todo
router.put('/argument/approve', auth, approveArgument) //todo
router.get('/all', getAllClubs) 
router.get('/slug/:slug', getClubsOnName)  
router.get('/topic/:topic', getClubsOnTopic) 

module.exports = router

