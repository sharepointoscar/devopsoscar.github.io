---
layout: post
title: Install Jenkins X on a AKS Cluster using RBACK backed by Azure Active Directory
subtitle: Helps manage access to cluster via Azure Active Directory identities. 

image: 'https://carlos.mendible.com/assets/img/posts/aks.png'
published: true
author: Oscar Medina
date: 2019-08-25
tags:
  - Docker
  - CI/CD Pipeline
  - Jenkins X
  - Tekton
  - K8s
  - AKS
  - Azure
  - Azure Active Directory (AAD)
---

# Overview
Jenkins X is a CI/CD platform that can be installed on the three leading clouds AWS, Azure and GCP.  Many companies already have Identity Management Systems, such as Azure Active Directory which is synched with their on-premises directory.

So how does one leverage the existing Azure Active Directory in AKS?

Let's walk through the steps of creating the cluster, then installing Jenkins X on top of it.  All while using RBAC backed by Azure Active Directory identities.

# Create Server App and Client App in Azure Portal

Before we can execute the CLI to create the AKS cluster, we need to have several values which we will pass as parameters to the `az aks ceate` command.  I will not go through all detail here, instead please visit the following [Azure Documentation](https://docs.microsoft.com/en-us/azure/aks/azure-ad-integration)

Once you have created the two apps (server and client), you will need the IDs and secret to fill in the command we execute next.

# Creating the AKS Cluster via CLI
Our first step is to create the AKS cluster.  I am assuming you already have the CLI configured and are logged in.

Use the following command:


```bash
az aks create --resource-group JenkinsXGroup \
    --name AKSJenkinsXCluster \
    --generate-ssh-keys   \
    --aad-server-app-id <REPLACE>  \
    --aad-server-app-secret <REPLACE>   \
    --aad-client-app-id  <REPLACE>   \
    --aad-tenant-id <REPLACE> \
    --node-count 2 # default is six, changed to 2 to avoid filing ticket to increase quotas, the hell with that!
```
## Create an RBAC binding
The Resource Group and cluster name are obtained from the values used in the creating of the cluster in previous step.

```bash
az aks get-credentials --resource-group JenkinsXGroup --name AKSJenkinsXCluster --admin
```

# Installing Jenkins X on Cluster
There are many flags one can pass to the Jenkins X CLI, but the approach I am taking is to pass the minimal, and respond to the questions to ensure I set it up based on my needs.  

```bash
jx install --provider=aks --advanced-mode=true
```
The command takes a while, but the successful completion will look something like the following:


```
Jenkins X installation completed successfully


        ********************************************************

             NOTE: Your admin password is: <SOMELONGPASSWORDGOESHERE>

        ********************************************************

Your Kubernetes context is now set to the namespace: jx
To switch back to your original namespace use: jx namespace jx
Or to use this context/namespace in just one terminal use: jx shell
For help on switching contexts see: https://jenkins-x.io/developing/kube-context/
To import existing projects into Jenkins:       jx import
To create a new Spring Boot microservice:       jx create spring -d web -d actuator
To create a new microservice from a quickstart: jx create quickstart
```

At this point, we have Jenkins X installed on an AKS cluster.  We can verify things are working correctly by executing the `jx diagnose` and check the output.


# Managing Cluster Permissions
The simplest way to manage the cluster permissions is via the [Auzure Portal](https://portal.azure.com), and selecting **Resource groups** >>
**JenkinsXGroup** >> **AKSJenkinsXCluster** >> **Access Control (AIM)**

From there, you can add Active Directory Accounts into the appropriate **Role**.

In addition, you can check if an account has access.


# Using SSO for apps deployed

I am curious to see how easy it is to setup **SSO** for a give app being exposed in Jenkins X, or protecting the built-in endpoints.  Given the security settings of my cluster, and knowing that AAD can easily be used as an IdP, it would make sense.  There is also the [SSO Provider](https://github.com/jenkins-x/sso-operator) which can be used, appears to have a connector to AAD.

I may try and create a simple app and test this scenario out.  Once I test it out, I'll do a follow up to this post.


# Conclusion

Now that the AKS cluster is enabled with RBAC, it is easy to manage permission at the cluster level.  This will restrict what users have access to and what they can execute against the cluster.

Ops folks who want to execute CLI commands against the cluster are dropped into a Role, and configure the CLI with their credentails.

### Special Thanks to Gearóid Gman Maguire
Gearoid [asked via Twitter](https://twitter.com/gearoidmaguire/status/1165211816584261634?s=20), if this was possible and how one may go about it. So of course, curiosity kicked in immediately, and despite being the weekend, which I reserve for mostly outdoor activities, I just could not wait until Monday :)



Cheers,
[@SharePointOscar](https://twitter.com/SharePointOscar)