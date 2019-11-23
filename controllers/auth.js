const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId:candidate._id
      },keys.jwt,{expiresIn: 60*60})
      res.status(200).json({ token: `Bearer ${token}` })
    }
    else {
      res.status(401).json({ message: 'Password not found' })
    }
  }
  else {
    res.status(404).json({ message: 'Email not found' })
  }
}
module.exports.register = async function (req, res) {
  //res.status(200).json({ register: true })
  /* const user = new User({
    email: req.body.email,
    password: req.body.password
  })
  user.sa ve().then(()=>console.log('user creted'))*/
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    res.status(409).json({ message: 'Email is ready' })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt)
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      console.log('error on save')
    }
  }
}