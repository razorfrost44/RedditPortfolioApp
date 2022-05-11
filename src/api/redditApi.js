const url = "https://www.reddit.com";

const Reddit = {
  async getSubReddits() {
    const endpoint = `${url}/subreddits.json`;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.data.children.map((subreddit) => subreddit.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getSubRedditPosts(subreddit) {
    const endpoint = `${url}${subreddit}.json`;
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.data.children.map((post) => post.data);
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Reddit;
