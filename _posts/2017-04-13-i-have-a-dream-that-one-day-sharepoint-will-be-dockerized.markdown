---
layout: post
title: "I have a dream, that one day SharePoint will be Dockerized"
date: "2017-04-13 12:49:02 -0700"
published: false
tags:
  - SharePoint Dockerized
  - SharePoint Scalability
  - Modern SharePoint Deployments
  - SharePoint Kubernetes
  - SharePoint Deployed to Azure Container Services
---


[insert custom image of sharepoint topology using docker, yeah make one up!]

Imagine the day when you want to spin up a SharePoint farm and you define your topology using `docker-compose.test.yaml` and `docker-compose.production.yaml` for both of your environments and each environment mirrors the other, you have a repeatable and reliable way to spin up farms at will and scale them easily...

Though we are far from getting there, I believe it will happen.  For now, here is how I imagine it.

# Why We Can't Dockerize SharePoint
Well, there are many reasons given the complexity of the platform, but to be brief one of the major reasons is that you cannot install SharePoint on Windows Server Nano or Core edition as it has limited features which in fact SharePoint needs.  The minimum operating system requirement is either Windows Server 2012 R2 Standard or Datacenter or Windows Server 2016 Standard or Datacenter.

### Some key components that are required for an install are:
1. **Active Directory Domain controller** - (Though SharePoint can authenticate users using OAuth, so setting it up to use say Azure AD or any OAuth provider is not a problem, this is still needed.
2. **SQL Server** - the Linux container is actually available and one can get it by `docker pull microsoft/mssql-server-linux`
3. **IIS** - This one is also available for nano server `docker pull nanoserver/iis`



# But What If...
I like daydreaming, I started thinking of how this would look like for a deployment.

What if we had all the components available to us, how would this look in the Docker world?  Here is a rough draft of what I see..
