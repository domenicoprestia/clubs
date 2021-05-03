const express = require('express')
const {createClub, deleteClub, approveClub, argumentClub, approveArgument, getAllClubs, getClubsOnName, getClubOnTopic} = require('../controllers/club')
const auth = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/create', auth, createClub)
router.delete('/delete/:slug', auth, deleteClub)
router.put('/approve', auth, approveClub) //todo
router.put('/argument', auth, argumentClub) //todo
router.put('/argument/approve', auth, approveArgument) //todo
router.get('/all', getAllClubs) //todo
router.get('/:name', getClubsOnName) //todo 
router.get('/:topic', getClubsOnTopic) //todo

module.exports = router

