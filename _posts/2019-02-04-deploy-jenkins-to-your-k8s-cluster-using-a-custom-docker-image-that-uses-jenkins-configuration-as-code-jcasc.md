---
layout: post
published: true
title: >-
  Deploy Jenkins to your K8s cluster using a custom Docker image that uses  
  Jenkins Configuration as Code (JCasC)
subtitle: Playing with Jenkins Configuration as Code locally
image: 'https://jenkins.io/images/logos/JCasC/JCasC.png'
tags:
  - Docker
  - CI/CD Pipeline
  - Jenkins
  - JCasC
  - K8s
  - GKE
---


![Jenkins Configuration as Code](https://www.praqma.com/images/stories/start-jcasc/jenkins-orange.jpg)


# Overview
Deploying Jenkins is easy these days.  However, configuring and saving the configuration has not been easy, especially since there is a lot of manual config via the UI. This is far more onerous when dealing with multiple instances of Jenkins which many environments actually have.

Jenkins Configuration as Code is the next big thing.  This repository helps you get started quickly.

## GitHub Repo
The source code is available at: https://github.com/SharePointOscar/JCasC 

## About JCasC
There is a vibrant and active community for `JCasC`.

View the [wiki](https://wiki.jenkins.io/display/JENKINS/configuration+as+code+plugin) page. See [presentation slides](https://docs.google.com/presentation/d/1VsvDuffinmxOjg0a7irhgJSRWpCzLg_Yskf7Fw7FpBg/edit?usp=sharing) from Jenkins World 2018.

Join the Jenkins Configuration as Code (JCasC) office hours meeting scheduled for every second Wednesday. Use the Hangout on Air link from our [Gitter](https://gitter.im/jenkinsci/configuration-as-code-plugin) chat channel. As an alternative, use the link from the [invitation](https://calendar.google.com/event?action=TEMPLATE&tmeid=MmdwdTE1cTFvaGw1NGUycGxqdWUwcXExaWFfMjAxODA3MjVUMDcwMDAwWiBld2VAcHJhcW1hLm5ldA&tmsrc=ewe%40praqma.net&scp=ALL). See previous [meeting minutes](https://docs.google.com/document/d/1Hm07Q1egWL6VVAqNgu27bcMnqNZhYJmXKRvknVw4Y84/edit?usp=sharing)

# What you can do with this Repository

* Deploy Jenkins using JCasC on your laptop running Docker (just for testing, not ideal)

* Deploy Jenkins using JCasC to K8s


# The Jenkins Configurations
There are two key configurations I decided to incorporate as a starting point, to demonstrate JCasC works:

* **Branding Jenkins** - using the Simple Theme Plugin and specifying a Theme   because who likes the default UI???

* **Configuring Jenkins to use OAuth against GitHub** - Most companies do not use the Jenkins db for users, that is just not possible in the Enterpise.


# Assumptions
* You have `Docker` working locally
* You have `kubectl` and `Minikube` working locally or a cluster in GKE and you're authenticated via the `gcloud` CLI.

# Build the Jenkins Image & Push to Registry
Most of the `YAML` files including the `docker-compose` use an image.  This image needs to be built and pushed to the registry, I use `Docker Hub`.  The image we discuss on this post is `sharepointoscar/jcasc:v5` which is available to you as you follow this post.

## Building Image Using Docker CLI
Once you've cloned the GitHub repository, and you are on the root of the project on the terminal, build the image, execute this command in the root of this repo as follows:

**NOTE** you can use the `sharepointoscar/jcasc:v5` image already in place in Docker Hub.  But if you want to make your own, then please change the username/jcasc:version accordingly


```bash
docker build -t sharepointoscar/jcasc:v5 ./master
```
Let's take a look at what images are now available to us.

```bash
docker images

REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
sharepointoscar/jcasc   v5                  f2458564a1b7        21 hours ago        755MB
jenkinsxio/jenkinsx     latest              8816714cda1f        5 days ago          588MB
praqma/jenkins4casc     1.3-latest          b05ed588ccfb        2 months ago        704MB
walkerlee/nsenter       latest              b3e591c9273c        16 months ago       582kB
```
Ok it looks like our image built succesfully, lets push the image to the registry. I use Docker Hub.

```bash
docker push sharepointoscar/jcasc:v5
```

Once you are done, you will then edit the proper files such as the `docker-compose.yaml`, depending on where you plan to deploy Jenkins, and reference said image and version.

# Protecting Secrets
For the purpose of quickly safe-guarding the Github **ClientID** and **ClientSecret** values, I've used a `.env` file which is **not** checked into source control, you'll have to create one.

**NOTE** The `.env` file values should be filled in prior to using the solution.  

Here is a snippet, replace the placeholder text with real values. You typically get this from creating an app in GitHub.

```env
clientID=<CLIENTID>
clientSecret=<CLIENTSECRET>
```
# Deploying JCasC to GKE
Assuming you have a cluster setup, we are ready to quickly deploy our custom Jenkins image to GKE.

## Deploy all artifacts to GKE
To deploy all of our artifacts, we simply execute the following command from the root of the GitHub repo:

```bash
>$ kubectl create -Rf ./gke
```

This will create our namespace, services, persistent volume claim, and storage class amonst other artifacts.

Next, we need to create our `ConfigMap` which contains our `jenkins.yaml` configuration file, which the container reads as it is mounted as a volume.

```bash
# creating the jcasc-configmap
kubectl create configmap jcasc-configmap --from-file=./jenkins.yaml --namespace jcasc
```
Lastly, we need the GitHub app OAuth credentials stored as a `secret`, lets create it in our `jcasc` namespace as all resources are created in said namespace.

```bash
kubectl create secret generic github-auth --from-env-file=.env --namespace jcasc
```
Typically, the workload will be up and running at this point.  But if it not, I usually redeploy by executing the following command:

```bash
kubectl apply -f gke/gke-jenkins-deployment.yaml 
```

# Deploy Jenkins using JCasC on your laptop running Docker

Perhaps, this is one of the easiest and fastest method.

* Edit `docker-compose.yaml` and use the image we just built and pushed to the registry.  Since we are configuring Jenkins to use GitHub as an authentication provider, be sure you've created an `.env` file and added the two variables and values.

* Ensure you've modified the jenkins.yaml - You can leave it as is as well, to quickly see this in action, then make incremental modifications to experiment.

Now let's run the following command on the root of our repository.

```bash
docker-compose up
```

Note that you can use `docker-compose config` to view the configuration including the secret values to ensure they are picked up from the .env file.

# Deploying Jenkins JCasC To Minikube 
Minikube is our local K8s cluster, which allows us to develop specs locally and test them.

All of our deployment artifacts reside within the `minikube` folder of the repo.

Let's create all of our artifacts with one command. 

```bash
>$ kubectl apply -Rf ./minikube
namespace "jcasc" created
deployment "jenkins" created
service "jenkins" created
persistentvolumeclaim "jenkinshome-pv-claim" created

```

## Creating Secrets and ConfigMap
The Jenkins deployment will not work until its dependencies are created.  It depends on the `github-auth` secret and configmap which contains the `jenkins.yaml` configuration needed.  So let's create that now.

### Create ConfigMap
We need to make the `jenkins.yaml` file available to our container.  

```shell
# creating the jcasc-configmap
kubectl create configmap jcasc-configmap --from-file=./jenkins.yaml --namespace jcasc

```
**NOTE:** There are more appropriate ways to deploy and manage secrets, this is is a not the best way, and I recommend looking into `HashiCorp Vault` or using a cloud native key/secret management service.

### Create Secrets

```shell

# these are your github  app auth credentials, so that Jenkins uses this for authentication
# this secret is used by the jenkins.yaml file.  Our deployment mounts secrets as volumes including this one. see minikube/jenkins-deployment.yaml

# Quick and dirty
kubectl create secret generic github-auth --from-literal=clientID='<YOUR-CLIENT-ID>' --from-literal=clientSecret='<YOUR-CLIENT-SECRET>' --namespace jcasc

# Or if you have a .env file, you can create it as such (I am using this approach for now)
kubectl create secret generic github-auth --from-env-file=.env --namespace jcasc
```
### Access your Jenkins Instance
Since we deployed to `minikube`, we use its ip address and port assigned via the service we deployed.

In my case it is
```bash
>$ minikube ip
192.168.64.12

>$ kubectl get services -n jcasc
NAME      TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                        AGE
jenkins   NodePort   10.111.157.32   <none>        80:30537/TCP,50000:31965/TCP   16h
```

By combining the minikube ip plus the ui port, like so `http://192.168.64.12:30537` I am able to access Jenkins.

## Changing Configuration and Reloading it

It is possible to make changes to a configuration, but most of the time you want to version it.  Assuming you do that, and need to reload the latest configuration, here is how you can reload it.

In my case, I go to the `http://192.168.64.12:30537/configuration-as-code/` page  and click on the `Reload existing configuration` button.  You hould then see your changes take effect in a few seconds.

In my case, I changed the theme to another url in the `jenkins.yaml` and it showed me the new one!

Simple but very powerful way of configuring Jenkins!

# Conclusion

Jenkins Configuration as Code is maturing rapidly and we can expect rapid adoption of this technique in the near future.  We can then version our Jenkins Configuration and incorporate it into our CI/CD pipelines.

Thanks to the folks behind this, who have done all of this work thus far.

* Ewelina Wilkosz/Praqma - https://twitter.com/ewelinawilkosz?lang=en
* Nicolas De Loof/CloudBees - https://twitter.com/ndeloof

My next task will be to try and incorporate this `JCasC` Image and spinning up a `Jenkins X` instance, more soon.
