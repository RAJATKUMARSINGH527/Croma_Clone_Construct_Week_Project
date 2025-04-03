const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullName: { type: String, required: true, trim: true },
    mobileNumber: { 
      type: String, 
      required: true, 
      match: [/^\d{10}$/, "Invalid mobile number format"]
    },
    nickName: { type: String, required: true, trim: true },
    pinCode: { 
      type: String, 
      required: true, 
      match: [/^\d{6}$/, "Invalid pin code format"]
    },
    addressLine: { type: String, required: true, trim: true },
    landmark: { type: String, trim: true },
    locality: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    addressType: { 
      type: String, 
      enum: ["Home", "Work", "Other"], 
      default: "Home" 
    },
    isDefault: { type: Boolean, default: false },
    mapLocation: { type: String, trim: true }
  },
  { timestamps: true, versionKey: false, collection: "addresses" } // Specify collection name and disable version key
);

// Virtual field to generate full address dynamically
addressSchema.virtual("fullAddress").get(function () {
  // Ensure all address fields are available, otherwise return a default string

  const addressLine = this.addressLine || 'N/A';
  const fullName = this.fullName || 'N/A';
  const locality = this.locality || 'N/A';
  const city = this.city || 'N/A';
  const state = this.state || 'N/A';
  const pinCode = this.pinCode || 'N/A';
  
  return `${addressLine}, ${fullName} ,${locality}, ${city}, ${state} - ${pinCode}`;
});

// Ensure virtuals are included in JSON output
addressSchema.set("toJSON", { virtuals: true });
addressSchema.set("toObject", { virtuals: true });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
