const router = require("express").Router();
const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/", userRouter); //если пришел любой запрос на users, тогда преедай управление userRouter
router.use("/", cardRouter);
router.use("/*", (req, res) => {
  res
    .status(404)
    .send({
      message:
        "Cервер не может найти запрашиваемый ресурс. Исправим в следующем спринте",
    });
});

module.exports = router;
