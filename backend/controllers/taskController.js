
const mongoose = require('mongoose')

const Task = require('../models/taskModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET , {expiresIn: '3d'})
}

//get all tasks
const getAll = async (req, res) => {

    const user_id = req.user._id

    const task = await Task.find({user_id}).sort({createdAt: -1})
    res.status(200).json(task)         
}

//get single task
const getSingle = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such id'})
    }
    
    const task = await Task.findById(id)
    if(!task){
        return res.status(404).json({error: 'no such task'})
    }
    res.status(200).json(task)        
}

// create new task
const createNew =  async (req, res) => {
    const {title, desc} = req.body

    const emptyFields = []

    if(!title){
        return res.status(400).json({err: 'Your Task should atleast have a Title!'})
    }
    try{
        const user_id = req.user._id
        const task = await Task.create({title, desc, user_id}) //create a new workout
        res.status(200).json(task)        
    } 
    catch(err){
        res.status(400).json({err: err.message})
    }
}

//delete any
const deleteSingle = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such id'})
    }

    const task = await Task.findOneAndDelete({ _id: id })

    if(!task){
        return res.status(400).json({error: 'no such task'})
    }

    res.status(200).json(task)
}

//updateAny
const updateSingle = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such id'})
    }

    const task = await Task.findOneAndUpdate({ _id: id }, {...req.body}, {new: true})

    if(!task){
        return res.status(400).json({error: 'no such task'})
    }

    res.status(200).json(task)
}

//loginUser
const loginUser = async (req, res) => {

    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}

//signupUser
const signupUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.signup(email, password) 

        //token
        const token = createToken(user._id)

        res.status(200).json({ email, token })

    }
    catch(err){
        res.status(400).json({error: err.message})
    }
}


module.exports = { createNew, getAll, getSingle, deleteSingle, updateSingle, loginUser, signupUser }