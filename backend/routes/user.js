const express = require('express');
const { createUser, loginUser, editUser, deleteUser, getUser } = require('../controllers/user');
const auth = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/register', createUser)
router.post('/login', loginUser)
router.put('/edit', auth, editUser) 
router.delete('/delete', auth, deleteUser)
router.get('/:username', getUser)

module.exports = router