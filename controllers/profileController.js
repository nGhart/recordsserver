const Profile = require('../models/profile');

const getAllProfiles = async (request, response) => {
  try {
    const profiles = await Profile.find({ user: request.user._id });
    response.json({ profiles });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const getSingleProfile = async (request, response) => {
  try {
    const profileId = request.params.id;
    const profile = await Profile.findOne({
      _id: profileId,
      user: request.user._id,
    });
    response.json({ profile });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const createProfile = async (request, response) => {
  try {
    const name = request.body.name;
    const email = request.body.email;
    const number1 = request.body.number1;
    const number2 = request.body.number2;
    const building = request.body.building;
    const street = request.body.street;
    const city = request.body.city;
    const country = request.body.country;
    const logo = request.body.logo;
    const profile = await Profile.create({
      name,
      email,
      number1,
      number2,
      building,
      street,
      city,
      country,
      logo,
      user: request.user._id,
    });
    response.json({ profile });
  } catch (error) {
    console.log(error.message);
  }
};

const editProfile = async (request, response) => {
  try {
    //get ID
    const profileId = request.params.id;
    //get data
    const name = request.body.name;
    const email = request.body.email;
    const number1 = request.body.number1;
    const number2 = request.body.number2;
    const building = request.body.building;
    const street = request.body.street;
    const city = request.body.city;
    const country = request.body.country;
    const logo = request.body.logo;
    //update
    await Profile.findOneAndUpdate(
      { _id: profileId, user: request.user._id },
      {
        name,
        email,
        number1,
        number2,
        building,
        street,
        city,
        country,
        logo,
      }
    );
    //find updated
    const profile = await Profile.findById(profileId);
    //return updated
    response.json({ profile });
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

const deleteProfile = async (request, response) => {
  try {
    const profileId = request.params.id;
    await Profile.deleteOne({ _id: profileId, user: request.user._id });
    response.send('Deleted!');
  } catch (error) {
    console.log(error.message);
    response.sendStatus(400);
  }
};

module.exports = {
  getAllProfiles,
  getSingleProfile,
  createProfile,
  editProfile,
  deleteProfile,
};
