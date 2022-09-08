const { Operation } = require("../models/index");

const models = {
  operations: Operation,
};

const ownershipValidation = async (req, res, next) => {
  const url = req.originalUrl.split("/");
  const model = models[url[2]];
  

  const data = await model.findByPk(req.params.id);

  if (req.user.id === data.idUser) {
    return next();
  } else {
    return res.status(403).json({
      msg: "you do not have permission to modify this",
    });
  }
};

module.exports = { ownershipValidation };
