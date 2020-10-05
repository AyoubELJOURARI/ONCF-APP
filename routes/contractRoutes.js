const express = require("express");
const contractContoller = require("../controllers/contarctsContoller");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/top-5-cheap")
  .get(contractContoller.aliasTopContracts, contractContoller.getAllcontracts);

router
  .route("/")
  .get(authController.protect, contractContoller.getAllcontracts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    contractContoller.createcontract
  );
router
  .route("/:id")
  .get(authController.protect, contractContoller.getcontract)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    contractContoller.updatecontract
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    contractContoller.deletecontract
  );

module.exports = router;
