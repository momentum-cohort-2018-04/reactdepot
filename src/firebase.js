import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

var config = {
  apiKey: 'AIzaSyCPhzeUAkN-dYx-qSyWPOiyqdyy4Kg8SbE',
  authDomain: 'react-depot-momentum.firebaseapp.com',
  databaseURL: 'https://react-depot-momentum.firebaseio.com',
  projectId: 'react-depot-momentum',
  storageBucket: 'react-depot-momentum.appspot.com',
  messagingSenderId: '593164394604'
}

firebase.initializeApp(config)

export default firebase
