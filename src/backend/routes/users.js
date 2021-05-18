const router = require('express').Router();
var User = require('../models/user.model');
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

// Get users
router.route('/').get(authMiddleware, (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(() => res.status(400).json('Error getting users.'));
});

// Add a user
router.route('/add').post([authMiddleware,adminMiddleware], (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const isAdmin = req.body.isAdmin;
  const password = req.body.password;

  let newUser = new User({fullname, email, password, isAdmin});
  newUser.save()
    .then(() => res.json('User added'))
    .catch(() => res.status(400).json('Error adding users.'));
});

// Get a user
router.route('/:id').get(authMiddleware, (req, res) => {
  User.findById(req.params.id).select('-password')
    .then(user => {
      res.status(200).json(user)
    })
    .catch(() => res.status(400).json('Error getting user.'));
});

// Delete a user
router.route('/delete/:id').delete([authMiddleware,adminMiddleware], (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(() => res.status(400).json('Error deleting user.'));
});

// Update a user
router.route('/update/:id').post([authMiddleware,adminMiddleware], (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.fullname = req.body.fullname;
      user.email = req.body.email;
      user.password = req.body.password;
      user.isAdmin = req.body.isAdmin;

      user.save()
        .then(() => res.json('User updated'))
        .catch(() => res.status(400).json('Error updating user.'));
    })
    .catch(() => res.status(400).json('Error updating user.'));
});

module.exports = router;