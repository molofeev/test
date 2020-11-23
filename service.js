const WS = require('ws');

const main = () => {
  const wss = new WS.Server({port: '8086'});

  console.debug(`Started WebSockets server at ws://localhost:8086.\n`);

  wss.on('connection', (ws, req) => {
      console.log(`New connection from ${req.url}.`);

      ws.on('message', (message) => {
          // First, decode the JSON.
          let msgObject;
          try {
            msgObject = JSON.parse(message.toString());
          } catch (e) {
            console.error(`Message contains invalid JSON: ${message}`);
            return;
          }
    
          console.debug(`${req.url} message:`, msgObject);

          ws.send('lol kek hooray');
      });

      ws.on('close', () => {
          console.debug(`Connection from ${req.url} closed.`);
      });
  });
};

main();