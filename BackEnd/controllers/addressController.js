const Address = require('../models/addressModel');

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    // Unset any existing default addresses if the new one is default
    if (req.body.isDefault) {
      await Address.updateMany({ isDefault: true }, { $set: { isDefault: false } });
    }

    // Create and save the new address
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();

    res.status(201).json({
      success: true,
      message: 'Address saved successfully',
      data: {
        ...savedAddress.toObject(),
        fullAddress: `${savedAddress.addressLine }, ${savedAddress.fullName}, ${savedAddress.locality}, ${savedAddress.city}, ${savedAddress.state} - ${savedAddress.pinCode}`
      }
    });
  } catch (error) {
    console.error('Error saving address:', error);
    res.status(500).json({ success: false, message: 'Failed to save address', error: error.message });
  }
};


exports.getAllAddresses = async (req, res) => {
  try {
    // Fetch all addresses sorted by most recent
    const addresses = await Address.find().sort({ createdAt: -1 });

    // Map addresses to include fullAddress
    const formattedAddresses = addresses.map(addr => ({
      ...addr.toObject(),
      fullAddress: `${addr.addressLine }, ${addr.fullName}, ${addr.locality}, ${addr.city}, ${addr.state} - ${addr.pinCode}`
    }));

    res.status(200).json({
      success: true,
      count: formattedAddresses.length,
      data: formattedAddresses
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch addresses', error: error.message });
  }
};

// Get a single address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        ...address.toObject(),
        fullAddress: `${address.addressLine }, ${address.fullName},${address.locality}, ${address.city}, ${address.state} - ${address.pinCode}`
      }
    });
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch address', error: error.message });
  }
};

// Update an address
exports.updateAddress = async (req, res) => {
  try {
    // If updating to default, unset previous default
    if (req.body.isDefault) {
      await Address.updateMany({ isDefault: true }, { $set: { isDefault: false } });
    }

    // Find and update the address
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: {
        ...updatedAddress.toObject(),
        fullAddress: `${updatedAddress.addressLine }, ${updatedAddress.fullName}, ${updatedAddress.locality}, ${updatedAddress.city}, ${updatedAddress.state} - ${updatedAddress.pinCode}`
      }
    });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ success: false, message: 'Failed to update address', error: error.message });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);

    if (!deletedAddress) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.status(200).json({ success: true, message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ success: false, message: 'Failed to delete address', error: error.message });
  }
};
