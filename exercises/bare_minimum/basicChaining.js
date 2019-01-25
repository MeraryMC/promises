/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');

var promiseConstructors = require('./promiseConstructor.js');
var promisified = require('./promisification.js');

var writeFile = function(filepath, data, callback) {
  fs.writeFile(filepath, data, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

var writeFileAsync = Promise.promisify(writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructors.pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => promisified.getGitHubProfileAsync(username))
    .then((body) => writeFileAsync(writeFilePath, JSON.stringify(body)));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
