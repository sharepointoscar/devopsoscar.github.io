---
title: Deploying a Dockerized NodeJS App to Azure Cloud Service
author: SharePointOscar
subtitle: Just another way to deploy a Dockerized app quickly...
layout: post
image: https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/17361795_1604034676277959_9035342015129433076_n.jpg?oh=85c21205d7bc009ee08cda62c5c0804b&oe=59256933
share-img: https://scontent-sjc2-1.xx.fbcdn.net/v/t1.0-9/17361795_1604034676277959_9035342015129433076_n.jpg?oh=85c21205d7bc009ee08cda62c5c0804b&oe=59256933
---

![Azure Loves Docker](https://scontent-sjc2-1.xx.fbcdn.net/v/t31.0-8/17358848_1604020692946024_1164554351393225723_o.jpg?oh=cdb5d7d6c3bd9ce8e20b019daa65d8f6&oe=596C6F8F)



## On Orchestration and Scalability
Using Azure Docker Container Services is a great approach.  I mean ultimately you want to orchestrate and scale your container services and leverage DC/OS, Docker Swarm or even Kubernets.  For the app I needed to deploy, we did not need high optimization and scalability, such as the one Azure Container Services provides.

So what other option do we have?  

Well, I recently spoke to a Microsoft buddy, and it looks like the [App Service on Linux](https://docs.microsoft.com/en-us/azure/app-service/app-service-linux-readme) is still in Public Preview as of today.  I personally want to avoid all the errors and struggles that come with using a service or product that is not ready.

Therefore, I chose to deploy a docker machine using a Linux VM, within an Azure Resource Group and a static ip address, as my app talks to a third party REST API that has whitelisted IP addresses as one layer of security.

## Step 1 - Create a Docker Machine in Azure (Cloud Service)
For this scenario, we will deploy a test environment, and the first step is to build out our environment where our container will live.

Only one parameter is really needed to create the docker machine, and that is the ***Azure subscription Id***.  However, the optional parameters were helpful in my scenario to set a static ip for example, and to drop my resources within a specific region to keep things organized, as well as specifying the port to access the app.

*NOTE:* Because I specified the port, the ***Network Security Group*** or firewall will have the port rule created for me automatically.

![Azure Resources](https://scontent-sjc2-1.xx.fbcdn.net/v/t31.0-8/17349683_1604020682946025_3761303370454171186_o.jpg?oh=c30363dab61776d024bed17b86b904c7&oe=5968DF98)

And here is the command that makes that magic happen.
{% highlight bash%}
docker-machine create -d  azure --azure-subscription-id "YOUR_SUBSCRIPTION_ID" \
--azure-resource-group "SPOscarRGroup" --azure-vnet "SPOscarRGroupvNeT" \
--azure-static-public-ip --azure-location "westus" --azure-open-port 1337 sposcarapp

{% endhighlight %}

Once you execute this command, you will see an authentication screen via the browser and enter the code that is generated as shown below.

![Generated auth code](https://scontent-sjc2-1.xx.fbcdn.net/v/t31.0-8/17359369_1604020739612686_7386190638460095629_o.jpg?oh=ade121878717d6fd436231cb0536b5f0&oe=592A9DD8)

going to the browser, you see something similar to this

![Enter Auth Code](https://scontent-sjc2-1.xx.fbcdn.net/v/t31.0-8/17358763_1604020759612684_321104889609942288_o.jpg?oh=68c74d1b60df2445f9e274c9f154ea28&oe=59571F2A)

this triggers the creation of all resources as shown below

![Creating Resources](https://scontent-sjc2-1.xx.fbcdn.net/v/t31.0-8/17359184_1604020806279346_8533171345378211530_o.jpg?oh=8309ac81f68362b8f653e0ecd9ca129e&oe=592510E7)

You will notice that now we see my Azure docker machine as well as my local one called 'default'.  Whenever I need to interact with either, I will need to set the env on my terminal.  For example, if I wanted to interact with the Azure docker machine, I would execute the following on my terminal to ensure it runs my commands against it.

{% highlight bash%}
  eval $(docker-machine env sposcarapp)
{% endhighlight %}

Once I do that, I can find out what containers are running by executing the command as follows

{% highlight bash%}
  docker ps
{% endhighlight %}

I can also ssh into the docker machine by executing the following command
{% highlight bash%}
  docker-machine ssh sposcarapp
{% endhighlight %}

All goes well, you will see a response similar to the one below

![SSH to Docker Machine](https://scontent-sjc2-1.xx.fbcdn.net/v/t31.0-8/17358806_1604020746279352_7316619885580868547_o.jpg?oh=9d819a6fe7f709d20646b27b64e0cf9f&oe=592C78D1)

and of course if I want to destroy the machine, I can execute the following.  This destroys all all resources on Azure and local references to it.

{% highlight bash%}
  docker-machine rm sposcarapp
{% endhighlight %}

all goes well, you will see output similar to the one below
![destroy Azure Resoruces](https://scontent-sjc2-1.xx.fbcdn.net/v/t31.0-8/17349671_1604020816279345_4159618199419196509_o.jpg?oh=cd159a5a5f3317a3b715d5f3ab24ad37&oe=595C3568)

## Step 2 - Deploying the NodeJS App
So far, we've seen how to deploy the docker machine.  But we have not deployed any containers.

### Building the App using Dockerfile and docker-compose
First of all, as with any app you wish to dockerize, you must create a Dockerfile, I won't go into details here as there are many other posts that discuss this in-depth.  

You also want to use Docker Compose to manage and deploy services which are comprised of multiple components such as a Webserver, Database etc.

#### The Dockerfile
Here is what the Dockerfile looks like.  This file is within the root of the app which itself is under source control on Github.  Note that I base my image from a NodeJS version.

{% highlight yml %}

# manually build Docker image
# ➔ docker build -t sharepointoscar/mynodejsapp:beta  -f Dockerfile --build-arg NODE_ENV=development .
#
#
# manually run image using port on any ip address on local host.
# using the image ID as last parameter
#
# docker run --rm -it -p 1337:1337 17e7f6e16553
#
#
FROM node:4.1.2

MAINTAINER Oscar Medina <me@sharepointoscar.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Set required environment where app will run
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
RUN echo ${NODE_ENV}


RUN npm install -g grunt-cli
RUN npm install -g bower


COPY package.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

#RUN bower install then  grunt build
RUN bower install
RUN grunt build

EXPOSE 1337

CMD [ "npm", "start" ]

{% endhighlight %}

#### The Docker Compose file (test environment)
I use a different docker compose file for test environment.  In the test environment, I have an entry for a database service, for production, we use a hosted MongoDB service so we indicate the URI vs spinning up a MongoDB container.

{% highlight yaml %}

# To run our test environment, execute the following command.
# -p is used for unique project name
# -d is used to run in background
# docker-compose -f docker-compose.test.yml -p LiteratureTestEnvironment up -d
#
version: '3'
services:
  db:
    container_name: MongoDB
    image: mongo:3.2.12
    ports:
        - '27017:27017'
    volumes:
      - /srv/docker/mongodb:/var/lib/mongodb
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image:  literatureapp:test
    container_name: LiteratureNodeJSApp
    environment:
      - NODE_ENV=development
      - MONGODB_HOST=192.168.99.101
      - MONGODB_PORT=27017
    ports:
      - '1337:1337'
    depends_on:
        - db


{% endhighlight %}

The following command builds our services specified in the test yaml file.  We bring up the services and execute in the background with the -d parameter.

{% highlight shell%}
  docker-compose -f docker-compose.test.yml -p LiteratureAppEnvironment up -d
{% endhighlight %}

At this point, the Docker container has been deployed to our Docker Machine.  Because we have a static IP address, we are able to access the app via the browser on port 1337 based on the docker compose file and the firewall inbound rule that was created when we executed the docker create command.

Azure is slowly becoming a great place to deploy Docker Containers, it can only get better!

Hope this helps,
@SharePointOscar
