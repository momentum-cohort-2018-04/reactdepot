import request from 'superagent'

class Database {
  getCategoriesAndLibraries () {
    return request
      .get('http://localhost:4000/categories?_embed=libraries')
      .then(req => req.body)
  }

  getCategory (categoryId) {
    return request
      .get(`http://localhost:4000/categories/${categoryId}?_embed=libraries`)
      .then(req => req.body)
  }
}

export default Database
