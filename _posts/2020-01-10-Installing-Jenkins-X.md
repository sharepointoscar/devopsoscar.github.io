---
layout: post
title: Installing Jenkins X using JX Boot (The Non CJXD edition)
subtitle: The path to get your cluster up and running fast!

image: '/img/jenkins-x/jx-captain.png'
share-img: '/img/jenkins-x/jx-captain.png'
published: true
author: Oscar Medina
date: 2020-01-10
tags:
  - Docker
  - CI/CD Pipeline
  - Jenkins X
  - Tekton
  - K8s
  - Getting Started
  - Kubernetes
---

![Testing Features](/img/jenkins-x/jx-captain.png)

# Overview
Thought it'd be good to quickly show you how to get your Jenkins X cluster up and running using JX Boot and using the specific jx version below.  You'll also notice, I am using the Replicator App which is one of many you can use in this [repository](https://github.com/jenkins-x-apps), which helps keep secrets in sync between Kubernetes namespaces.

# Prerequisites

To get started, you will need to do the following:

1. A GCP account, with admin rights, or have the ability to create resources.
2. Install `jx` binary.  On OS X, simply issue `brew install jenkins-x/jx/jx`.  For others take a [look here](https://jenkins-x.io/docs/getting-started/setup/install/).
3. You have `jx` [installed](https://jenkins-x.io/getting-started/install/) and a cluster running in GKE for example.


My environment has the following versions installed.

```bash
➜ jx version
NAME               VERSION
jx                 2.0.1116
Kubernetes cluster v1.13.11-gke.14
kubectl            v1.16.0
helm client        Client: v2.13.1+g618447c
git                2.21.0
Operating System   Mac OS X 10.14.6 build 18G103
```


# Getting Started

1. First execute `jx create cluster gke --skip-installation`  We are creating the Kubernetes cluster using the CLI.  However, you can provision your cluster using whatever methods are acceptable in your environment.  I am a big fan of Terraform! Be sure to have RBAC enabled.

2. Then execute `jx boot` 
		
	**NOTE:** The Git repositories are private by default.  One way to handle this, is to cancel the boot command once you get this warning. At this point the boot git repo has been pulled locally to your current directory where you executed the command.  Simply add `environmentGitPublic: true` under the `cluster` node on the `jx-requirements.yaml` , then run jx boot again to continue.  This is kinda painful, but there is an [open issue](https://github.com/jenkins-x/jx/issues/6472) to make it possible to customize the `jx-requirements.yaml` before executing boot.

3. If you are using a custom domain, execute the following command to create a GCP Cloud DNS Zone `jx create domain gke -d cjxd.sharepointoscar.com` (in my case).  

4. Update jx-requirements.yaml **ingress** to use your custom domain and enable TLS, it should look similar to the following

	```bash 
	gitops: true
	ingress
	domain: cjxd.sharepointoscar.com
	externalDNS: true
	namespaceSubDomain: .
	tls:
		email: me@sharepointoscar.com
		enabled: true
		production: true
	```

5. Run `jx boot`

	In the background the `dev` repository is being modified via a PR and a pipeline is being triggered to make the changes to your actual Kubernetes cluster.

	The end results in my case is as follows: 

	```bash
	# check ingress objects using kubectl
	>$ kubectl get ing
	NAME          HOSTS                                  ADDRESS        PORTS     AGE
	chartmuseum   chartmuseum.cjxd.sharepointoscar.com   34.82.12.120   80, 443   73m
	deck          deck.cjxd.sharepointoscar.com          34.82.12.120   80, 443   73m
	hook          hook.cjxd.sharepointoscar.com          34.82.12.120   80, 443   73m
	nexus         nexus.cjxd.sharepointoscar.com         34.82.12.120   80, 443   73m
	tide          tide.cjxd.sharepointoscar.com          34.82.12.120   80, 443   73m

	# check ingress objects using jx cli
	>$ jx get urls
	NAME  URL
	deck  https://deck.cjxd.sharepointoscar.com
	hook  https://hook.cjxd.sharepointoscar.com
	nexus https://nexus.cjxd.sharepointoscar.com
	tide  https://tide.cjxd.sharepointoscar.comg
	```

6. Add the secret replicator app which makes it easy to keep secrets across Kubernetes namespaces in sync. Execute `jx add app jx-app-replicator -v 1.0.16 --repository https://storage.googleapis.com/chartmuseum.jenkins-x.io`

7. Trigger a pipeline to replicate secrets into **staging** and **production** namespaces. Execute `jx step replicate secret "tls-*" -r jx-staging -r jx-production --create-namespace`


Congratulations, you now have a fully functional cluster!

# What is CJXD?
I mentioned it on the title of this post, but what is it?  

> CloudBees Jenkins X Distribution provides a stable, predictable release line for teams building cloud native Kubernetes-based applications with Jenkins X. It comes battle tested and ready for production workloads with support and documentation vetted by CloudBees. As Jenkins X rapidly evolves, so will CloudBees Jenkins X Distribution with stability and reliability in the forefront.
> 																							-	Cloudbees

You can use it to deploy it in large enterprise environments where change management is in place, and you want to have more control of the platform.  Learn how to easily install it at the [docs site](0https://docs.cloudbees.com/docs/cloudbees-jenkins-x-distribution/latest/).

Cheers,
[@SharePointOscar](https://twitter.com/SharePointOscar)
