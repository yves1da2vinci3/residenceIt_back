import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import Residence from '../models/ResidenceModel.js'


// @desc    Register a new residence
// @route   POST /api/residence
// @access  PRIVATE
const registerResidence = asyncHandler(async (req, res) => {
  const {  Description,Localisation,MoreInfoLocalisation, sexe ,imageUrls,videoUrl} = req.body
   
  const residence = await Residence.create({
    Description,
    Localisation,
    MoreInfoLocalisation,
    sexe,
    imageUrls,
    videoUrl
  })

  if (residence) {
    res.status(201).json({message : "residence crée avec succés",residence : residence})
  } else {
    
    res.status(400).json({ message:'Les données saisies sont incorrectes' })
  }
})

// @desc    Update Residence 
// @route   PUT /api/Residences/:residenceId
// @access  Private
const updateResidence = asyncHandler(async (req, res) => {
  const residence = await Residence.findById(req.params.residenceId)
 const {newImagesUrls,toggle,deleteArraysIndex,updatedVideo,updatedImage} = req.body
 console.log(newImagesUrls)
 console.log(deleteArraysIndex)
 console.table({updatedImage,updatedVideo})
 let NewArrayimageUrls = residence.imageUrls
 // tester si la video a été modifié
if(updatedVideo){
  residence.videoUrl =  req.body.videoUrl
}
 // supprimer tout les liens
if(updatedImage){
  // suppresion des liens 
  deleteArraysIndex.forEach(reference => {
    const index = NewArrayimageUrls.findIndex(img => img.Filereference === reference)
    NewArrayimageUrls.splice(index,1)
  });
  // ajout des nouvelles valeurs
  NewArrayimageUrls = [...NewArrayimageUrls,...newImagesUrls]
  // suppression des uplications
let uniqueImgurls = [...new Set(NewArrayimageUrls)];


  residence.imageUrls = uniqueImgurls
}

// maj des autres informations
  if (residence) {
    residence.Description = req.body.Description || residence.Description
    residence.Localisation = req.body.Localisation || residence.Localisation
    residence.MoreInfoLocalisation = req.body.MoreInfoLocalisation || residence.MoreInfoLocalisation
    residence.isAvailable = toggle

    const updatedresidence = await residence.save()

    res.json({  message : "mise a jour de la residence effectué avec succés" , newResidence : updatedresidence  })
  } else {
    res.status(404)
    throw new Error("La residence n'existe pas ")
  }
})

// @desc    Get all Residences
// @route   GET /api/Residences
// @access  Private/Admin
const getResidences = asyncHandler(async (req, res) => {
  const Residences = await Residence.find({})
  res.json(Residences)
})

// @desc    Delete Residence
// @route   DELETE /api/Residences/:id
// @access  Private/Admin
const deleteResidence = asyncHandler(async (req, res) => {
  const residence = await Residence.findById(req.params.id)

  if (residence) {
    await residence.remove()
    res.json({ message: 'residence supprimé ' })
  } else {
    res.status(404)
    throw new Error(" residence non trouvée")
  }
})

// @desc    Get Residence by ID
// @route   GET /api/Residences/:id
// @access  Private/Admin
const getResidenceById = asyncHandler(async (req, res) => {
  console.log(req.params.residenceId)
  const residence = await Residence.findById(req.params.residenceId)
    // Yes, it's a valid ObjectId, proceed with `findById` call.
  if (residence) {
    res.json(residence)
  } else {
    res.status(404)
    throw new Error("la residence na pas été rétrouvéé ")
  }
  
})



export {
  registerResidence,
  updateResidence,
  getResidences,
  deleteResidence,
  getResidenceById,
}
