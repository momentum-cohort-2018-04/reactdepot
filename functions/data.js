const functions = require('firebase-functions')
const request = require('superagent')

function cleanNpmsResponse (data) {
  const { collected, score, analyzedAt } = data
  return {
    libraryId: collected.metadata.name,
    npmsAnalyzedAt: analyzedAt,
    npmsLoadedAt: new Date(),
    needsUpdate: false,

    version: collected.metadata.version,
    description: collected.metadata.description,
    links: collected.metadata.links,
    github: collected.github,
    license: collected.metadata.license,
    score: score,

    npm: {
      dependentsCount: collected.npm.dependentsCount,
      starsCount: collected.npm.starsCount,
      downloads: {
        oneMonth: collected.npm.downloads[2],
        threeMonths: collected.npm.downloads[3],
        oneYear: collected.npm.downloads[5]
      }
    }
  }
}

function cleanRegistryResponse (info) {
  const version = info['dist-tags'].latest
  return {
    libraryId: info.name,
    needsUpdate: false,
    description: info.description,
    version: version,
    license: info.license,
    links: {
      npm: `https://www.npmjs.com/package/${info.name}`,
      homepage: info.homepage
    }
  }
}

function getInfoFromRegistry (libraryId) {
  return request.get(`http://registry.npmjs.org/${libraryId}`)
    .then(res => res.body)
    .then(info => cleanRegistryResponse(info))
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
        return afterSnap.ref.parent.update(info)
      })
      .catch(() => {
        return getInfoFromRegistry(libraryId).then(info => {
          return afterSnap.ref.parent.update(info)
        })
      })
  })
