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

  cleanCategories (categories) {
    let data = Object.keys(categories).map(key => {
      const category = categories[key]
      return {id: key, ...category}
    })
    return data
  }

  watchCategories (callback) {
    const ref = this.db.ref('/categories')
    ref.on('value', snapshot => {
      const categories = this.cleanCategories(snapshot.val())
      callback(categories)
    })
    return () => ref.off('value')
  }

  getCategories () {
    return this.db.ref('/categories').once('value').then(snapshot => {
      return this.cleanCategories(snapshot.val())
    })
  }

  getCategory (categoryId) {
    return this.db.ref(`/categories/${toKey(categoryId)}`).once('value').then(snapshot => {
      const category = snapshot.val()
      return {id: categoryId, ...category}
    })
  }

  cleanLibraries (libraries) {
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
  }

  watchLibraries (categoryId, callback) {
    const ref = this.db.ref('/libraries')
    ref.orderByChild('categoryId')
      .equalTo(categoryId)
      .on('value', snapshot => {
        const libraries = this.cleanLibraries(snapshot.val())
        callback(libraries)
      })
    return () => ref.off('value')
  }

  getLibraries (categoryId) {
    return this.db.ref('/libraries')
      .orderByChild('categoryId')
      .equalTo(categoryId)
      .once('value')
      .then(snapshot => {
        return this.cleanLibraries(snapshot.val())
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
