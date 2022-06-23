import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { Email, password } = req.body

  const user = await User.findOne({ Email })
  if ((user) && ( await user.matchPassword(password))) {
    if(user.isValidate ){
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber : user.phoneNumber,
        Email: user.Email,
        isAdmin: user.isAdmin,
        sex : user.sex,
        ResidenceId : user.ResidenceId,
        birthDate : user.birthDate,
        School : user.School,
        token: generateToken(user._id),
      })
      req.user = user;
    }else{
      res.status(401).json({ message:" vous n ' avez pas encore l'accès a l'espace utilisateur   " })
    }
 
  } else {
    res.status(401).json({ message:'Email ou mot de passe incorrect' })
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {  firstName,lastName,Email, password ,sex,phoneNumber,ResidenceId,birthDate,School} = req.body

 
  const userExists = await User.findOne({ Email })

  if (userExists) {
    res.status(400).json({ message:'Utilisateur existe deja' })
    // throw new Error('Utilisateur existe deja')
  }
   
   
  const user = await User.create({
    firstName,
    lastName,
    phoneNumber,
    Email,
    password,
    sex,
    ResidenceId,
    birthDate,
    School
  })

  if (user) {
    res.status(201).json(user)
  } else {
    
    res.status(400).json({ message:'Les données saisies sont incorrectes' })
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')

  if (user) {
    res.json(user
    )
  } else {
    res.status(400).json({ message:'Utilisateur non trouve' })
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.birthDate = req.body.birthDate || user.birthDate
    user.School = req.body.School || user.School
    user.Email = req.body.Email || user.Email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber
    if (req.body.password) {
      user.password = req.body.password
    }

 await user.save()

    res.status(201).json({  message : "mise a jour effectuée avec succés"  })
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).where("isAdmin").equals(false)
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'utilisateur supprimé ' })
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.Email = req.body.Email || user.Email
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.Email = req.body.Email || user.Email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber

    const updatedUser = await user.save()

    res.json({
      _id: user._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      Email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      phoneNumber : updatedUser.phoneNumber,
    })
  } else {
    res.status(404)
    throw new Error("L'utilisateur non trouvé")
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
