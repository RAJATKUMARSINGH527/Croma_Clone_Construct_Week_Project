const {UserProfile} = require('../models/userProfileModel');

// Create new user
exports.createProfile = async (req, res) => {
    try {
      if (req.body.dateOfBirth) req.body.dateOfBirth = new Date(req.body.dateOfBirth);
      if (req.body.dateOfAnniversary) req.body.dateOfAnniversary = new Date(req.body.dateOfAnniversary);
      
      const user = new UserProfile(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: Object.values(error.errors).map(e => e.message).join(', ') });
      }
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Get all users (Admin Purpose)
exports.getAllProfile = async (req, res) => {
  try {
    const users = await UserProfile.find().select('-__v');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
exports.getProfileById = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.params.id).select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
exports.updateProfile = async (req, res) => {
  try {
    if (req.body.dateOfBirth) req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    if (req.body.dateOfAnniversary) req.body.dateOfAnniversary = new Date(req.body.dateOfAnniversary);
    req.body.updatedAt = Date.now();

    const user = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
exports.deleteProfile = async (req, res) => {
  try {
    const user = await UserProfile.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
