const sinon = require("sinon");
const { assert } = require("chai");
const User = require("../../models/User");

const db = require("../../utils/db");

describe("db tests", () => {
  describe("findByUsername tests", () => {
    let stub;

    afterEach(() => {
      stub.restore();
    });

    it("Should return correct user record", async () => {
      const record = { username: "simon", streamCount: 1 };
      stub = sinon.stub(User, "findOne").callsFake((query, cb) => {
        return cb(null, record);
      });

      const user = await db.findByUsername("simon");

      assert.deepEqual(user, record);
    });

    it("Should handle errors gracefully", async () => {
      stub = sinon.stub(User, "findOne").callsFake((query, cb) => {
        return cb("expectedError", {});
      });

      try {
        await db.findByUsername({});
      } catch (err) {
        assert.equal(err, "expectedError");
      }
    });
  });

  describe("createUser tests", () => {
    let stub;

    afterEach(() => {
      stub.restore();
    });

    it("Should return the saved user", async () => {
      const record = { username: "simon", streamCount: 1 };
      stub = sinon.stub(User.prototype, "save").callsFake(cb => {
        return cb(null, record);
      });

      const user = await db.createUser("simon");

      assert.deepEqual(user, record);
    });
  });

  describe("StreamCount update tests", () => {
    let findStub;
    let updateStub;

    afterEach(() => {
      findStub.restore();
      updateStub.restore();
    });

    describe("incrementStreamCount tests", () => {
      it("Should return the correct stream count", async () => {
        const record = { username: "simon", streamCount: 1 };
        findStub = sinon.stub(User, "findOne").callsFake((query, cb) => {
          return cb(null, record);
        });

        updateStub = sinon
          .stub(User, "findOneAndUpdate")
          .callsFake((opt1, opt2, opt3, cb) => {
            cb(null, {});
          });

        await db.incrementStreamCount("simon");

        assert.equal(updateStub.args[0][1]["$set"].streamCount, 2);
      });
    });

    describe("decrementStreamCount tests", () => {
      it("Should return the correct stream count", async () => {
        const record = { username: "simon", streamCount: 3 };
        findStub = sinon.stub(User, "findOne").callsFake((query, cb) => {
          return cb(null, record);
        });

        updateStub = sinon
          .stub(User, "findOneAndUpdate")
          .callsFake((opt1, opt2, opt3, cb) => {
            cb(null, {});
          });

        await db.decrementStreamCount("simon");

        assert.equal(updateStub.args[0][1]["$set"].streamCount, 2);
      });
    });
  });
});
