const Twit = require('twit');
const express = require('express');
const axios = require('axios');

const app = express()
app.use(express.static('public'));

const T = new Twit({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
});

const searchUrl = 'https://www.googleapis.com/customsearch/v1?q=%22j%27ai%20ajout%C3%A9%22%7C%22j%27ai%20rajout%C3%A9%22%7C%22j%27ai%20enlev%C3%A9%22%7C%22j%27ai%20chang%C3%A9%22%7C%22j%27ai%20modifi%C3%A9%22&cx=014769181873588812818%3Agixypzez3dx&key=AIzaSyBg2sX6awj4WfTQglFRdk9JfCvg3MvNv_Q'

app.all('/post', async (req, res) => {
  axios.get('https://www.googleapis.com/customsearch/v1', {
    params: {
      key: "AIzaSyBg2sX6awj4WfTQglFRdk9JfCvg3MvNv_Q",
      q: "\"j'ai ajouté\"|\"j'ai rajouté\"|\"j'ai enlevé\"|\"j'ai changé\"|\"j'ai modifié\"",
      cx: "014769181873588812818:gixypzez3dx"
    }
  })
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

  
  console.log('songs data fetched successfully');
  
  res.sendStatus(200);
});

// Publish the tweet
const postTweet = tweetContent => {
	T.post('statuses/update', { status: tweetContent }, (err, data, resp) => {
		if (err) {
			console.log('error: ', err);
		} else {
			console.log('response: ', resp);
		}
	});
};

const listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
