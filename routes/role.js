const express = require("express");

const roleControllers = require("../controllers/role");

const router = express.Router();
router.post("/create", roleControllers.createNewRole);
router.post("/update", roleControllers.updateRole);
router.get("/show", roleControllers.showRoles);
router.get("/delete/:id", roleControllers.deleteRole);

module.exports = router;
