"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Retrieve = void 0;
var _web = require("web3.storage");
var _constants = require("../constants.js");
const web3storage_key = _constants.WEB3STORAGE_TOKEN;
function GetAccessToken() {
  return web3storage_key;
}
function MakeStorageClient() {
  return new _web.Web3Storage({
    token: GetAccessToken()
  });
}
const Retrieve = async cid => {
  const client = MakeStorageClient();
  const res = await client.get(cid);
  const file = await res.files();
  return file;
  // for (const file of files) {
  //   console.log(`${file.cid} ${file.name} ${file.size}`);
};
exports.Retrieve = Retrieve;