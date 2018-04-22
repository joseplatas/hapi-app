'use strict';
const Hapi = require('hapi');

// set server with a host and port
const server = Hapi.server({
  port: 8000,
  host:"localhost",
});


// adding a route
server.route({
  method: "GET",
  path: "/",
  handler: (request, h)=>{
    return ('Hello Hapi');
  }
});

//dynamic route, depends on url key
server.route({
  method: "GET",
  path: '/{name}',
  handler: (request, h) =>{
    return(
      'Hello, ' + encodeURIComponent(request.params.name) + "!"
    )
  }
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
