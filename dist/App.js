"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _reactFileIcon = _interopRequireWildcard(require("react-file-icon"));
var _StoreContent = require("./components/StoreContent.js");
require("react-drop-zone/dist/styles.css");
require("bootstrap/dist/css/bootstrap.css");
var _reactstrap = require("reactstrap");
require("./App.css");
var _firebaseApp = require("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
var _firebaseDatabase = require("https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
/* create the client */

class App extends _react.Component {
  user = sessionStorage.getItem('universalVariable');
  state = {
    isReady: true // State to track whether rendering is complete
  };

  componentDidMount() {
    this.onDrop(); // Call a function to fetch data and render additional elements
  }

  getFiles = async cid => {
    const files = await (0, _StoreContent.Retrieve)(cid);
    for (const file of files) {
      const type = file.name.substr(file.name.lastIndexOf(".") + 1);
      const parentElement = document.getElementById("add");
      // Sample data for the item
      const item = [file.cid, file.name, type];

      // Create the first <th> element with FileIcon
      const row = document.createElement("tr");
      const fileIconTh = document.createElement("th");
      _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_reactFileIcon.default, _extends({
        size: 30,
        extension: type
      }, _reactFileIcon.defaultStyles[type])), fileIconTh);
      // Create the second <th> element with the anchor link
      const textTh = document.createElement("th");
      textTh.classList.add("text-left");
      const link = document.createElement("a");
      link.href = "https://ipfs.io/ipfs/" + item[0];
      link.textContent = item[1];
      textTh.appendChild(link);

      // Add both <th> elements to the parent element
      row.appendChild(fileIconTh);
      row.appendChild(textTh);
      parentElement.appendChild(row);
    }
    this.setState({
      isReady: true
    });
  };
  onDrop = async () => {
    try {
      (0, _firebaseDatabase.get)((0, _firebaseDatabase.child)((0, _firebaseDatabase.ref)(db), "user/" + this.user + "/link")).then(snapshot => {
        const user = Object.values(snapshot.val());
        for (const child of user) {
          this.getFiles(Object.values(child).toString());
        }
      }).catch(err => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "App",
      t: this.onDrop
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "container pt-3"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "table-container"
    }, /*#__PURE__*/_react.default.createElement(_reactstrap.Table, null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", {
      width: "7%",
      scope: "row"
    }, "Type"), /*#__PURE__*/_react.default.createElement("th", {
      className: "text-left"
    }, "File Name"))), /*#__PURE__*/_react.default.createElement("tbody", {
      id: "add"
    })))));
  }
}
var _default = App;
exports.default = _default;