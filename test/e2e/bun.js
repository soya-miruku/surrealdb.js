import Surreal, { ExperimentalSurrealHTTP } from "../../npm/esm/index.js";
import * as exports from "../../npm/esm/index.js";
import handler from "./shared.js";
import fetch from 'node-fetch';

const ws = new Surreal();
const http = new ExperimentalSurrealHTTP({ fetch });

await ws.connect("http://127.0.0.1:8000", {
  auth: {
    username: "root",
    password: "root"
  },
  namespace: "test",
  database: "test",
});
// await http.connect("http://127.0.0.1:8000");

console.log("\n Testing Websocket");
// await handler(ws, exports);
console.log("\n Testing Websocket Large");
const items = Array.from({ length: 12000 }, (_, i) => i);
console.log(JSON.stringify(items).length);
await ws.create("large", {
  items
})

console.log("\n Testing HTTP");
// await handler(http, exports);

ws.close();
// http.close();
