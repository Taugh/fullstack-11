# Starting a server
- within project folder:
- use `npm init` or `npm init -y` to create a project
- dependency step
	- `npm i express` to install express
	- `npm i nodemon --save-dev` to install Nodemon
	- `--save-dev` flag allows us to install things that won't make it to prod version
	- create the following scripts:
		- `"start": "node app.js"` - starts our app via project
		- `"dev": "nodemon"` - starts app via development mode
- to start the server, run `npm run dev`

# Files and Meanings
- `/node_modules` folder
	- responsible for keeping all code of all dependencies
- `package.json` file
	- keeps track of all required dependencies
	- has our project information
	- has the entry point
	- has any scripts we want to run

# HTTP Protocol & RESTful Architecture

- The client communicates with the serrver using HTTP protocol
- Done using Representation State Transfer (REST)
- Client sends a request
- Server receives the request and returns a response to the client
- Server has business logic to handle the request/response lifecycle

## Route/Endpoint

A route or endpoint is simply a sport after the socket where a request can be sent.

(1).    (2).  (3). (4).  (5). (6). (7). 
https://www.google.com/search?q=mySearchQuery

1. protocol (http & https) (:80 or :443)
2. naked vs root domain (we can also have subdomains: mail.google.com)
3. domain
4. top level domain
5. endpoint/route (anything after the 'slash')
6. query param key
7. query param values

## HTTP Methods

HTTP methods allow us to define what we're doing with the data when we hit that route. 

There are 40 methods 9 of which are core methods, but you only need to know 4 to 5.

- GET
- POST
- PUT
- DELETE
- OPTIONS (pre flight)

Endpoint can have multiple different methods.

I can have GET /about endpoint and a POST /about endpoint.

Each will be handled differently

## CRUD (Create, Read, Update, Delete)

Anytime we hit a method, it's for a specific purpose

- Create : POST (or GET)
- Read : GET (or POST)
- Update : PUT or PATCH
- Delete : DELETE

## Anatomy of an HTTP Request/Response

- URL - defined the domain, subdomain, top  level domain, route, query params, and HTTP method used. Ex: GET https://google.com/
- Headers - metadata. Contains data such as tokens, CORS info, type of incoming data, etc.
- Body - exists of any request but used mostly on POST, PUT, and PATCH. Can be anything (text, JSON, XML, HTML, and so on.)

Response specific:
- Status Code - health of our req/res (200, 201, 403, 404, 500 and so on)
- Payload - the goodies