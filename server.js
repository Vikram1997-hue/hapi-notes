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
      path: '/{username}',
      handler: (request, h) => {
        console.log(request);
        return `<h1>Mitr ${request.params.username}, Hapi mein aapka swagat hai</h1>`;
      },
    });

    /**
     * REQUEST AND H -
     * 
     * request - created internally for each incoming request. contains keys like -
     * 1. request.auth - contains authentication information
     * 2. request.query - query params
     * 3. request.path - the request URI's pathname component
     * etc.
     * 
     * 
     * h - h is a response toolkit. It is basically a collection of the following properties - 
     * 1. h.authenticated(data) - used to handle valid credentials
     * 2. h.redirect(uri) - redirects the client to the specified uri
     * 3. h.response([value]) - wraps the provided value and returns a response object
     * etc.
     * 
     */

    server.route({
      method: 'GET',
      path: '/greeting/{username?}', //? means that the request param is optional
      handler: (request, h) => {
        console.log('Your query params are:', request.query); //note that the names, number, and type of 
        // query params don't have to be defined anywhere in the route information, unlike Express or NestJS
        return `Greetings, ${request.params.username || 'my friend'}.`;
      },
    });

    //example of redirection
    server.route({
      method: 'GET',
      path: '/i-will-redirect',
      handler: (request, h) => {
        return h.redirect('/redirectedUser');
      },
    });

    //handling of 404 error for API's that don't exist
    server.route({
      method: 'GET',
      path: '/{any*}', //this is a wildcard expression. NOTE: it doesn't have to 'any*'; it could also be xyz* or vukrim*.
        //Using the word 'any' is just a convention
      handler: (request, h) => {
        return '<h1>Oh no! You must be lost</h1>';
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
