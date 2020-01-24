---
layout: post
title: Interpolating HashiCorp Vault Secrets into Jenkins X Helm Chart App
subtitle: Learn how to retrieve Vault secrets when deploying your full-stack app packaged as a Helm Chart in Jenkins X

image: '/img/vault-helm-jx-secrets/Vault_VerticalLogo.png'
share-img: '/img/vault-helm-jx-secrets/Vault_VerticalLogo.png'
published: true
author: Oscar Medina
date: 2020-01-23
tags:
  - Docker
  - CI/CD Pipeline
  - Jenkins X
  - Tekton
  - HashiCorp Vault
  - K8s
  - Helm
  - Kubernetes
---

![Testing Features](/img/vault-helm-jx-secrets/banner_jx_vault_helm.png)

# Overview
If you have used Jenkins X, you know that [HashiCorp Vault](https://www.hashicorp.com/products/vault/) is installed by default in the CJXD (CloudBees Jenkins X Distro).  However, there hasn't really been an example in the docs about how to use secrets stored in Vault when deploying an app that has the need for them.

In this guide, I walk you through deploying the Cars REST API a [full-stack app with a backend in MongoDB](https://github.com/jenkins-oscar/cars-rest-api).  The repo branch titled **Vault-Secrets** is the one you want to look at.


**TIP:**  With the recently annnounced tighter Vault integration with Kubernetes, there is actually a better way.  We can inject Vault secrets directly into pods and make them available.  My friend [Nick Jackson](https://twitter.com/sheriffjackson) explains how to do this on his post - [Dynamic Database Credentials with Vault and Kubernetes](https://www.hashicorp.com/blog/dynamic-database-credentials-with-vault-and-kubernetes/)

Nick and I will be showing you how to do this on *Jenkins X* very soon, so stay tuned!

# Prerequisites

1. Either the OSS or CJXD editions of Jenkins X working with Vault installed. 
2. Clone the [Cars REST API app]((https://github.com/jenkins-oscar/cars-rest-api/blob/vault-secrets/))

# 1. Creating Vault Secret

The first thing you want to do, is create the Vault Secret.  Call it `mongodb` and add the following keys:

- mongodb-username
- mongodb-password
- mongodb-root-password

### Accessing HashiCorp Vault UI
To access the Vault instance in Jenkins X, you will need to first retrieve the configuration by executing the following:

```bash
> $ echo eval `jx get vault-config`

# copy the output to set env variables (yours are different of course)
export VAULT_ADDR=https://vault.cjxd.sharepointoscar.com export VAULT_TOKEN=r.4bbbbbbbX4jDB4QOKoHDCid4Sxtk5v
```
What we are doing is retrieving the configuration.  Then setting up Environment Variables (copy n paste them on your terminal).  If you thenexecute `env | grep VAULT` you will see the variables are set.

From the UI, follow the instructions to create a secret.  It should look something similar to the following:

![Vault Secret in Jenkins X](/img/vault-helm-jx-secrets/vault-secret-settings.png)


# 2. Modify the Environment Repo (Staging)

**NOTE**
Though I am told that you can accomplish secret interpolation by setting this at the app level only, I have not tried it and so I want you to also include this on your target environment where the app is being deployed.  In my case it is *Staging*.  Take a look at the actual [file in my repo](https://github.com/jenkins-oscar/environment-whiskeysour-staging/blob/master/env/values.tmpl.yaml).  

- You will want to checkout the file located at `env/values.yaml` (this file can be empty based on my experience, later gets populated again)

- You will want to create a new file, name it `env/values.tmpl.yaml`.  The file should look like the sample code below.  At the bottom is where I add my app secrets and set them as *environment variables* for the *Staging* environment.


```yaml

PipelineSecrets: {}
cleanup:
  Annotations:
    helm.sh/hook: pre-delete
    helm.sh/hook-delete-policy: hook-succeeded
  Args:
  - --cleanup
expose:
  Annotations:
    helm.sh/hook: post-install,post-upgrade
    helm.sh/hook-delete-policy: hook-succeeded
  Args:
  - --v
  - 4
  config:
    domain: cjxd.sharepointoscar.com
    exposer: Ingress
    http: "true"
    tlsacme: "false"
jenkins:
  Servers:
    Global: {}
prow: {}

cars-rest-api:
  env:
    MONGODB_USERNAME: vault:mongodb:mongodb-username
    MONGODB_PASSWORD: vault:mongodb:mongodb-password
    MONGODB_DATABASE: cars-rest-api
```


# 3. Modify App Helm Charts

There are several files we need to modify for two charts, the main chart is named *cars-rest-api* and the *Preview* app helm chart. Here is the structure depicting the charts in question.

```bash

➜ tree charts -l 2
charts
├── cars-rest-api
│   ├── Chart.yaml
│   ├── Makefile
│   ├── README.md
│   ├── requirements.lock
│   ├── requirements.yaml
│   ├── templates
│   │   ├── NOTES.txt
│   │   ├── _helpers.tpl
│   │   ├── deployment.yaml
│   │   ├── ksvc.yaml
│   │   └── service.yaml
│   └── values.yaml
└── preview
    ├── Chart.yaml
    ├── Makefile
    ├── requirements.yaml
    └── values..yaml


```

##  The requirements.yaml changes

First we must add the dependencies to the main chart.  There is nothing new here, we add the MongoDB dependency to our chart using Helm standard approach, which is by modifying the `requirements.yaml` as shown below.

```yaml
dependencies:
- name: mongodb
  alias: cars-rest-api-db
  version: 7.6.5
  repository: https://kubernetes-charts.storage.googleapis.com
  condition: cars-rest-api-db.enabled

```

 Next, we modify `values.yaml` and add to the `env:` variables as well as the `mongoDB` dependency, which I've aliased as `cars-rest-api-db` (shown on `requirements.yaml` above) 
 

 **NOTE:** It is important to notice that the reference to the Vault keys within the MongoDB chart parameters is within double quotes.  Took me **4 full days to realize this issue and I grew more gray hair for sure.**

## The values.yaml changes
 The `values.yaml` file should look like this.

 ```yaml
 .....
env:
  MONGDB_USERNAME: vault:mongodb:mongodb-username
  MONGDB_PASSWORD: vault:mongodb:mongodb-password
  MONGDB_ROOT_PASSWORD: vault:mongodb:mongodb-root-password
....

# MongoDB Configuration
cars-rest-api-db:
  ## Whether to deploy a mongodb server to satisfy the applications database requirements.
  ## To use an external database set this to false and configure the externaldb parameters
  enabled: true

  ## Enable authentication
  ## ref: https://docs.mongodb.com/manual/tutorial/enable-authentication/
  #
  usePassword: true
  # existingSecret: jx-auth

  ## MongoDB custom user and database
  ## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#creating-a-user-and-database-on-first-run
  ##
  mongodbUsername: "vault:mongodb:mongodb-username"
  mongodbDatabase: "cars_rest_api"
  mongodbPassword: "vault:mongodb:mongodb-password"

  ## MongoDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  mongodbRootPassword: "vault:mongodb:mongodb-root-password"
  ...

 ```

## The Preview Chart Canges
 For the Preview chart, we modify two files.  The `values.yaml` and the `requirements.yaml`, very similar changes.  However we name things differently.

 On the `requirements.yaml` we alias the MongoDB as `preview-db` and make sure we add it below the existing dependencies, BUT before the `preview` chart definition as shown below.


 ```yaml
 dependencies:
- alias: expose
  name: exposecontroller
  repository: http://chartmuseum.jenkins-x.io
  version: 2.3.92
- alias: cleanup
  name: exposecontroller
  repository: http://chartmuseum.jenkins-x.io
  version: 2.3.92

- name: mongodb
  alias: preview-db
  version: 5.3.0
  repository: https://kubernetes-charts.storage.googleapis.com
  
    # !! "alias: preview" must be last entry in dependencies array !!
  # !! Place custom dependencies above !!
- alias: preview
  name: cars-rest-api
  repository: file://../cars-rest-api
 ```

The `values.yaml` file contains the same environment variables as the main chart.


**NOTE:** It is important to notice that the reference to the Vault keys within the MongoDB chart parameters is within double quotes.  Took me **4 full days to realize this issue and I grew more gray hair for sure.**


 ```yaml
 .....
  env:
    MONGODB_USERNAME: vault:mongodb:mongodb-username
    MONGODB_PASSWORD: vault:mongodb:mongodb-password
    MONGODB_DATABASE: cars-rest-api
    MONGODB_ROOT_PASSWORD: vault:mongodb:mongodb-root-password
## MongoDB chart configuration
## ref: https://github.com/helm/charts/blob/master/stable/mongodb/values.yaml
##
preview-db:
  ## Whether to deploy a mongodb server to satisfy the applications database requirements.
  ## To use an external database set this to false and configure the externaldb parameters
  enabled: true

  ## Enable authentication
  ## ref: https://docs.mongodb.com/manual/tutorial/enable-authentication/
  # NOTE: make sure this secret is in 
  usePassword: true
  #existingSecret: preview-auth

  ## MongoDB custom user and database
  ## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#creating-a-user-and-database-on-first-run
  ##
  mongodbUsername: "vault:mongodb:mongodb-username"
  mongodbDatabase: "cars_rest_api"
  mongodbPassword: "vault:mongodb:mongodb-password"

    ## MongoDB admin password
  ## ref: https://github.com/bitnami/bitnami-docker-mongodb/blob/master/README.md#setting-the-root-password-on-first-run
  ##
  mongodbRootPassword: "vault:mongodb:mongodb-root-password"
.....

 ```

# Summary
On this post we walked through the required steps to ensure you are able to retrieve and interpolate Vault secrets within your custom app being put through CI/CD in Jenmins X.

Here is the video of the webinar session where I show it in action.

<iframe width="600" height="400" src="https://www.youtube.com/embed/LRj_yHKxG80" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Cheers,

[@SharePointOscar](https://twitter.com/SharePointOscar)
