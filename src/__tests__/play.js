const sinon = require("sinon");
const childProcess = require("child_process");
const fs = require("fs");
const { play } = require("../play");
const utils = require("../utils");

describe("play", () => {
  beforeEach(() => {
    sinon.stub(childProcess, "spawn");
    sinon.stub(utils, "hasCommand");

    utils.memoize = "123";

    utils.hasCommand.returns(false);

    childProcess.spawn.returns({
      stdout: {
        resume: jest.fn(),
        unref: jest.fn(),
      },
      stderr: {
        resume: jest.fn(),
        unref: jest.fn(),
      },
      stdin: {
        resume: jest.fn(),
        unref: jest.fn(),
      },
      unref: jest.fn(),
      on: jest.fn(),
    });
  });

  afterEach(() => {
    childProcess.spawn.restore();
    utils.hasCommand.restore();
  });

  it("should throw if filename is not passed", () => {
    expect(() => play()).toThrow();
  });

  test.each([
    ["aix", "play"],
    ["darwin", "afplay"],
    ["freebsd", "play"],
    ["linux", "play"],
    ["openbsd", "play"],
    ["sunos", "play"],
  ])(
    "if platform is \"%s\" should use \"%s\" command to play sound",
    (platform, expectedBin) => {
      play("", platform, "");

      expect(childProcess.spawn.calledWith(expectedBin)).toEqual(true);
    }
  );

  describe("if possible platform win32", () => {
    const platform = "win32";

    it("should play sound using vlc command from $PATH", () => {
      utils.hasCommand.callsFake(cmd => cmd === "vlc");

      play("", platform, "");

      expect(childProcess.spawn.calledWith("vlc")).toEqual(true);
    });

    it("should play sound using vlc.exe from 'Program Files (x86)'", () => {
      const vlcPath = "C:\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe";

      sinon.stub(fs, "existsSync");
      fs.existsSync.callsFake(path => path === vlcPath);

      play("", platform, "");

      expect(childProcess.spawn.calledWith(vlcPath)).toEqual(true);

      fs.existsSync.restore();
    });

    it("should play sound using vlc.exe from 'Program Files'", () => {
      const vlcPath = "C:\\Program Files\\VideoLAN\\VLC\\vlc.exe";
      sinon.stub(fs, "existsSync");
      fs.existsSync.callsFake(() => true);

      play("", platform, "");

      expect(childProcess.spawn.calledWith(vlcPath)).toEqual(true);

      fs.existsSync.restore();
    });
  });

  it("should use \"mplayer\" if it is available", () => {
    utils.hasCommand.returns(true);
    const filename = "";

    play(filename);

    expect(childProcess.spawn.calledWith("mplayer", ["-really-quiet", filename])).toEqual(true);
  });

  it("should return process", () => {
    const playResultKeys = Object.keys(play("test"));
    const requiredKeys = ["stdin", "stdout", "stderr"];

    expect(playResultKeys).toEqual(expect.arrayContaining(requiredKeys));
  });

  test.each([
    ["stdout"],
    ["stderr"],
    ["stdin"],
  ])("should call unref on %s if innerCmd is present", (std) => {
    const spy = sinon.spy();

    const returns = {
      stdout: {
        resume: jest.fn(),
        unref: jest.fn(),
      },
      stderr: {
        resume: jest.fn(),
        unref: jest.fn(),
      },
      stdin: {
        resume: jest.fn(),
        unref: jest.fn(),
      },
      unref: jest.fn(),
      on: jest.fn(),
    };

    returns[std].unref = spy;

    childProcess.spawn.returns(returns);

    play("", "", "node");

    expect(spy.calledOnce).toEqual(true);
  });
});
