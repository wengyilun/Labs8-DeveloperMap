const firebase = require('../firebase/firebase.js');
const rootRef = firebase.database().ref();

const createMarkerObject = async (req, res, next) => {
  const { location, uid } = req.body;
  let { firstName } = req.body;
  if (!firstName) {
    firstName = await rootRef.child(`seekers/${uid}/firstName`).once('value');
  }
  if (!firstName) {
    firstName = await rootRef.child(`companies/${uid}/firstName`).once('value');
  }
  if (location) {
    const markerData = {
      geometry: {
        // Convert Coordinates to Numbers
        coordinates: location.coordinates.map(coord => Number(coord)),
        type: 'Point',
      },
      properties: {
        title: firstName,
        uid,
      },
    };
    req.body.markerData = markerData;
    next();
  }
  next();
};

module.exports = { createMarkerObject };
