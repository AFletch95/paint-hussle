const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../../../../middleware/auth");
const { getUser } = require("../../../../middleware/orm");

router.get("/", async (req, res) => {
  const db = req.app.get("db");

  const canvases = db.Canvas.find({ visibility: "public" });

  res.status(200).json({
    canvases
  });
});

router.post("/", verifyToken, getUser({ select: "_id" }), async (req, res) => {
  const db = req.app.get("db");
  const { image, title, description } = req.body;
  const canvas = new db.Canvas({
    owner: req.user,
    visibility: "public",
    image,
    title,
    description
  });
  const result = await canvas.save();

  res.status(200).json({
    canvas: result
  });
});

module.exports = router;
