import firebase from './firebase'

export function toKey (id) {
  return id.replace(/[$#[\],./]/, '--')
}

class Database {
  constructor () {
    this.db = firebase.database()
  }

  addCategory (title, slug) {
    return this.db.ref(`/categories/${slug}`).set({
      title: title
    })
  }

  getCategories () {
    return this.db.ref('/categories').once('value').then(snapshot => {
      let categories = snapshot.val()
      let data = Object.keys(categories).map(key => {
        const category = categories[key]
        return {id: key, ...category}
      })
      return data
    })
  }

  getCategory (categoryId) {
    return this.db.ref(`/categories/${toKey(categoryId)}`).once('value').then(snapshot => {
      const category = snapshot.val()
      return {id: categoryId, ...category}
    })
  }

  getLibraries (categoryId) {
    console.log('categoryId', categoryId)
    return this.db.ref('/libraries')
      .orderByChild('categoryId')
      .equalTo(categoryId)
      .once('value')
      .then(snapshot => {
        let libraries = snapshot.val()
        if (!libraries) {
          return []
        }
        let data = Object.keys(libraries).map(key => {
          const library = libraries[key]
          return {id: key, ...library}
        })
        data.sort((a, b) => {
          if (a.score && b.score) {
            return -(a.score.final - b.score.final)
          } else {
            return 0
          }
        })
        return data
      })
  }

  getLibrary (libraryName) {
    return this.db.ref(`/libraries/${toKey(libraryName)}`).once('value').then(snapshot => {
      return snapshot.val()
    })
  }

  editLibrary (libraryData) {
    return this.db.ref(`/libraries/${toKey(libraryData.libraryId)}`)
      .update(libraryData)
      .then(response => {
        return response
      })
  }

  updateLibrary (libraryName) {
    return this.editLibrary({libraryId: libraryName, needsUpdate: true})
  }
}

export default Database
