const express = require('express')
const { createNew, getAll, getSingle, deleteSingle, updateSingle } = require('../controllers/taskController')
const  requireAuth  = require('../middleware/requireAuth')

const router = express.Router()

// to check if user is authorized
router.use(requireAuth)

//get all tasks
router.get('/', getAll)

// get a particular task
router.get('/:id', getSingle)

//create a task
router.post('/', createNew)

//delete a task
router.delete('/:id', deleteSingle)

//update a task
router.patch('/:id',updateSingle)


module.exports = router