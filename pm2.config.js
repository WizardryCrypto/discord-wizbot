// https://pm2.keymetrics.io/docs/usage/application-declaration/
const fs = require("fs");
const config = "./config.js";
const discordData = "../discord-data/wizbot";
const outLogFile = "./logs/pm2_output.log";
const errorLogFile = "./logs/pm2_error.log";

const copyConfig = async () => {
	fs.copyFile(`${discordData}/config.js`, config, (err) => {
		if (err) throw err;
	});
};

if (fs.existsSync(discordData)) {
	copyConfig();
}

module.exports = {
	apps: {
		name: "Wizbot",
		script: "./atlanta.js",
		out_file: outLogFile,
		error_file: errorLogFile,
	}
};