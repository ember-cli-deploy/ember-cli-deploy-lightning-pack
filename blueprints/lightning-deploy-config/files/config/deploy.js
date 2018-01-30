var VALID_DEPLOY_TARGETS = [ // update these to match what you call your deployment targets
  'dev',
  'qa',
  'prod'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    redis: {
      allowOverwrite: true,
      keyPrefix: '<%= dasherizedPackageName %>:index'
    },
    s3: {
      prefix: '<%= dasherizedPackageName %>'
    }
  };

  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'dev') {
    ENV.build.environment = 'development';
    ENV.redis.url = process.env.REDIS_URL || 'redis://0.0.0.0:6379/';
    // only care about deploying index.html into redis in dev
    ENV.pipeline = {
      disabled: {
        allExcept: ['build', 'redis']
      }
    }
  }

  if (deployTarget === 'qa' || deployTarget === 'prod') {
    ENV.build.environment = 'production';
    ENV.s3.accessKeyId = process.env.AWS_KEY;
    ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = /* YOUR S3 BUCKET NAME */;
    ENV.s3.region = /* YOUR S3 REGION */;
  }

  if (deployTarget === 'qa') {
    ENV.redis.url = process.env.QA_REDIS_URL;
  }

  if (deployTarget === 'prod') {
    ENV.redis.url = process.env.PROD_REDIS_URL;
  }

  return ENV;

  /* Note: a synchronous return is shown above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
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
}
