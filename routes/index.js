const { Router } = require("express");
const router = Router();

router.use("/api/v1", require("./api/v1"));

router.use("*", require("./404"));

module.exports = router;
