import asyncHandler from 'express-async-handler'
import Message from '../models/MessageModel.js'
import Request from '../models/RequestModel.js'
import Residence from '../models/ResidenceModel.js'
import User from '../models/UserModel.js'

// @desc    Register a new message
// @route   POST /api/request
// @access  PRIVATE
const registerMessage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id) 
const residence = await Residence.findById(user.ResidenceId)
 const { Description,type} = req.body
 console.log(type)
const userName = `   ${user.lastName} ${user.firstName}  `  
const ResidenceName =   residence.Localisation
console.log(residence.Localisation)
  const message = await Message.create({
    Description,
      type,
    ResidenceName,
    userName
  })

  if (message) {
    res.status(201).json({ message: " votre requete a été envoyé avec success"})
  } else {
    
    res.status(400).json({ message:'Les données saisies sont incorrectes' })
  }
})


// @desc    recuperer tout les messages 
// @route   GET/api/request/message
// @access  PRIVATE
const getMessages = asyncHandler(async (req,res) =>{
    const Messages = await Message.find({}).sort({ createdAt : "desc"})
     res.json(Messages)

})

const getMessageById = asyncHandler( async (req,res) =>{
const message = await Message.findById(req.params.id)
if(message) {
    return res.json(message)
}
res.status(404).json({message : 'aucun message trouvé'})

})

// @desc    Register a new reque,Forfeitst
// @route   POST /api/request
// @access  PRIVATE
const registerResquest  =   asyncHandler(async (req,res) =>{
const  { Forfeit,userId,ResidenceId} = req.body

const residence = await Request.create({
    Forfeit,userId,ResidenceId
})

if(residence) {
    res.status(201).json({message : "requete enregistré avec succés"})
}else{
    res.status(400).json({message : 'les données saisies sont invalides'})
}

})
// @desc    Register a new request
// @route   GET /api/request
// @access  PRIVATE
const GetResquestByUser  =        asyncHandler(async (req,res) =>{
const request =  await Request.findById(req.params.id)
const residence = await Residence.findById(request.ResidenceId).select('')
const user = await User.findById(request.userId)

res.status(200).json({
    residence, user,request
})
})

// @desc    validate a  request
// @route   PUT /api/request/:id/validate
// @access  PRIVATE

const validateRequest = asyncHandler( async (req,res) =>{
    const request =  await Request.findById(req.params.id)
    const user = await User.findById(request.userId)
    user.isValidate = true
    user.ResidenceId = request.ResidenceId
    request.requestStatus = 3
    try {
        await user.save()
        await request.save()
 res.status(202).json({ message : 'requete validée avec succés'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ErrorMessage  : error})
    }
 
    
})
// @desc    deny  a  request
// @route   PUT /api/request/:id/deny
// @access  PRIVATE

const DenyRequest = asyncHandler( async (req,res) =>{
    const request =  await Request.findById(req.params.id)
    const user = await User.findById(request.userId)
    user.isValidate = false
    request.requestStatus = 2
    try {
        await user.save()
        await request.save()
 res.status(202).json({ message : 'requete refusée avec succés'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ErrorMessage  : error})
    }
 
})
const getRequests = asyncHandler( async (req,res) =>{
    const requests =  await Request.find({}).sort({ createdAt : "desc"})
    
res.json(requests)

 
})

export {
    registerMessage,
    getMessages,
    getMessageById,registerResquest,
    GetResquestByUser,DenyRequest,validateRequest,getRequests

}
