const { body, validationResult } = require("express-validator");

// Validation rules
const registerUserValidation = [
  body("username")
    .isString().withMessage("Username must be a string")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),

  body("email")
    .isEmail().withMessage("Invalid email address"),

  body("fullName.firstName")
    .notEmpty().withMessage("First name is required"),

  body("fullName.lastName")
    .optional()
    .isString().withMessage("Last name must be a string"),

  body("role")
    .optional()
    .isIn(["user", "plue"]).withMessage("Role must be either 'user' or 'plue'"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    validation
];

const loginUser = [
  body("email")
  .isEmail().withMessage("Invalid email address"),


  body("password")
  .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),


  validation

]


const validateChat = [
  body("user")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID"),

  body("title")
    .optional()
    .isString().withMessage("Title must be a string")
    .isLength({ max: 50 }).withMessage("Title cannot exceed 50 characters"),

 validation

]

// Middleware to handle validation results
function validation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
}

module.exports =  {
  
  registerUserValidation,
  loginUser,
  validateChat

};
