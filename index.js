require('dotenv').config();
const express = require('express');
const ApiVideoClient = require('@api.video/nodejs-client');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.json()); // For parsing application/json

const apiKey = process.env.API_VIDEO_API_KEY
// Initialize api.video client

console.log("API KEY", apiKey)

const client = new ApiVideoClient({ apiKey: apiKey });

// Endpoint to generate an upload token
app.get('/generate-upload-token', async (req, res) => {
  try {
    const uploadToken = await client.uploadTokens.createToken();
    res.json(uploadToken);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// vi1lYcN7LqloFi9gPe3quPLp

// Endpoint to create a private video
app.post('/create-private-video', async (req, res) => {
  try {
    const { title, description } = req.body;
    const video = await client.videos.create({
      title,
      description,
      public: false, // Set video to private
    });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve video playback URL with access token
app.get('/get-video/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;

    // Generate an access token for the video
    //const accessTokenObj = await client.getAccessToken();
    //const accessToken = accessTokenObj.accessToken
    // Construct the playback URL with the access token
    //const playbackUrl = `https://embed.api.video/vod/${videoId}?token=${accessToken}`;
    const videoObject = await client.videos.get(videoId)
    const playbackUrl = videoObject.assets
    res.json(playbackUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
