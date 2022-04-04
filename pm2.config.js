// https://pm2.keymetrics.io/docs/usage/application-declaration/
const fs = require("fs");
const config = "./config.js";
const wcData = "../discord-data/wizbot";
let outLogFile;
let errorLogFile;

const copyConfig = async () => {
	fs.copyFile(`${wcData}/config.js`, config, (err) => {
		if (err) throw err;
	});
};

if (fs.existsSync(wcData)) {
	copyConfig();
	outLogFile = `${wcData}/logs/pm2_output.log`;
	errorLogFile = `${wcData}/logs/pm2_error.log`;
} else {
	outLogFile = "./pm2_output.log";
	errorLogFile = "./pm2_error.log";
}

module.exports = {
	apps: {
		name: "Wizbot",
		script: "./atlanta.js",
		out_file: outLogFile,
		error_file: errorLogFile,
	}
};