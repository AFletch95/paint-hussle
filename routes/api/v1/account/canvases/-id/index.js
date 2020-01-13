const { Router } = require("express");
const router = Router();

const { getUser } = require("../../../../../../middleware/orm");

router.get("/", getUser({ select: "_id" }), async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.canvas;
  const canvas = await db.Canvas.findById(id).where({ owner: req.user._id });
  if (!canvas) {
    res.status(404).json({});
  } else {
    res.status(200).json({
      canvas
    });
  }
});

router.put("/", getUser({ select: "_id" }), async (req, res) => {
  const db = req.app.get("db");
  const { id } = req.canvas;
  const canvas = await db.Canvas.findById(id).where({ owner: req.user._id });
  if (!canvas) {
    return res.status(404).json({});
  }
  const { visibilty, image, title, description } = req.body;
  if (visibility) canvas.visibility = visibility;
  if (image) canvas.image = image;
  if (title) canvas.title = title;
  if (description) canvas.description = description;
  const result = await canvas.save();

  res.status(200).json({
    canvas: result
  });
});

module.exports = router;
