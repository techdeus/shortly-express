const parseCookies = (req, res, next) => {
  var headersCookie = req.headers.cookie;
  if (!headersCookie) {
    return res.cookies;
    next();
  } else {
    const cookieArr = headersCookie.split(';');
    for (let i = 0; i < cookieArr.length; i += 1) {
      const arr = cookieArr[i].split('=');
      req.cookies[arr[0].trim()] = arr[1].trim();
    }
    next();
  }

};

module.exports = parseCookies;



//  str.split(';')
// [ 'shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66',
//   ' otherCookie=2a990382005bcc8b968f2b18f8f7ea490e990e78',
//   ' anotherCookie=8a864482005bcc8b968f2b18f8f7ea490e577b20' ]
/*
{ req: 
   EventEmitter {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     method: 'GET',
     url: '',
     originalUrl: '',
     baseUrl: '',
     path: '',
     params: {},
     cookies: {},
     headers: { cookie: 'shortlyid=18ea4fb6ab3178092ce936c591ddbb90c99c9f66; otherCookie=2a990382005bcc8b968f2b18f8f7ea490e990e78; anotherCookie=8a864482005bcc8b968f2b18f8f7ea490e577b20' },
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
     send: [Function] } }
{ res: 
   EventEmitter {
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
     _getRenderData: [Function] } }
*/