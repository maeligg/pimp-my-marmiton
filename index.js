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

app.all('/post', async (req, res) => {
  axios.get('https://www.googleapis.com/customsearch/v1', {
    params: {
      cx: "014769181873588812818:gixypzez3dx",
      key: process.env.custom_search_key,
      q: "\"j'ai ajouté\"|\"j'ai rajouté\"|\"j'ai enlevé\"|\"j'ai changé\"|\"j'ai modifié\"",
      num: "1",
      start: Math.floor(Math.random() * 100) + 1
    }
  })
  .then(function (response) {
    console.log('data fetched successfully');
    
    const snippet = response.data.items[0].snippet;
    const url = response.data.items[0].link;
    
    postTweet(snippet + url);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    res.sendStatus(200);
  });
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
