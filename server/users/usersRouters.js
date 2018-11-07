const express = require('express');
const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();
const router = express.Router();

//const updateData

router.get('/', (req, res) => {
  rootRef
    .child('users')
    .once('value')
    .then(snapshot => {
      res.json(snapshot);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/:uid', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child('users/' + uid)
    .once('value')
    .then(snapshot => {
      res.json(snapshot);
    });
});

//Change UserInfo Status

router.put('/userInfo/:name/:uid', (req, res) => {
  const { uid, name } = req.params;
  console.log(name);
  if (name === 'location' || name === 'employer' || name === 'email') {
    const newDate = req.body;
    const updateObject = {
      [`users/${uid}/${name}`]: newDate[name],
    };
    rootRef
      .update(updateObject)
      .then(() => {
        res.json(`${name} status updated`);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    res.json({ err: 'Must send location, email, employer' });
  }
});

//add Links

router.put('/links/:uid', (req, res) => {
  const { uid } = req.params;
  const links = req.body;
  const linkKeys = Object.keys(req.body);
  let updateObject = {};
  linkKeys.forEach(linkKey => {
    updateObject[`users/${uid}/${linkKey}`] = links[linkKey];
  });

  rootRef
    .update(updateObject)
    .then(() => {
      res.json('links added status updated');
    })
    .catch(err => {
      res.json(err);
    });
});

//Delete Users
router.delete('/:uid', (req, res) => {
  const { uid } = req.params;
  rootRef
    .child('users/' + uid)
    .remove()
    .then(() => {
      res.json('user deleted');
    });
});

router.get('/', (req, res) => {});

module.exports = router;