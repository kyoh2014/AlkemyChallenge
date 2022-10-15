const { Op } = require("sequelize");
const { Operation, Category, sequelize } = require("../models/index");
const { OPERATIONS_IN_RESUME } = require("../configs/index");

// User balance controller
const balanceController = async (req, res) => {

  // Obtaining all operations through the user id
  Operation.findAll({
    where: {
      deletedAt: null,
      idUser: req.user.id,
    },
    attributes: [[sequelize.fn("sum", sequelize.col("amount")), "total"]], // Sum of amounts of all user transactions
  })
  .then((totalAmount) => {
    // If there are no values, it returns "balance: 0", otherwise it shows the total balance
    if (totalAmount[0].dataValues.total === null) {
      res.json({ data: [{total: 0 }] });
    } else {
      res.json({ data: totalAmount });
    }
  })
  .catch(err => {
    res.status(500).json({
    msg: "An error occurred with the user's balance"    
    })
  });
};

// Log of the last 10 user transactions
const resumeController = async (req, res) => {

  // Obtaining all operations through the user id
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
    // Assignment of the order and limit of transactions
    order: [["date", "DESC"]],
    limit: OPERATIONS_IN_RESUME,
  })
  // Return exposed transactions
  .then((amount) => {
    res.json({ data: amount });
  })
  .catch(err => {
    res.status(500).json({
    msg: "An error occurred with the summary of user operations"    
    })
  });
};

// Log of all user transactions (with filter)
const allResumeController = async (req, res) => {

  // Filter preparation for type/category
  let type = req.query.type
  let idCategory = req.query.idCategory

  // Type filter validation
  if(type === undefined){
    type = ""
  } else if(!(type.toLowerCase() === "income" || type.toLowerCase() === "egress")){
    return res.status(400).json({msg: `The type filter is invalid`})
  } 

  // Category filter validation
  if(idCategory === undefined){
    idCategory = {
      [Op.notLike]: 0
    }
  } else {
    try {
      idCategory = Number.parseInt(idCategory)
    } catch(error) {
      return res.status(400).json({msg: `The category filter is invalid`})
    }
  }

  // Obtaining all operations through the type/category
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
    
    // ordenamiento de forma descendente
    order: [["date", "DESC"]],

  })
  // Returns the operations according to the type/category filter
  .then((allamount) => {
    res.json({ data: allamount });
  })
  .catch(err => {
    res.status(500).json({
    msg: "An error occurred with the user filter"    
    })
  });
};

module.exports = { balanceController, resumeController, allResumeController };
