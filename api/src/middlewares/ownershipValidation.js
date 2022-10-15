const { Operation, User } = require("../models/index");

// Users and Operations Models
const models = {
  operations: [Operation, "idUser"],
  users: [User, "id"],
};

// Validating user account ownership to limit access
const ownershipValidation = async (req, res, next) => {
  try {
    // Get url and models of the property
    const url = req.originalUrl.split("/");
    const model = models[url[2]];

    // obtaining data through the user id
    const data = await model[0].findByPk(req.params.id);

    // Verificando permisos de modificacion del usuario
    if (req.user.id === data[model[1]]) {
      return next();
    } else {
      return res.status(403).json({
        msg: "you do not have permission to modify this",
      });
    }
  } catch (e) {
    return res.status(500).json({
      msg: "Internal Error",
    });
  }
};

module.exports = { ownershipValidation };
