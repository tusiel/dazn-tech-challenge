const User = require("../models/User");

const findByUsername = username => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

const createUser = username => {
  return new Promise((resolve, reject) => {
    const user = new User({ username, streamCount: 1 });
    user.save((err, user) => {
      if (err) {
        return reject(err);
      }
      resolve(user);
    });
  });
};

const incrementStreamCount = async username => {
  const dbUser = await findByUsername(username);

  return new Promise((resolve, reject) => {
    if (dbUser.streamCount >= 3) {
      return reject({ customError: "Stream count exhausted" });
    }

    User.findOneAndUpdate(
      { username },
      { $set: { streamCount: dbUser.streamCount + 1 } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          return reject(err);
        }
        resolve(updatedUser);
      }
    );
  });
};

const decrementStreamCount = async username => {
  const dbUser = await findByUsername(username);

  return new Promise((resolve, reject) => {
    if (dbUser.streamCount < 1) {
      return reject({ customError: "Stream count is at 0" });
    }

    User.findOneAndUpdate(
      { username },
      { $set: { streamCount: dbUser.streamCount - 1 } },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          return reject(err);
        }
        resolve(updatedUser);
      }
    );
  });
};

module.exports = {
  createUser,
  findByUsername,
  incrementStreamCount,
  decrementStreamCount
};
