function generateMarkdown(data) {
  return `
# ${data.title}

##
Description
$ {
  data.description
}##
Table of Contents## Installation## Usage## License
$ {
  data.license
}##
Contributing## Tests## Questions
Email: $ {
  data.email
}![profile picture]($ {
  data.avatarUrl
})

`;
};

module.exports = generateMarkdown;