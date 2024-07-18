const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
const Video = require('../Models/VideoModel');

// for getting all videos
router.get('/videos', async (req, res) => {
    const { username } = req.query;
  
    try {
      const receivedVideos = await Video.find({ sentTo: username });
      res.status(200).json(receivedVideos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch incoming videos' });
    }
  });

  // for saving videos
  router.post('/videos', async (req, res) => {
    const { videoId, sentTo, sentBy } = req.body;
    console.log(videoId, sentTo, sentBy);

    try {
        const user = await User.findOne({ username: sentTo });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newVideo = new Video({ videoId, sentTo, sentBy });
        const savedVideo = await newVideo.save();

        res.status(201).send(savedVideo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send video' });
    }
});

// for checking video exist or not 
router.get('/checkvideo', async (req, res) => {
    const { username, videoId } = req.query;
  
    try {
      const videoExists = await Video.exists({ sentTo: username, videoId });
      res.status(200).json({ sent: videoExists });
    } catch (error) {
      console.error('Error checking sent videos:', error);
      res.status(500).json({ error: 'Failed to check sent videos' });
    }
  });

module.exports = router