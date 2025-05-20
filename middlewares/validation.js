const { body, validationResult } = require('express-validator');

const contactValidationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    body('birthday').isDate().withMessage('Valid birthday date is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => {
            const field = err.param || err.path || 'unknown_field';
            return { [field]: err.msg };
        });
        return res.status(422).json({ errors: extractedErrors });
    }
    next();
};

module.exports = { contactValidationRules, validate };