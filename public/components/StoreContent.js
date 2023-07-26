import { Web3Storage } from "web3.storage";
import { WEB3STORAGE_TOKEN } from "../constants.js";
const web3storage_key = WEB3STORAGE_TOKEN;
function GetAccessToken() {
  return web3storage_key;
}

function MakeStorageClient() {
  return new Web3Storage({ token: GetAccessToken() });
}
export const Retrieve = async (cid) => {
  const client = MakeStorageClient();
  const res = await client.get(cid);
const file = await res.files();
return file;
// for (const file of files) {
//   console.log(`${file.cid} ${file.name} ${file.size}`);
};