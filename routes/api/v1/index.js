const { Router } = require("express");
const router = Router();

const { verifyToken } = require("../../../middleware/auth");
const { getUser } = require("../../../middleware/orm");

function parseParams(name) {
  return (req, res, next) => {
    req[name] = { id: req.params.id };
    next();
  };
}

router.use("/account/login", require("./account/login"));
router.use("/account/auctions", verifyToken, require("./account/auctions"));
router.use("/account/bids", verifyToken, require("./account/bids"));
router.use(
  "/account/canvases/:id",
  verifyToken,
  parseParams("canvas"),
  require("./account/canvases/-id")
);
router.use("/account/canvases", verifyToken, require("./account/canvases"));
router.use("/account/logout", verifyToken, require("./account/logout"));
router.use(
  "/account",
  verifyToken,
  getUser({ select: "+name +email +phone" }),
  require("./account")
);

router.use(
  "/auctions/:id/buyout",
  parseParams("auction"),
  verifyToken,
  getUser({ select: "_id" }),
  require("./auctions/-id/buyout")
);
router.use("/auctions/:id", parseParams("auction"), require("./auctions/-id"));
router.use("/auctions", require("./auctions"));

router.use("/canvases/:id", parseParams("canvas"), require("./canvases/-id"));
router.use("/canvases", require("./canvases"));

router.use(
  "/users/:id/auctions",
  parseParams("user"),
  require("./users/-id/auctions")
);
router.use("/users/:id/bids", parseParams("user"), require("./users/-id/bids"));
router.use(
  "/users/:id/canvases",
  parseParams("user"),
  require("./users/-id/canvases")
);
router.use("/users/:id", parseParams("user"), require("./users/-id"));
router.use("/users", require("./users"));

module.exports = router;
