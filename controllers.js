//import BankModel
const BankModel = require("./model.js");
// const accountModel = require("./accountModel.js");

//controllers
const listBanksController = (req, res) => {
  // list all banks
  const { id } = req.params;

  if (id) {
    BankModel.find({ _id: id })
      .then((banks) => {
        res.json({ data: banks });
      })
      .catch((err) => console.log(err));
  } else {
    BankModel.find()
      .then((banks) => {
        res.json({ data: banks });
      })
      .catch((err) => console.log(err));
  }
};

const createBankController = (req, res) => {
  // create a bank
  const { name, location, branch, phone, address, accountNumber } = req.body;
  const bank = new BankModel({
    name,
    location,
    branch,
    phone,
    address,
    accountNumber,
  });

  bank
    .save()
    .then((result) => {
      res.json({ message: "create successful", data: result });
    })
    .catch((error) => console.log(error));
};

const updateBankController = (req, res) => {
  // update bank
  const { id, name, location, branch, phone, address, accountNumber } =
    req.body;
  BankModel.findById(id)
    .then((bank) => {
      if (bank) {
        bank.name = name;
        bank.location = location;
        bank.branch = branch;
        bank.phone = phone;
        bank.address = address;
        bank.accountNumber = accountNumber;

        bank.save();
        res.json({ message: "update successful", data: bank });
      }
      res.json({ message: "Document can't be found" });
    })
    .catch((err) => console.log(err));
};

const deleteBankController = (req, res) => {
  // delete bank
  const { id } = req.body;
  BankModel.findByIdAndRemove(id).then((deletedBank) => {
    if (deletedBank) {
      res.json({ message: "bank deleted successfully!" });
      return;
    }
    res.json({ message: "Couldn't this delete bank from the DB!" });
  });
};
// const createAccountController = (req, res) => {
//   const { name, number, accountType, bankId } = req.body;
//   const account = new accountModel({ name, number, accountType, bankId });
//   account.save().then((result) => {
//     if (result) res.json({ message: "Account created", data: result });
//     else
//       res.json({
//         message: "Failed to create Account!",
//       });
//   });
// }

module.exports = {
  listBanksController,
  createBankController,
  updateBankController,
  deleteBankController,
  //   createAccountController,
};
