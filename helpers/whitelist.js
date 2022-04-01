const fs = require("fs");
const Web3 = require("web3");
const whitelistFile = "whitelist.txt";
const whitelistManifestFile = "whitelist-manifest.json";

const checkMessageFormat = async (message) => {
	try {
		const web3 = new Web3();
		const check = web3.utils.isAddress(message);
		if (check) {
			return true;
		} else {
			return false;
		}
        
	} catch (e) {
		return false;
	}
};

const checkWhitelistFile = async (address) => {
	if (fs.existsSync(whitelistFile)) {
		const getWhitelist = fs.readFileSync(whitelistFile, "utf-8");

		if (getWhitelist.includes(address)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

const checkWhitelistManifestFile = async (userName, userId, address) => {
	if (fs.existsSync(whitelistManifestFile)) {
		const getWhitelistManifest = fs.readFileSync(whitelistManifestFile, "utf-8");

		if (getWhitelistManifest.includes(userName)) {
			console.log(getWhitelistManifest.includes(userName));
			return true;
		} else if (getWhitelistManifest.includes(userId)) {
			console.log(getWhitelistManifest.includes(userId));
			return true;
		} else if (getWhitelistManifest.includes(address)) {
			console.log(getWhitelistManifest.includes(address));
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

const writeWhitelistFile = async (address) => {
	const check = await checkWhitelistFile(address);

	if (!check) {
		address = address + "\n";
		fs.appendFileSync(whitelistFile, address, (err) => {
        
			// In case of a error throw err.
			if (err) throw err;
		});
	}
};

const writeWhitelistManifestFile = async (userName, userId, messageId, address) => {
	const check = await checkWhitelistManifestFile(userName, userId, address);

	if (!check) {
		let jsonWhitelistManifest;
		if (fs.existsSync(whitelistManifestFile)) {
			const getWhitelistManifest = fs.readFileSync(whitelistManifestFile,"utf-8");
			jsonWhitelistManifest = JSON.parse(getWhitelistManifest);
		} else {
			jsonWhitelistManifest = [];
		}
        
		const dateTime = Date.now();
		const tempData = {
			name: userName,
			id: userId,
			message: messageId,
			date: dateTime,
			address: address,
		};

		jsonWhitelistManifest.push(tempData);
		fs.writeFileSync(
			whitelistManifestFile,
			JSON.stringify(jsonWhitelistManifest, null, 2)
		);

		writeWhitelistFile(address);
	}
};

const writeWhitelist = async (userName, userId, messageId, address) => {
	writeWhitelistManifestFile(userName, userId, messageId, address);
};

module.exports = {
	checkMessageFormat,
	writeWhitelist,
};