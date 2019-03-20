const fetch = require('node-fetch');
const apiKey = require('./credentials/tumblr.json').apiKey

class Tumblr {

	async start(tumblr, tag){
		let fetchedResponse = await this.fetchContent(tumblr, tag, apiKey);
		const json = await fetchedResponse.json();
		const response = json.response;

		const totalPosts = response.total_posts;
		const posts = response.posts;

	//Tumblr accepts max 20 posts each request
	const numberOfRequests = Math.ceil(totalPosts/20);

	let requestsResults = [];

	for(let i = 0; i < numberOfRequests; i++){
		requestsResults.push(await this.requestPosts(numberOfRequests, tumblr, tag, apiKey, i));
	}

	return requestsResults;
	}

	async fetchContent(tumblr, tag, apiKey, offset = 0){
		return fetch('https://api.tumblr.com/v2/blog/' + tumblr + '.tumblr.com/posts?tag=' + tag + '&limit=20&offset=' + offset + '&api_key=' + apiKey)
	}

	async requestPosts(numberOfRequests, tumblr, tag, apiKey, currentRequest = 0){
		let fetchedResponse = await this.fetchContent(tumblr, tag, apiKey, currentRequest*20);
		const json = await fetchedResponse.json();
		const response = json.response;
		const posts = response.posts;

		let resultsFetched = []

		posts.forEach(val => {
			if(val.type == 'photo'){
				resultsFetched.push({date: val.date, content: val.photos[0].original_size.url});
			}else if(val.type == 'text'){
				resultsFetched.push({date: val.date, content: val.body});
			}else if(val.type == 'quote'){
				resultsFetched.push({date: val.date, content: val.text});
			}else{
				resultsFetched.push({date: val.date, content: val.text});
			}
		})

		return resultsFetched;

	}
}
module.exports = Tumblr;
