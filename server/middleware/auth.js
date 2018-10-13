const models = require('../models');
const Promise = require('bluebird');
const parseCookies = require('./cookieParser.js');


module.exports.createSession = (req, res, next) => {
  // console.log('SESSION', req)
  // console.log('SESSION', res )
  console.log(req.body);
  if (!req.cookies) {
    var newHash = models.Sessions.create();
    models.create(newHash);
  }
  // access the parse cookies on request
  
  var userCookie = parseCookies();
  console.log({userCookie});
  // looks up user data related to session
  models.Sessions.get(userCookie);
  // assign a object to a session property that contains relevant 
  // information
  
  // What information about the user would you want to keep 
  // in this session object?
  
  
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

/*

REQUEST
SESSION EventEmitter {,------,
  domain: null,-_-_-__|  /\_/\ 
  _events: {},_-_-_-_~|_( ^ .^) 
  _eventsCount: 0,_-_ ""  "" 
  _maxListeners: undefined,
  method: 'GET',
  url: '',
  originalUrl: '',
  baseUrl: '',
  path: '',
  params: {},
  cookies: {},
  headers: {},
  body: {},
  query: {},
  files: {},
  header: [Function],
  get: [Function],
  is: [Function],
  accepts: [Function],
  range: [Function],
  param: [Function],
  _setParameter: [Function],
  _setSessionVariable: [Function],
  _setCookiesVariable: [Function],
  _setSignedCookiesVariable: [Function],
  _setHeadersVariable: [Function],
  _setFilesVariable: [Function],
  _setMethod: [Function],
  _setURL: [Function],
  _setBaseUrl: [Function],
  _setOriginalUrl: [Function],
  _setBody: [Function],
  _addBody: [Function],
  send: [Function] }
  
RESPONSE 
SESSION EventEmitter {
  _headers: {},
  cookies: {},
  finished: false,
  headersSent: false,
  statusCode: 200,
  statusMessage: 'OK',
  locals: {},
  cookie: [Function],
  clearCookie: [Function],
  status: [Function],
  writeHead: [Function],
  send: [Function],
  sendStatus: [Function: sendStatus],
  json: [Function],
  jsonp: [Function],
  type: [Function],
  contentType: [Function],
  location: [Function],
  write: [Function],
  end: [Function],
  vary: [Function],
  append: [Function: append],
  header: [Function: header],
  set: [Function: header],
  getHeader: [Function],
  get: [Function],
  setHeader: [Function],
  removeHeader: [Function],
  setEncoding: [Function],
  getEncoding: [Function],
  redirect: [Function],
  render: [Function],
  format: [Function],
  destroy: [Function],
  destroySoon: [Function],
  _isEndCalled: [Function],
  _getHeaders: [Function],
  _getLocals: [Function],
  _getData: [Function],
  _getBuffer: [Function],
  _getChunks: [Function],
  _getStatusCode: [Function],
  _getStatusMessage: [Function],
  _isJSON: [Function],
  _isUTF8: [Function],
  _isDataLengthValid: [Function],
  _getRedirectUrl: [Function],
  _getRenderView: [Function],
  _getRenderData: [Function] }
*/