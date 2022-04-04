const mongoose = require("mongoose");

module.exports = mongoose.model("Whitelist", new mongoose.Schema({
	id: { type: String }, // Discord ID of the user
	guildID: { type: String }, // ID of the guild to which the member is connected
	username: { type: String },
	messageID: { type: String },
	postDate: { type: Number, default: Date.now() },
	walletAddress: { type: String },
	entryCounter: { type: Number },
}));