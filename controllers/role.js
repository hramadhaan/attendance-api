const isEmpty = require("lodash/isEmpty");
const Role = require("../models/role");
const Auth = require("../models/auth");
const { errorHandler } = require("../utils/error-handler");

exports.createNewRole = async (req, res, next) => {
  errorHandler(req);

  const { name } = req.body;
  try {
    const role = new Role({
      name,
    });
    const responseRole = await role.save();
    res.status(201).json({
      success: true,
      message: "Role saved successfully",
      data: responseRole,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.showRoles = async (req, res, next) => {
  errorHandler(req);

  try {
    const response = await Role.find();
    if (!isEmpty(response)) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Role found",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateRole = async (req, res, next) => {
  errorHandler(req);
  try {
    const { id, name } = req.body;
    const role = await Role.findById(id);
    if (isEmpty(role)) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }
    role.name = name;
    const responseRole = await role.save();
    res.status(201).json({
      success: true,
      message: "Role updated successfully",
      data: responseRole,
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteRole = async (req, res, next) => {
  errorHandler(req);
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    const auth = await Auth.find({ role: id });
    if (isEmpty(role)) {
      return res.status(404).json({
        success: false,
        message: "Role not found",
      });
    }
    if (!isEmpty(auth)) {
      return res.status(400).json({
        success: false,
        message: "Role is in use",
      });
    }
    await Role.findByIdAndDelete(role.id);
    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (err) {
    if (!res.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
