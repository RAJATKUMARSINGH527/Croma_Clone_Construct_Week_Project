// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       sparse: true,
//       trim: true,
//       minlength: 3,
//       maxlength: 20,
//     },
//     email: {
//       type: String,
//       unique: true,
//       sparse: true, // Allows users without email
//       trim: true,
//       lowercase: true,
//       match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email regex
//     },
//     phoneNumber: {
//       type: String,
//       unique: true,
//       sparse: true, // Allows users without phone
//       trim: true,
//       match: /^[0-9]{10}$/, // Ensures a valid 10-digit phone number
//     },
//     verified: {
//       type: Boolean,
//       default: false, // Updates to true after OTP verification
//     },
//     isDeleted: {
//       type: Boolean,
//       default: false, // Soft delete functionality
//     },
//   },
//   { timestamps: true, versionKey: false }
// );

// // Create indexes for optimized queries
// UserSchema.index({ email: 1 });
// UserSchema.index({ phoneNumber: 1 });

// const UserModel = mongoose.model("User", UserSchema);

// module.exports = { UserModel };

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users with `null` emails
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Invalid email format.",
      },
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple users with `null` phone numbers
      trim: true,
      validate: {
        validator: function (phone) {
          return !phone || /^[0-9]{10}$/.test(phone);
        },
        message: "Phone number must be 10 digits.",
      },
    },
    isVerified: {
      type: Boolean,
      default: false, // Updates to true after OTP verification
    },
  },
  { timestamps: true, versionKey: false }
);

// Ensure at least one field (email or phone) is present
UserSchema.pre("save", function (next) {
  if (!this.email && !this.phoneNumber) {
    return next(new Error("Either email or phone number must be provided."));
  }
  next();
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };
