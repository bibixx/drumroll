const sinon = require("sinon");
const childProcess = require("child_process");
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
    ["win32", "play"],
  ])(
    "if platform is \"%s\" should use \"%s\" command to play sound",
    (platform, expectedBin) => {
      play("", platform, "");

      expect(childProcess.spawn.calledWith(expectedBin)).toEqual(true);
    }
  );

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
