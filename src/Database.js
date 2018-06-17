import firebase from './firebase'

class Database {
  constructor () {
    this.db = firebase.database()
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
    return this.db.ref(`/categories/${categoryId}`).once('value').then(snapshot => {
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
        data.sort((a, b) => -(a.score.final - b.score.final))
        return data
      })
  }

  getLibrary (libraryName) {
    return this.db.ref(`/libraries/${libraryName}`).once('value').then(snapshot => {
      return snapshot.val()
    })
  }

  editLibrary (libraryData) {
    return this.db.ref(`/libraries/${libraryData.name}`)
      .set(libraryData)
      .then(response => {
        return response
      })
  }
}

export default Database
