const sinon = require("sinon");
const childProcess = require("child_process");

const { hasCommand, getSoundLocation, memoize } = require("../utils");

describe("utils", () => {
  beforeEach(() => {
    sinon.stub(childProcess, "execSync");
  });

  afterEach(() => {
    childProcess.execSync.restore();
  });

  describe("hasCommand", () => {
    it("should return true if command succeeds", () => {
      expect(hasCommand()).toEqual(true);
    });

    it("should return false if command fails", () => {
      childProcess.execSync.throws();

      expect(hasCommand()).toEqual(false);
    });
  });

  describe("getSoundLocation", () => {
    it("should return path to specified file", () => {
      const filename = "file.mp3";
      const result = getSoundLocation(filename);

      expect(result.endsWith(filename)).toEqual(true);
    });
  });

  describe("memoize", () => {
    it("should memoize values returned by passed function", () => {
      const spy = sinon.fake.returns("Hi!");
      const spyMemo = memoize(spy);

      spyMemo(1);
      spyMemo(2);
      spyMemo(1);

      expect(spy.callCount).toEqual(2);
    });

    it("should memoize undefined returned by passed function", () => {
      const spy = sinon.fake.returns(undefined);
      const spyMemo = memoize(spy);

      spyMemo(1);
      spyMemo(2);
      spyMemo(1);

      expect(spy.callCount).toEqual(2);
    });
  });
});