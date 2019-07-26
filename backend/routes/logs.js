const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Log = require('../models/Log');

// @route     GET api/logs
// @desc      Get all logs
// @access    Public
router.get('/', async (req, res) => {
  try {
    const logs = await Log.find({}).sort({
      date: -1
    });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:text', async (req, res) => {
  try {
    const textParam = req.params.text;
    const logs = await Log.find({message:{'$regex' : `^${textParam}` , '$options' : 'i'}})
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/',[
      check('message', 'Message is required')
        .not()
        .isEmpty(),
        check('tech', 'Tech is required')
        .not()
        .isEmpty()
    ] ,async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { message, tech, attention, date } = req.body;

  try {
    const newLog = new Log({
      message,
      tech,
      attention,
      date
    });

    const log = await newLog.save();

    res.json(log);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/contacts/:id
// @desc      Update log
// @access    Public
router.put('/:id', async (req, res) => {
  const { message, tech, attention, date } = req.body;

  // Build log object
  const logFields = {};

  if (message) logFields.message = message;
  if (tech) logFields.tech = tech;
  console.log(tech)
  if (attention) logFields.attention = attention;
  if (date) logFields.date = date;
  try {
    let log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ msg: 'Contact not found' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true },
    );

    res.json(log);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/logs/:id
// @desc      Delete contact
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
