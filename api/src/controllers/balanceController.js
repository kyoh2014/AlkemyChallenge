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
  let idCategory = req.query.idCategory

  if(type === undefined){
        type = ""
    } else if(!(type.toLowerCase() === "income" || type.toLowerCase() === "egress")){
        return res.status(400).json({msg: `The type filter is invalid`})
    } 

    if(idCategory === undefined){
      idCategory = {
        [Op.notLike]: 0
      }
  } else {
    try {
      idCategory = Number.parseInt(idCategory)
    } catch (error) {
      return res.status(400).json({msg: `The category filter is invalid`})
    }
  }

  Operation.findAll({
    where: {
      type:{
        [Op.like]: `%${type}%`
    },
      idCategory,
  
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
