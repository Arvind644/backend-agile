const express = require('express');
const router = express.Router();
const Note = require("../Models/Note");
const User = require("../Models/UserModel");

// for creating notes
router.post('/notes', async (req, res) => {
  const {username} = req.body
  const user = await User.findOne({ username });

  try {
    const newNote = new Note({
      videoId: req.body.videoId,
      timestamp: req.body.timestamp,
      content: req.body.content,
      userId: user._id,
    });

    const savedNote = await newNote.save();
    return res.status(200).send(savedNote);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// for getting notes based on username and videoId
router.get('/notes', async (req, res) => {
    const {username, videoId} = req.query
    const user = await User.findOne({ username });
   
  try {
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      const notes = await Note.find({ userId: user._id, videoId: videoId });
      if (!notes) {
          return res.json({ message: 'No notes found' });
      }
      return res.status(200).send(notes);
  } catch(err) {
    return res.status(500).send(err);
  }
});

// for getting all notes based on username
router.get('/allnotes', async (req, res) => {
  const {username} = req.query
  const user = await User.findOne({ username });
 
try {
  if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const notes = await Note.find({ userId: user._id});
    if (!notes) {
        return res.json({ message: 'No notes found' });
    }
    return res.status(200).send(notes);
} catch(err) {
  return res.status(500).send(err);
}
});

// for getting a note based on ID
router.get('/notes/:id', async (req, res) => {
  const {username} = req.query
  const user = await User.findOne({ username });

  try {
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send({ error: 'Note not found' });
    }
    return res.status(200).send(note);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// for updating one notes based on id
router.put('/notes/:id', async (req, res) => {
  const {username} = req.query
  const user = await User.findOne({ username });

  try {
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).send({ error: 'Note not found' });
    }
    return res.status(200).send(note);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// for deleting one notes based on id
router.delete('/notes/:id', async (req, res) => {
  const {username} = req.query
  const user = await User.findOne({ username });

  try {
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const note = await Note.deleteOne({_id : req.params.id});
    if (!note) {
      return res.status(404).send({ error: 'Note not found' });
    }
    return res.status(200).send({ message: 'Note deleted successfully' });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
