const profile = require('../model/profile')
const profileTemplate = require('../model/profile')

module.exports = {
  getProfile : async (req, res) => {
    const _id = req.user._id
    profile.findById(_id).then(data => {
      console.log('profile data', data);
      res.json(data)
    }).catch(err => {
      console.log('error at getting profile', err);
      res.status(401).json({error : err.message})
    })
  }, 

  updateProfile: (req, res) => {
    const _id = req.user._id
    const newProfile = new profileTemplate({...req.body})
    console.log('newProfile', newProfile);
    profile.findOneAndUpdate(_id, newProfile, {upsert
    : true, new: true}).then(data => {
      console.log('updated data', data);
      res.json(data)
    }).catch(err => {
      console.log('error at updating', err);
      res.status(401).json({error : err.message})
    })
  }
}