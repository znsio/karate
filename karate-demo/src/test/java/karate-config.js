function fn() {
  karate.configure('connectTimeout', 5000);
  karate.configure('readTimeout', 5000);
  var port = karate.properties['demo.server.port'] || '8080';
  var protocol = 'http';
  if (karate.properties['demo.server.https'] === 'true') {
    protocol = 'https';
    karate.configure('ssl', true);
  }
  var host = '127.0.0.1';
  if (karate.env == 'perfiz') {
    host = 'host.docker.internal'
  }
  var config = { demoBaseUrl: protocol + '://' + host + ':' + port };
  if (karate.env !== 'mock') {
    // karate.configure('callSingleCache', { minutes: 1 });
    // 'callSingle' is guaranteed to run only once even across all threads
    var result = karate.callSingle('classpath:demo/headers/common-noheaders.feature', config);
    // and it sets a variable called 'authInfo' used in headers-single.feature
    config.authInfo = { authTime: result.time, authToken: result.token };
  }
  return config;
}
