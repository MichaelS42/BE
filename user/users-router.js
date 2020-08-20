const router = require('express').Router()
const jwt = require('jsonwebtoken');
const Users = require('./users-model.js');
const { restricted } = require('../auth/authenticate-middleware');

router.post('/sleeptracker', restricted, (req, res) => {
  cosole.log(req.body);
  Users.addSleepEntry(req.body)
  .then(sleepentry => {
    res.status(200).json(sleepentry);
  })
  .catch(err => {
    console.log(err)
    err.status(500).json({message: "API Error", error: err.message});
  });
});

router.get('/:id/sleeptracker', restricted, (req, res) => {
  Users.findSleepListById(req.params.id)
  .then(sleeplist => {
    res.status(200).json(sleeplist);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ message: "API Error", error: err.message})
  });
});

router.put('/sleeptracker/:id', restricted, (req, res) => {
  const changes = req.body;

  Users.updateSleepEntry(req.params.id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The entry could not be updated'});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "API Erorr", error: err.message })
  })
})

router.delete('/sleeptracker/:id', restricted, (req,res) => {
  Users.removeSleepEntry(req.params.id)
  .then(count =>{
    if (count > 0) {
      res.status(200).json({message: 'The entry has been removed'});
    } else {
      res.status(404).json({message: 'The entry could not be removed'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "API Error", error: err.message})
  })
})

module.exports = router
