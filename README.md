# ember-cli-deploy-lightning-pack

> An ember-cli-deploy plugin pack to implement a lightning deployment pattern as described

<hr/>
**WARNING: This plugin is only compatible with ember-cli-deploy versions >= 0.5.0**
<hr/>

This package bundles the plugins you need to have a deployment pipeline for your Ember app similar to what I described in my talk: Lightning Fast Deployment of Your Rails-backed JavaScript https://www.youtube.com/watch?v=QZVYP3cPcWQ

It also has a blueprint for your `config/deploy.js` file to get you started.

## Installation

```
* Wait for ember-cli-deploy 0.5.0 to be released
ember install ember-cli-deploy
ember install ember-cli-deploy-lightning-pack
```

The necessary set of plugins will be available to ember-cli-deploy and an example `deploy/config.js` file will be generated for you to customize with information for your deployment environments.

## What is a plugin pack?

A "plugin pack" is a concept supported by ember-cli-deploy that allows a single addon to make multiple plugins available by adding a single direct depedency to your project.

## What plugins are made available?

* [ember-cli-deploy-build](https://github.com/zapnito/ember-cli-deploy-build)
* [ember-cli-deploy-gzip](https://github.com/lukemelia/ember-cli-deploy-gzip)
* [ember-cli-deploy-redis](https://github.com/zapnito/ember-cli-deploy-redis)
* [ember-cli-deploy-s3](https://github.com/zapnito/ember-cli-deploy-s3)
* [ember-cli-deploy-manifest](https://github.com/lukemelia/ember-cli-deploy-manifest)
* [ember-cli-deploy-revision-data](https://github.com/zapnito/ember-cli-deploy-revision-data)
