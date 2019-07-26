const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Tech = require('../models/Tech');

// @route     GET api/techs
// @desc      Get all techs
// @access    Public
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find({}).sort({
      date: -1
    });
    
    res.json(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/techs
// @desc      Add new tech
// @access    Public
router.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName } = req.body;

  try {
    const newTech = new Tech({
      firstName,
      lastName
    });

    const tech = await newTech.save();

    res.json(tech);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/contacts/:id
// @desc      Update tech
// @access    Public
router.put('/:id', async (req, res) => {
  const { firstName, lastName } = req.body;

  // Build contact object
  const techFields = {};
  if (firstName) techFields.firstName = firstName;
  if (lastName) techFields.lastName = lastName;

  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Contact not found' });

    tech = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: techFields },
      { new: true }
    );

    res.json(tech);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/techs/:id
// @desc      Delete contact
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
