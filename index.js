const inquirer = require("inquirer");
const fs = require("fs");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [{
    type: "input",
    name: "title",
    message: "What is your project title?",
  },
  {
    type: "input",
    name: "description",
    message: "What is your project description?",
  },

  {
    type: "input",
    message: "What command should be run to install dependencies?",
    name: "installCommand",
  },

  {
    type: "input",
    message: "What command will invoke this app to run?",
    name: "runCommand",
  },

  {
    type: "input",
    message: "What command will test the app?",
    name: "testCommand",
  },

  {
    type: "list",
    name: "license",
    message: "What is your project license?",
    choices: ["MIT", "GNU GPLv3", "Apache License 2.0"],
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Success!");
  });
}

function init() {
  const fileName = "README.md";
  inquirer
    .prompt({
      type: "input",
      name: "username",
      message: "What is your Github username?",
    })
    .then(({
      username
    }) => {
      return api.getUser(username);
    })
    .then((user) => {
      return inquirer.prompt(questions).then((answers) => {
        const mdData = {
          ...answers,
          ...user,
        };
        const markdown = generateMarkdown(mdData);
        writeToFile(fileName, markdown);
      });
    })
    .catch((err) => console.log(err));
}

init();