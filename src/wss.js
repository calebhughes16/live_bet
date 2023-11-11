const WebSocket = require("ws");

const wsConnection = new WebSocket("wss://socketsbay.com/wss/v2/1/demo/", {
  headers: {
    Origin: "https://sports.co.betmgm.com",
    "Sec-WebSocket-Key": "FXy0nvTROMT0uRN0ug6Xng==",
    "Sec-WebSocket-Version": "13",
    "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    // Include other headers as necessary
  },
});

wsConnection.on("open", function open() {
  console.log("Connected");
  // You can now interact with the WebSocket connection
});

wsConnection.on("message", function incoming(data) {
  console.log("Received:", data);
  // Handle incoming messages
});

wsConnection.on("close", function close() {
  console.log("Disconnected");
  // Handle connection closure
});

wsConnection.on("error", function error(err) {
  console.error("WebSocket error:", err);
  // Handle errors
});
