const childProcess = require("child_process");

const play = require("./play");
const utils = require("./utils");

const { memoize } = utils;
const { FILE_DRUMROLL, FILE_WAH, FILE_SUCCESS } = require("./constants");

const run = () => {
  let innerCmdCode;

  const [,, innerCmd, ...innerArgs] = process.argv;
  const memoPlay = memoize(play.play);
  const playSound = filename => memoPlay(filename, process.platform, innerCmd);
  const drumrollProcess = playSound(FILE_DRUMROLL);

  if (innerCmd) {
    const commandProcess = childProcess.spawn(
      innerCmd,
      innerArgs,
      { stdio: "inherit" }
    );

    commandProcess.on("exit", (code) => {
      innerCmdCode = code;
      if (code === 0) {
        playSound(FILE_SUCCESS);
      } else {
        playSound(FILE_WAH);
      }
    });
  }

  process.on("exit", () => {
    drumrollProcess.kill();

    process.exit(innerCmdCode);
  });
};

module.exports = run;
