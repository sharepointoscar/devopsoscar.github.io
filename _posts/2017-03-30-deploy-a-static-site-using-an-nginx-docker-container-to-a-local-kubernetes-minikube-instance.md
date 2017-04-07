---
layout: post
published: false
title: Deploy a simple static site using NGINX to a local Kubernetes Minikube instance - Part 1
subtitle: A simple scenario to get acquainted with Kubernetes Minikube installed on your Macbook Pro (OS X)
image: https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSznYN_a65qO0L4mqFU3FUM4amxZMEDrI5zYY2PmYXonWM1g8br
tags:
- Kubernetes
- Minikube
- OS X
- NGINX Container

---

<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33yDLSUbRWALKwQSsjjbDlZu7J8ZTv8t-exve828tfYuXAbQZ7Q">
</p>

# Introduction
This is Part 1 of 2 on a simple scenario that gets a little more complex and in-depth on using Kubernetes Minikube to deploy a website hosted on NGINX locally.

I do not go into details on installing or [what is Kubernetes Minikube](https://kubernetes.io) or provide exhaustive details on using the official NGINX Docker image, you can go [here](https://blog.docker.com/2015/04/tips-for-deploying-nginx-official-image-with-docker/) for that. The Linux Foundation also has a great course [here](https://training.linuxfoundation.org/linux-courses/system-administration-training/kubernetes-fundamentals).  Lastly,
  [Romin](https://rominirani.com/tutorial-getting-started-with-kubernetes-on-your-windows-laptop-with-minikube-3269b54a226) has a nice intro post if you are using Windows.

This post focuses on quickly deploying a Service on Minikube by using a Docker Image I built (you could use any available images on Docker Hub).  Then exploring the **Kubernetes Dashboard** and accessing the website via your browser on the host.

**Part 2** will focus on scaling the website by using a YAML file to specify your deployment and service

# About Kubernetes Minikube
Kubernetes is a production grade open source orchestration system used to deploy, scale and manage containerized applications.  

Minikube allows you to run Kubernetes locally and play with it.  Here is a brief description from the Github repo.

>Minikube is a tool that makes it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM on your laptop for users looking to try out Kubernetes or develop with it day-to-day.


Minikube runs on a local Linux VM - in my case I use VirtualBox to host the Linux box as shown below

![Herein lies pure awesomeness - Kubernetes Minikube](http://i.imgur.com/qEUJB1U.png)

### An Abstract View of Kubernetes

![Kubernetes Architecture Abstraction Details](http://k8s.info/resources/cheatsheet/k8s-cheatsheet-abstractions-details.png)
*[image credit: [K8s](http://k8s.info/cs.html#ao)]*

As you can see there are many components that Kubernetes is comprised of, including Service, Pod, Labels, Proxy, Nodes etc.  


# Getting Started
To get started, you will need to obtain the Kubernetes Minikube repo and install the software as follows.  Note that this uses sudo, and you can remove that if you plan on adding the binary to your path manually.

{% highlight bash %}
  curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.17.1/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
{% endhighlight %}

### Testing your setup
To ensure you are ready to rock-n-roll, let's start minikube and retrieve all nodes (there is only one for now).  Note that the `Kubectl` CLI tool is used to manage the cluster (run containers, create services, deployments, monitoring etc).

{% highlight bash %}

# start minikube
sharepointoscar@OSCARs-MacBook-Pro-2~                                                                                                                 
> $ minikube start
Starting local Kubernetes cluster...
Starting VM...
SSH-ing files into VM...
Setting up certs...
Starting cluster components...
Connecting to cluster...
Setting up kubeconfig...
Kubectl is now configured to use the cluster.

# Get nodes
> $ kubectl get nodes
NAME       STATUS    AGE
minikube   Ready     1d

sharepointoscar@OSCARs-MacBook-Pro-2~ > $

{% endhighlight %}

Now that we have Kubernetes Minikube running locally, we want to configure it to use Docker Hub registry to pull images (both private and public).

### Using The Docker Hub Registry to pull images
We will add the Docker Hub registry to the default service account.  First, we need to create the registry entry.

#### Create the Docker Hub Registry entry


#### Modify The Default Service Account to use our new Registry
we create a YAML file and that looks like this

{% highlight yaml %}
# The yaml file
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: 2017-03-30T04:36:20Z
  name: default
  namespace: default
  selfLink: /api/v1/namespaces/default/serviceaccounts/default
  uid: 6bd2e599-1502-11e7-9a0e-080027e762a7
secrets:
- name: default-token-r5jv1
imagePullSecrets:

#this is the name of my custom registry entry previously created
- name: dockerhubregistry
{% endhighlight%}

Then we need to actually tell Kubernetes to use the new settings, to do that we execute the following.

{% highlight bash %}
kubectl replace serviceaccount default -f ./sa.yaml
{% endhighlight%}

#### Add ImagePullSecrets to service account

# Prepare Custom NGINX Image  
For my scenario, I simply wanted to pre-load the NGIX image with my static site content.  However, you can also mount the ` /usr/share/nginx/html ` and make changes to your site, which is common.

### The Dockerfile
The Dockerfile I created uses the base NGINX image, and adds my site content as shown below.

{% highlight yaml %}
FROM nginx

COPY _site /usr/share/nginx/html

VOLUME /usr/share/nginx/html

VOLUME /etc/nginx

{% endhighlight %}


# Create Service Via Kubernetes Dashboard

# Access Your Site Via Browser

# Conclusion
