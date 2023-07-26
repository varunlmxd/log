"use strict";

var _firebaseApp = require("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
var _firebaseDatabase = require("https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js");
var _App = _interopRequireDefault(require("./App.js"));
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyDKfcDho-V6z4TO9qTZZ8XfN5jk4zAiqvI",
  authDomain: "dengey-77444.firebaseapp.com",
  projectId: "dengey-77444",
  storageBucket: "dengey-77444.appspot.com",
  messagingSenderId: "920336204167",
  appId: "1:920336204167:web:7538703652910832969322"
};
const app = (0, _firebaseApp.initializeApp)(firebaseConfig);
const db = (0, _firebaseDatabase.getDatabase)(app);
let username = document.getElementById("Username");
let password = document.getElementById("Password");
let login = document.getElementById("login");
login.addEventListener('click', Login);
function Login() {
  var universalVariable = "This is a universal variable.";
  sessionStorage.setItem('universalVariable', username.value);
  console.log(sessionStorage);
  const enteredUsername = username.value;
  const enteredPassword = password.value;

  // Retrieve the user data from the Realtime Database based on the entered username
  (0, _firebaseDatabase.get)((0, _firebaseDatabase.child)((0, _firebaseDatabase.ref)(db), "user/" + enteredUsername)).then(snapshot => {
    const user = snapshot.val();
    if (user && user.password === enteredPassword) {
      alert("Login successful");
      const f = document.getElementById('f');
      f.style.display = "none";
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_App.default, null), document.getElementById("root"));
    } else {
      alert("Invalid username or password");
    }
  }).catch(error => {
    alert("Error retrieving user data: " + error.message);
  });
}