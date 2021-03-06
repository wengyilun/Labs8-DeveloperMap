const functions = require('firebase-functions');
const firebase = require('./firebase.js');
const rootRef = firebase.database().ref();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//exports.labs8 = functions.https.onRequest(server);
exports.deleteUserAuth = functions.auth.user().onDelete(user => {
  const { uid } = user;
  console.log(user);

  rootRef
    .once('value')
    .then(snapshotRoot => {
      let updateObject = {};
      updateObject[`seekers/${uid}`] = null;
      updateObject[`favoritePostings/${uid}`] = null;
      updateObject[`companies/${uid}`] = null;
      updateObject[`companyPostings/${uid}`] = null;
      updateObject[`favoriteLookup/${uid}`] = null;
      updateObject[`markers/${uid}`] = null;
      snapshotRoot.child('favoriteLookup').forEach(childSnap => {
        if (childSnap.child(uid).exists()) {
          updateObject[`favoriteLookup/${childSnap.key}/${uid}`] = null;
        }
      });
      console.log('updateObject:', updateObject);
      return rootRef.update(updateObject);
    })
    .catch(err => console.log(err));
});

exports.deleteUserDbSeeker = functions.database
  .ref('/seekers/{uid}')
  .onDelete((snapshot, context) => {
    const uid = snapshot.key;
    rootRef
      .once('value')
      .then(snapshot => {
        let updateObject = {};
        updateObject[`seekers/${uid}`] = null;
        updateObject[`favoritePostings/${uid}`] = null;
        updateObject[`companies/${uid}`] = null;
        updateObject[`companyPostings/${uid}`] = null;
        updateObject[`favoriteLookup/${uid}`] = null;
        updateObject[`markers/${uid}`] = null;
        snapshot.child('favoriteLookup').forEach(childSnap => {
          if (childSnap.child(uid).exists()) {
            updateObject[`favoriteLookup/${childSnap.key}/${uid}`] = null;
          }
        });
        console.log('updateObject:', updateObject);
        return rootRef.update(updateObject);
      })
      .catch(err => console.log(err));
  });

exports.deleteUserDbCompany = functions.database
  .ref('/companies/{uid}')
  .onDelete((snapshot, context) => {
    const uid = snapshot.key;
    console.log(uid);
    rootRef
      .once('value')
      .then(snapshot => {
        let updateObject = {};
        updateObject[`seekers/${uid}`] = null;
        updateObject[`favoritePostings/${uid}`] = null;
        updateObject[`companies/${uid}`] = null;
        updateObject[`companyPostings/${uid}`] = null;
        updateObject[`favoriteLookup/${uid}`] = null;
        updateObject[`markers/${uid}`] = null;
        snapshot.child('favoriteLookup').forEach(childSnap => {
          if (childSnap.child(uid).exists()) {
            updateObject[`favoriteLookup/${childSnap.key}/${uid}`] = null;
          }
        });
        console.log('updateObject:', updateObject);
        return rootRef.update(updateObject);
      })
      .catch(err => console.log(err));
  });

exports.logMarkerWrite = functions.database
  .ref('markers/{uid}')
  .onWrite((snapshot, context) => {
    console.log('Before:', snapshot.before.val());
    console.log('After:', snapshot.after.val());
  });
