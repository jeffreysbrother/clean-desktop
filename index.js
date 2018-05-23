'use strict';
const os = require('os'),
	chalk = require('chalk'),
	fs = require('fs'),

	desktopDir = `${os.homedir()}/Desktop`,
	documentsDir = `${os.homedir()}/Documents`,
	d = new Date(),
	month = d.getMonth(),
	date = d.getDate(),
	year = d.getFullYear(),
	hour = d.getHours(),
	minute = d.getMinutes(),
	second = d.getSeconds(),
	newDirName = `Cleanup--${month + 1}-${date}-${year}-${hour}-${minute}-${second}`,
	newDirPath = `${desktopDir}/${newDirName}`;


// dont' do anything if the new directory somehow exists
if (!fs.existsSync(newDirPath)) {
  fs.mkdirSync(newDirPath);
} else {
	console.log('That directory already exists!');
}


// move all desktop files (except the newly-created folder) within the new folder
function moveFiles() {
	return new Promise((resolve, reject) => {
		fs.readdirSync(desktopDir).forEach(file => {
			if (file !== newDirName) {
				fs.rename(`${desktopDir}/${file}`, `${newDirPath}/${file}`, function (err) {
					if (err) {
						reject('LOL');
					} else {
						resolve(`Files moved to new directory named ${chalk.yellow(newDirName)}`);
					}
				});
			}
		});
	});
}


function successCallback(result) {
	console.log(`Cleanup Successful! ${result}.`);
}

function failureCallback(error) {
	console.log(`Something bad happened, ${error}.`);
}


moveFiles()
	.then(successCallback)
	.catch(failureCallback);


// wanted to also move this new folder from /Desktop to /Documents ...
// but this wasn't working
