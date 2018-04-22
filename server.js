'use strict';
const Hapi = require('hapi');

// set server with a host and port
const server = Hapi.server({
  port: 8000,
  host:"localhost",
});

//init server
const init = async () =>{
  try {
      await server.start();
  }
  catch (err) {
      console.log(err);
      process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

//handle errors
process.on('unhandleRejection', (err)=>{
  console.log(err);
  process.exit(1)
});

init();
