const express = require('express');
const router = express.Router();
const auth = require('../middleware/is-auth');

const Conversation = require('../models/conversation');
const User = require('../models/users');


router.patch('/:conversation_id', async (req, res) => {
    try {
        let conversation = await Conversation.findById(req.params.conversation_id);
        if(!conversation) {
            return res.status(404).json({errors: [ {msg: "Conversation was not found"}] });
        }
        conversation.messages.push(req.body);
        await conversation.save();
        return res.status(200).json({msg: "Message was posted"});
    } catch (e) {
        return res.status(500).json({errors: [ {msg: "Something went wrong, try again."}]})
    }
})


router.get('/:conversation_id', async (req, res) => {
    try {
        let conversation = await Conversation.findById(req.params.conversation_id);
        if(!conversation) {
            return res.status(404).json({errors: [ {msg: "Conversation was not found"}] });
        }
        let messages = conversation.messages.sort((m1, m2) => m2.createdAt - m1.createdAt);
        let count = 0;
        messages = messages.filter(msg => {
            if (count < 10) {
              count++;
              return true;
            }
            return false;
          }, );
        
        return res.status(200).json(messages);
    } catch (e) {
        return res.status(500).json({errors: [ {msg: "Something went wrong, try again."}]})
    }
})


module.exports = router;