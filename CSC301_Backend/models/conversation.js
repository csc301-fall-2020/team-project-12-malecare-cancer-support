const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConversationSchema = new Schema(
  {
    userIdOne: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userIdTwo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userNameOne: {
      type: String,
      required: true,
    },
    userNameTwo: {
      type: String,
      required: true,
    },
    messages: {
      type: [MessageSchema],
    },
    conversationType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
