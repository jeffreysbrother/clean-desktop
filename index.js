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

let alreadyPlayed = false;


// dont' do anything if the new directory somehow exists
if (!fs.existsSync(newDirPath)) {
  fs.mkdirSync(newDirPath);
} else {
	console.log('That directory already exists!');
}


const message = err => {
	if (alreadyPlayed === false) {
		if (err) {
			console.log(err);
			alreadyPlayed = true;
		} else {
			console.log(`Files moved to: ${chalk.yellow(newDirName)}`);
			alreadyPlayed = true;
		}
	}
}


const rename = file => {
	if (file !== newDirName) {
		fs.rename(`${desktopDir}/${file}`, `${newDirPath}/${file}`, message);
	}
}


(function cleanDesktop() {
	fs.readdirSync(desktopDir).forEach(rename);
})();


// wanted to also move this new folder from /Desktop to /Documents ...
// but this wasn't working
