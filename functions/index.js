const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

const request = require('superagent')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!')
})

function cleanNpmsResponse (data) {
  const { collected, score, analyzedAt } = data
  return {
    analyzedAt: analyzedAt,
    npm: {
      currentVersion: collected.metadata.version,
      description: collected.metadata.description,
      dependentsCount: collected.npm.dependentsCount,
      starsCount: collected.npm.starsCount,
      downloads: {
        oneMonth: collected.npm.downloads[2],
        threeMonths: collected.npm.downloads[3],
        oneYear: collected.npm.downloads[5]
      }
    },
    links: collected.metadata.links,
    license: collected.metadata.license,
    score: score
  }
}

exports.getLibraryData = functions.database.ref('/libraries/{libraryId}/needsUpdate')
  .onWrite((change, context) => {
    const afterSnap = change.after
    const needsUpdate = afterSnap.val()
    if (!needsUpdate) {
      return null
    }

    const libraryId = context.params.libraryId

    return request.get(`https://api.npms.io/v2/package/${libraryId}`)
      .then(res => res.body)
      .then(info => cleanNpmsResponse(info))
      .then(info => {
        console.log(info)
        return afterSnap.ref.parent.child('npms').set(info)
      })
      .then(info => {
        admin.database().ref(`/libraries/${libraryId}/needsUpdate`).set(false)
      })
  })
