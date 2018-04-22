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
    //saving logs
    request.logger.info('In handler %s',request.path);
    return(
      'Hello, ' + encodeURIComponent(request.params.name) + "!"
    )
  }
});

//serving static files using inert
server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, h) => {
    return(
      h.file('./public/hello.html')
    )
  }
});


//init server
const init = async () =>{

  //requiring a plugin
  await server.register(require('inert'));
  await server.register({
    plugin: require('hapi-pino'),
    options: {
        prettyPrint: true,
        logEvents: ['response']
    }
});


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
