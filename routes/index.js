const router = require("express").Router();
const db = require("../utils/db");

router.post("/stream/:username", async (req, res, next) => {
  const { username } = req.params;
  let user;

  try {
    user = await db.findByUsername(username);
  } catch (err) {
    console.log("error getting user", err);
    return res.status(500).json({ error: "Unable to get user from database" });
  }

  if (!user) {
    try {
      const record = await db.createUser(username);
      return res.status(201).json(record);
    } catch (err) {
      console.log("error creating user", err);
      return res.status(500).json({ error: "Unable to create user" });
    }
  }

  try {
    const record = await db.incrementStreamCount(username);
    return res.status(200).json(record);
  } catch (err) {
    console.log("error incrementing stream count", err);
    if (err.customError) {
      return res.status(400).json({ error: err.customError });
    }
    return res.status(500).json({ error: "Unable to increment stream count" });
  }
});

router.get("/stream/:username", async (req, res, next) => {
  const { username } = req.params;
  let user;

  try {
    user = await db.findByUsername(username);
  } catch (err) {
    console.log("error getting user", err);
    return res.status(500).json({ error: "Unable to get user from database" });
  }

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(user);
});

router.delete("/stream/:username", async (req, res, next) => {
  const { username } = req.params;
  let user;

  try {
    user = await db.findByUsername(username);
  } catch (err) {
    console.log("error getting user", err);
    return res.status(500).json({ error: "Unable to get user from database" });
  }

  if (!user) {
    return res.sendStatus(404);
  }

  try {
    const record = await db.decrementStreamCount(username);
    return res.status(200).json(record);
  } catch (err) {
    console.log("error decrementing stream count", err);
    if (err.customError) {
      return res.status(400).json({ error: err.customError });
    }
    return res.status(500).json({ error: "Unable to decrement stream count" });
  }
});

module.exports = router;
