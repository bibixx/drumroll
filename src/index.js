const childProcess = require("child_process");

const play = require("./play");
const utils = require("./utils");

const { memoize } = utils;
const { FILE_DRUMROLL, FILE_WAH, FILE_SUCCESS } = require("./constants");

const run = () => {
  let innerCmdCode;
  const [,, innerCmd, ...innerArgs] = process.argv;
  const memoPlay = memoize(play.play);
  const playSound = (filename, loop = false) => memoPlay(
    filename,
    process.platform,
    innerCmd,
    loop
  );

  const drumrollProcess = playSound(FILE_DRUMROLL, true);

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

      drumrollProcess.kill();
    });
  }

  process.on("exit", () => {
    process.exit(innerCmdCode);
  });
};

module.exports = run;
