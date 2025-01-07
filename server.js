const hapi = require('@hapi/hapi');

/*
//BTW (and unrelated) - an async function ALWAYS returns a Promise
const myFunc = async () => {
    await console.log(1);
    return true;
}

let a = myFunc();
console.log(a)
*/



//Hapi server object
//A common practice when creating this is to wrap this in a function, particularly an asynchronous one, so you can
//use the await keyword throughout
const init = async() => {

    const server = hapi.Server({
      host: 'localhost',
      port: 3001,
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        return '<h1>Hapi mein aapka swagat hai</h1>'
      },
    });

    await server.start();
    console.info(`Server running on ${server.info.uri}`);
}

//for error handling -
process.on('unhandledRejection', (err) => {
  console.error(`An error has occurred: ${err}`);
  process.exit(1); //NOTE: 0 is a success code, and 1 (or any other number) is a failure code
});
/* The unhandledRejection event is emitted when a promise is rejected and no error handler is attached to the promise
within a turn of the event loop */


init();
