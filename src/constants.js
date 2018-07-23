const { getSoundLocation } = require("./utils");

const FILE_DRUMROLL = getSoundLocation("drumroll.mp3");
const FILE_WAH = getSoundLocation("wah.mp3");
const FILE_SUCCESS = getSoundLocation("success.mp3");

module.exports = {
  FILE_DRUMROLL,
  FILE_WAH,
  FILE_SUCCESS,
};