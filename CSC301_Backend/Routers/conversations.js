const express = require("express");
const router = express.Router();
const auth = require("../middleware/is-auth");

const Conversation = require("../models/conversation");
const User = require("../models/users");

router.get("/:user_id", async (req, res) => {
  try {
    let user = await User.findById(req.params.user_id).populate(
      "conversations",
      "_id userNameOne userNameTwo conversationType userIdOne userIdTwo"
    );
    const conversations = user.conversations;
    return res.status(200).json(conversations);
  } catch (e) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again." }] });
  }
});

router.delete("/:conversation_id", async (req, res) => {
  try {
    let conversation = await Conversation.findById(req.params.conversation_id);
    if (!conversation) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Conversation was not found" }] });
    }
    const { userIdOne, userIdTwo } = conversation;
    await Conversation.remove({ _id: req.params.conversation_id });
    let user_one = await User.findById(userIdOne);
    let user_two = await User.findById(userIdTwo);
    user_one.conversations.pull(req.params.conversation_id);
    user_two.conversations.pull(req.params.conversation_id);
    await user_one.save();
    await user_two.save();
    return res.status(200).json({ msg: "Conversation was deleted" });
  } catch (e) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Something went wrong, try again." }] });
  }
});

module.exports = router;
