const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const data = require('./data')

exports.libraryData = functions.https.onRequest((req, res) => {
  const libraryId = req.query['id']
  if (!libraryId) {
    res.status(400).send('must contain id param')
  }
  admin.database().ref(`/libraries/${libraryId}`).once('value').then(snap =>
    res.send({ [libraryId]: snap.val() })
  )
})

exports.retrieveLibraryData = data.retrieveLibraryData
exports.updateLibrary = data.updateLibrary
