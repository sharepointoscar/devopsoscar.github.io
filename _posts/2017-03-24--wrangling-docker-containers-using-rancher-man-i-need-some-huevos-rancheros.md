---
layout: post
published: false
title: ' Wrangling Docker Containers using Rancher (man I need some huevos rancheros)'
subtitle: playing with Rancher server on my Macbook Pro
image: 'https://blog.docker.com/media/2015/06/rancher-docker.png'
---

![Rancher plays nice with Docker Windows Containers](https://blog.docker.com/media/2015/06/rancher-docker.png)

This week has been fairly mellow, so I decided to take on another learning task. But first, what is Rancher?

>Rancher is an open source software platform that enables organizations to run containers in >production. With Rancher, organizations no longer have to build a container services platform >from scratch using a distinct set of open source technologies. Rancher supplies the entire >software stack needed to manage containers in production.

### Why Rancher may be useful...
Once you get past the "how do I create, access and tear down" docker containers, you need to start thinking of a way to keep things in order when going to production - or even on staging and testing environments.  This is where Rancher comes in:
	
* Infrastructure Orchestration
* Container Orchestration & Scheduling
* Application Catalog
* Enterprise-Grade Control

![Rancher architecture](https://docs.rancher.com/img/rancher/rancher_overview_2.png)
 
### My Objective 
Since I work on my Macbook Pro every single freaking day, I wanted to ensure I can play with containers both on Windows and Linux.  To give you a visual of what my current setup looks like, take a look at the image below.
    
![Development environment architecture](https://github.com/SharePointOscar/docker-windows-box/raw/master/images/docker-windows-box.png)
		_[image credit @stefscherer]_
    
I wanted to see how easy it is to spin up the server and create stacks on both Linux and Windows.  And so I ventured into creating my Windows Server 2016 box using @stefscherer's repo found [here](https://github.com/StefanScherer/docker-windows-box "Windows Box")

