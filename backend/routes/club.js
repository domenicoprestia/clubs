const express = require('express')
const {createClub, deleteClub, approveClub, argumentClub, approveArgument, getAllClubs, getClubsOnName, getClubsOnTopic, getClubOnName, getTopClubs} = require('../controllers/club')
const auth = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/create', auth, createClub)
router.delete('/delete/:slug', auth, deleteClub)
router.put('/:_id/approve', auth, approveClub) 
router.put('/:_id/argument', auth, argumentClub) 
router.put('/:_id/argument/approve', auth, approveArgument) 
router.get('/all', getAllClubs) 
router.get('/slug/:slug', getClubOnName) 
router.get('/all/slug/:slug', getClubsOnName)
router.get('/topic/:topic', getClubsOnTopic) 
router.get('/top', getTopClubs)

module.exports = router

