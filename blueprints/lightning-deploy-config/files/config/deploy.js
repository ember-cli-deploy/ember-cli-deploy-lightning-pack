var VALID_DEPLOY_ENVIRONMENTS = [ //update these to match what you call your deployment environments
  'dev',
  'qa',
  'prod'
];

module.exports = function(environment) {
  var ENV = {
    redis: {
      allowOverwrite: true,
      keyPrefix: '<%= dasherizedPackageName %>:index'
    },
    s3: {
      prefix: '<%= dasherizedPackageName %>'
    }
  };
  if (VALID_DEPLOY_ENVIRONMENTS.indexOf(environment) === -1) {
    throw new Error('Invalid environment ' + environment);
  }

  if (environment === 'dev') {
    ENV.buildEnv = 'development';
    ENV.redis.url = process.env.REDIS_URL || 'redis://0.0.0.0:6379/';
    ENV.plugins = ['build', 'redis']; // only care about deploying index.html into redis in dev
  }

  if (environment === 'qa' || environment === 'prod') {
    ENV.buildEnv = 'production';
    ENV.s3.accessKeyId = process.env.AWS_KEY;
    ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = /* YOUR S3 BUCKET NAME */;
  }

  if (environment === 'qa') {
    ENV.redis.url = process.env.QA_REDIS_URL;
  }

  if (environment === 'prod') {
    ENV.redis.url = process.env.PROD_REDIS_URL;
  }

  return ENV;

  /* Note: a synchronous return is show above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + environment;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */

  });
}
