const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dzqbzqgjm/image/upload/v1587010900/default-user_qjqjqz.png",
      trim: true,
    },
    cover_picture: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "intersex"]
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends:
    {
      type: Array,
      default: [],
    },

    observing:
    {
      type: Array,
      default: [],
    },

    observers:
    {
      type: Array,
      default: [],
    },
    requests:
    {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      nickname: {
        type: String,
      },
      bio: {
        type: String,
      },
      location: {
        type: String,
      },
    },

    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],

    savedDebates: [
      {
        debate: {
          type: ObjectId,
          ref: "Debate",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },

  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);