const Twit = require('twit');
const express = require('express')

const app = express()
app.use(express.static('public'));

const T = new Twit({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
});

app.all('/post', async (req, res) => {


  
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
