---
layout: post
title: Using Rollout.io Feature Flags for apps deployed via Jenkins X CI/CD
subtitle: Launch new features with confidence to targeted audiences.

image: 'https://rollout.io/wp-content/uploads/2018/05/Artboard-214@2x.png'
share-img: https://rollout.io/wp-content/uploads/2018/05/Artboard-214@2x.png
published: true
author: Oscar Medina
date: 2019-08-29
tags:
  - Docker
  - CI/CD Pipeline
  - Jenkins X
  - Tekton
  - K8s
  - Rollout.io
  - Feature Flags
---

![Testing Features](/img/rollout-feature-flags-jenkins-x/hero-collaboration .png)

# Overview
I believe any company that produces software, will always have the need to test if a new feature is working for their target audience.  We know that giants like Facebook do this, and they do it well.

How can you elevate your feature deployment game?  Use feature flags to target a group of users with a specific feature, get feedback and improve said feature all while leveraging Jenkins X CI/CD and Preview Environments!

What are feature flags?  Here is directly from rollout.io
> Feature flags are at the core of Rollout.io. Using feature flags, you can easily enable and disable features in your application, giving you full control over how users are able to interact with your application.
                                                                                        - rollout.io

# Prerequisites

To get started, you will need to do the following:

1. Sign up for a [rollout.io](http://rollout.io) account.
2. Ensure you have to Rollout Environments (Production, Staging) 
3. You have `jx` [installed](https://jenkins-x.io/getting-started/install/) and a cluster running in GKE for example.
4. This post is based on a [Jenkins X QuickStart](https://jenkins-x.io/developing/create-quickstart/) I created and is available to you already. It is called `rollout-app`.  To follow along, simply create it using `jx create quickstart`, then select it.
 

# Scenario
Our scenario is simple.  We have a NodeJS application, and we would like to test if a button placement on the UI makes sense.  So we will use Rollout.io Feature Flags to configure our NodeJS app accordingly. 

The app will be put through CI/CD in Jenkins X.  The **Staging** environment is the place where our intended audience will view the new feature, in this scenario it is just a button.  No other environment will have that button show up.


# Rollout Dashboard Configuration

1. Create a Custom Property, call it `JenkinsX Environment` of type `string` by going to left navigation **App Settings** > **Custom Properties**, click _Add New Custom Property_

2. Create a **Flag** within the Rollout `Staging` environment, by clicking on the left nav under Staging > Experiements, then click **New Experiement** and select `Create Flag1`  Confusing right, but that should work.

![Create Flag](/img/rollout-feature-flags-jenkins-x/create_flag_staging.png)

Call the flag `jenkinsx environment`, this will map to an internal name of `ski-rollout.jenkinsx_environment` which we create via code.

3. Create a **Target Group** and configure it as shown below

![Target Group](/img/rollout-feature-flags-jenkins-x/target_group.png)

We are creating a **Target Group** that is _targeting_ the Staging Environment in Jenkins X.  

**NOTE:** Enter the values as strings (multiple), ensure that you add the exact name of your environment `namespace`, which you can obtain by executing `jx get env` and view the **NAMESPACE** column.

4. Create an **Experiment** and configure it to target the group you created in the previous step.  It should be configured as follows:

![Experiement in Staging](/img/rollout-feature-flags-jenkins-x/experiment_staging.png)

Ensure, that the dropdown, is set to `true`.

# The App Code
Integrating Rollout into our NodeJS application is actually quite simple.  For this example, I've added the necessary code into the `server.js` file, ideally you organize your files as needed to avoid having this file cluttered.

```javascript

var http = require('http');
var fileSystem = require('fs');
var Rox = require('rox-node');
var express = require('express');
var app = express();
var context= {};

//setup Rollout app settings container and flag
const appSettingsContainer = {
	jenkinsx_environment: new Rox.Flag()
  };

// this property must exist in the Rollout Dashboard.
Rox.setCustomStringProperty('JenkinsX Environment', function(context){
	return context.jenkinsx_environment;
  });

// change the name accordingly
Rox.register('ski-rollout', appSettingsContainer);


// Rollout Staging Env
async function setupRox() {
	console.log('calling Rox.setup for Staging...');
	
	// the parameter for setup, is the ID of the Staging Environment in the Rollout Dashboard.
	// you can use other environment IDs but those must be defined in the Rollout Dashboard.
	var _result =  await Rox.setup('5d016c4223864938a85c1d33', {

	  });

	await sleep (2000);
	return _result;
 }
 
 
 setupRox().then((value) => {

	if (appSettingsContainer.jenkinsx_environment.isEnabled(context)) {
		console.log('----- We are in Staging Jenkins X environment! --------');
	 }
	 else {
		console.log('------ What Jenkins X environment? : '+ context.jenkinsx_environment+' ---------');
	 }
	
 });


function getJXEnvironment() {
	var _env = '';
	_env = fileSystem.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/namespace', 'utf8');

	return _env;
}

// Routes - we pass two variables to the HTML to preform approrpiate actions based on conditions.
app.get('/', function(req, res) {

	// first ensure we have our file contents, which contains the k8s namespace we are in.
	context = { jenkinsx_environment: getJXEnvironment() };
	console.log('----------- app.get() - called getJXEnvironment() and got: '+ context.jenkinsx_environment+' so rendering ---------------------');
    res.render('pages/index',{env:context.jenkinsx_environment,renderButton:appSettingsContainer.jenkinsx_environment.isEnabled(context)});
});

app.listen(8080);

console.log('------ Ok your app is listening on port 8080! -------- ');

```

Here is the button being shown only in the staging environment.

![Target Group](/img/rollout-feature-flags-jenkins-x/feature_flags_button.png)

# Conclusion
With this basic configuraton in place.   Our button will only now show when the app is running in the staging environment. This post merely scratches the surface of what is possible with Feature Flags.  I encourage you to explore releasing features in this manner.  

Some of the nice capabilities I am looking forward to try are:

- Targeting Rules
- Gradual Rollout & Rollback
- Multivariate Testing

Learn more at [rollout.io](https://rollout.io/product/)

Cheers,
[@SharePointOscar](https://twitter.com/SharePointOscar)
