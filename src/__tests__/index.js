const sinon = require("sinon");
const childProcess = require("child_process");
const run = require("../index");
const play = require("../play");

const { FILE_WAH, FILE_SUCCESS } = require("../constants");

const originalArgv = process.argv;
const originalOn = process.on;

describe("index", () => {
  beforeEach(() => {
    const procOnSpy = sinon.spy();
    const procChildSpy = sinon.spy();

    sinon.stub(childProcess, "spawn");
    sinon.stub(play, "play");

    play.play.returns({
      kill: jest.fn(),
    });

    process.argv = ["", "", "npm", "run test"];
    process.on = procOnSpy;

    childProcess.spawn.returns({
      on: procChildSpy,
    });
  });

  afterEach(() => {
    childProcess.spawn.restore();
    play.play.restore();

    process.argv = originalArgv;
    process.on = originalOn;
  });

  it("should run command if one was specified", () => {
    run();

    expect(childProcess.spawn.calledOnce).toEqual(true);
  });

  test.each([
    [0, FILE_SUCCESS],
    [1, FILE_WAH],
  ])("on code %s should play %s sound on ", (code, location) => {
    childProcess.spawn.returns({
      on: (e, cb) => cb(code),
    });

    run();

    expect(play.play.lastCall.calledWith(location)).toEqual(true);
  });

  it("should stop drumroll after the command has finished", async () => {
    childProcess.spawn.returns({
      on: (e, cb) => cb(),
    });

    const playSpy = sinon.spy();
    play.play.returns({ kill: playSpy });

    run();

    expect(playSpy.callCount).toEqual(1);
  });

  it("should run command if one was specified", () => {
    run();

    expect(childProcess.spawn.calledOnce).toEqual(true);
  });

  it("should run command if one was specified", () => {
    run();

    expect(childProcess.spawn.calledOnce).toEqual(true);
  });
});
