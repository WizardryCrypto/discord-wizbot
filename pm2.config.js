// https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
	apps: {
		name: "Wizbot",
		script: "./atlanta.js",
		out_file: "./pm2_logging.log",
		error_file: "./pm2_error.log",
	}
};