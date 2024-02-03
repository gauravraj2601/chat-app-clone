const mongoose= require("mongoose")

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        maxlength: 50,
      },
      avatar: {
        type: String ,
        // required: true
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
    },
    {
        timestamps: true
    },
    {
      versionKey: false,
    }
  );
  
  const User_Model = mongoose.model("User", userSchema);
  
  module.exports = {
    User_Model,
  };
  