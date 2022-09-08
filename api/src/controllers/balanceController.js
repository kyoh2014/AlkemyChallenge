const { Op } = require("sequelize");
const { Operation, Category, sequelize } = require("../models/index");
const { OPERATIONS_IN_RESUME } = require("../configs/index");

const balanceController = async (req, res) => {
  Operation.findAll({
    where: {
      deletedAt: null,
      idUser: req.user.id,
    },
    attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]],
  }).then((totalAmount) => {
    if (totalAmount.total === null) {
      res.json({ data: 0 });
    } else {
        res.json({ data: totalAmount });
    }
});
};

const resumeController = async (req, res) => {
  Operation.findAll({
    where: {
      
      deletedAt: null,
      idUser: req.user.id,
    },
    include: {
      model: Category,
      attributes: ["name"],
    },
    attributes: ["id", "concept", "amount", "date", "type"],

    order: [["date", "DESC"]],
    limit: OPERATIONS_IN_RESUME,
  }).then((amount) => {
    res.json({ data: amount });
  });
};

const allResumeController = async (req, res) => {

  let type = req.query.type

    if(!(type.toLowerCase() === "income" || type.toLowerCase() === "egress" || type === undefined)){
        return res.status(400).json({msg: `The type filter is invalid`})
    } else if(type === undefined){
        type = ""
    }

  Operation.findAll({
    where: {
      type:{
        [Op.like]: `%${type}%`
    },
      deletedAt: null,
      idUser: req.user.id,
    },
    include: {
      model: Category,
      attributes: ["name"],
    },
    attributes: ["id", "concept", "amount", "date", "type"],

    order: [["date", "DESC"]],

  }).then((allamount) => {
    res.json({ data: allamount });
  });
};

module.exports = { balanceController, resumeController, allResumeController };
