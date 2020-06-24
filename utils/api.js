const axios = require("axios");

const api = {
  getUser(username) {
    const endpoint = `https://api.github.com/users/${username}`;
    const config = {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };
    return axios.get(endpoint, config).then(({ data }) => {
      const { email, avatar_url } = data;
      // default email or empty string
      return {
        email: email || "no email found",
        avatarUrl: avatar_url,
      };
    });
  },
};

module.exports = api;
