const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  try {
    //extract email and password from request
    const { email, password } = req.body;
    //Find if there is a user having that email and password
    const user = await userModel.findOne({ email, password });
    //If not found, means user does not exist
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    //Else user has been found, so log him in successfully
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
   //req.body stores all the user details, the user has input during user registration.
   //A new instance of userModel is created.
    const newUser = new userModel(req.body);
    /*It then saves the newly created user object to the database 
    using the save method. The save method is an asynchronous operation, 
    so it is prefixed with the await keyword to wait for it to complete before proceeding. */
    await newUser.save();
    /*If the user is successfully saved to the database, it sends 
    a JSON response with a status of 201 (created) and a success message 
    along with the newly created user object. */
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };