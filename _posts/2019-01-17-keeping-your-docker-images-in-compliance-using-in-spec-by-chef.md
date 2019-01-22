---
layout: post
published: true
title: Compliance as Code Using In-Spec by Chef
subtitle: Keeping Docker Images, Vagrant VMs, AWS EC2 Instances in Compliance using In-Spec by Chef!
image: 'https://sdtimes.com/wp-content/uploads/2018/02/inspec_logo-490x489.png'
tags:
- Container Management
- CI/CD Pipeline
- Compliance as Code
- In-Spec
- Chef
---

![In-Spec by Chef](data:image/png;base64,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)

# Overview
With Docker Images now being the gold standard for containarization and Microservices. We must start looking at maturing our CI/CD pipelines and take into account compliance by injecting compliance checks into our dockerized apps.  But, how may we do that?

# Introducing Why In-Spec by Chef
Not only is In-Spec open source, it is extremely powerful and can help you get Compliance tests into your CI/CD pipeline.  Straight from the site:

> InSpec is a free and open-source framework for testing and auditing your applications and infrastructure. InSpec works by comparing the actual state of your system with the desired state that you express in easy-to-read and easy-to-write InSpec code. InSpec detects violations and displays findings in the form of a report, but puts you in control of remediation  
> -inspec.io

# Scenario

Let's say you've got a few Docker Containers that are instantiated from Images that are pulled from hub.docker.io  

However, many times we may find ourselves using Docker Images that are not tested for vulnerability or compliance. 

This becomes very important especially if we work at an enterprise environment that is highly regulated such as healthcare of finance.

# Solution
One approach we can take (assuming using Docker Images from Docker Hub is acceptable), is to run CIS Benchmarks and DevSec Profiles against the image to ensure compliance.


# Executing DevSec NGINX Baseline In-Spec Profile Against Docker Container

So how do we check a Container?  We use the In-Spec Profiles available to us.  

## Find the In-Spec Profile Needed
For example, we can check which ones are available by executing the following command which yields a large list of profiles, but the one we are using is shown below.

```bash
> $ inspec supermarket profiles

== Available profiles:

...
 * DevSec Nginx Baseline dev-sec/nginx-baseline 
...
```
## Get a Docker Image from Docker Hub
For this post, I have a common static site I use, which has a nice Twitter Bootstrap frontend, so I will use that.  It is also based from NGINX.     I pull it using the following command:

### Pull Image From Docker Hub
```bash
docker pull sharepointoscar/mystaticsite:v5
```
### Create Container

```bash
docker run --rm -d --name MyStaticSite -p 8080:80/tcp sharepointoscar/mystaticsite:v5
```
When we run this command, we can get the **Container ID**, which we will need to run the In-Spec Profile.

```bash
> $ docker ps                                                          
CONTAINER ID        IMAGE                             COMMAND                  CREATED             STATUS              PORTS                  NAMES
173d0819f326        sharepointoscar/mystaticsite:v5   "nginx -g 'daemon of…"   21 minutes ago      Up 21 minutes       0.0.0.0:8080->80/tcp   MyStaticSite
```
## Execute The NGINX Baseline In-Spec Profile
Now that we know which profile we will use, we want to execute it against our Docker Image.

Now that we have the Container ID from the previous command, we can execute the following to run our NGNIX baseline check 
```bash
inspec supermarket exec dev-sec/nginx-baseline -t docker://173d0819f326
```

NOTE that we did not need to download the In-Spec profile, we simply provided the name to the `inspec` command.  

Based on the results, we can see our NGINX Container has a lot of problems.


```bash
Profile: DevSec Nginx Baseline (nginx-baseline)
Version: 2.2.0
Target:  docker://173d0819f326313757848014ae1c4d4117c5e70e57c95af97e4612c6f7fefb7c

  ×  nginx-01: Running worker process as non-privileged user (1 failed)
     ✔  User www-data should exist
     ×  Parse Config File /etc/nginx/nginx.conf user should eq "www-data"

     expected: "www-data"
          got: "nginx"

     (compared using ==)

     ✔  Parse Config File /etc/nginx/nginx.conf group should not eq "root"
  ×  nginx-02: Check NGINX config file owner, group and permissions. (1 failed)
     ✔  File /etc/nginx/nginx.conf should be owned by "root"
     ✔  File /etc/nginx/nginx.conf should be grouped into "root"
     ×  File /etc/nginx/nginx.conf should not be readable by others
     expected File /etc/nginx/nginx.conf not to be readable by others
     ✔  File /etc/nginx/nginx.conf should not be writable by others
     ✔  File /etc/nginx/nginx.conf should not be executable by others
  ×  nginx-03: Nginx default files (1 failed)
     ×  File /etc/nginx/conf.d/default.conf should not be file
     expected `File /etc/nginx/conf.d/default.conf.file?` to return false, got true
     ✔  File /etc/nginx/sites-enabled/default should not be file
  ×  nginx-04: Check for multiple instances
     ×  Command: `ps aux | egrep "nginx: master" | egrep -v "grep" | wc -l` stdout should match /^1$/
     expected "0\n" to match /^1$/
     Diff:
     @@ -1,2 +1,2 @@
     -/^1$/
     +0

  ×  nginx-05: Disable server_tokens directive
     ×  Parse Config  server_tokens should eq "off"

     expected: "off"
          got: nil

     (compared using ==)

  ×  nginx-06: Prevent buffer overflow attacks (4 failed)
     ×  Parse Config  client_body_buffer_size should eq "1k"

     expected: "1k"
          got: nil

     (compared using ==)

     ×  Parse Config  client_max_body_size should eq "1k"

     expected: "1k"
          got: nil

     (compared using ==)

     ×  Parse Config  client_header_buffer_size should eq "1k"

     expected: "1k"
          got: nil

     (compared using ==)

     ×  Parse Config  large_client_header_buffers should eq "2 1k"

     expected: "2 1k"
          got: nil

     (compared using ==)

  ×  nginx-07: Control simultaneous connections (2 failed)
     ×  Parse Config  limit_conn_zone should eq "$binary_remote_addr zone=default:10m"

     expected: "$binary_remote_addr zone=default:10m"
          got: nil

     (compared using ==)

     ×  Parse Config  limit_conn should eq "default 5"

     expected: "default 5"
          got: nil

     (compared using ==)

  ×  nginx-08: Prevent clickjacking
     ×  Parse Config  add_header should include "X-Frame-Options SAMEORIGIN"
     expected nil to include "X-Frame-Options SAMEORIGIN", but it does not respond to `include?`
  ×  nginx-09: Enable Cross-site scripting filter
     ×  Parse Config  add_header should include "X-XSS-Protection \"1; mode=block\""
     expected nil to include "X-XSS-Protection \"1; mode=block\"", but it does not respond to `include?`
  ×  nginx-10: Disable content-type sniffing
     ×  Parse Config  add_header should include "X-Content-Type-Options nosniff"
     expected nil to include "X-Content-Type-Options nosniff", but it does not respond to `include?`
  ×  nginx-12: TLS Protocols (5 failed)
     ×  Parse Config  ssl_protocols should eq "TLSv1.2"

     expected: "TLSv1.2"
          got: nil

     (compared using ==)

     ×  Parse Config  ssl_session_tickets should eq "off"

     expected: "off"
          got: nil

     (compared using ==)

     ×  Parse Config  ssl_ciphers should eq "'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-C...CDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256'"

     expected: "'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-C...CDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256'"
          got: nil

     (compared using ==)

     ×  Parse Config  ssl_prefer_server_ciphers should eq "on"

     expected: "on"
          got: nil

     (compared using ==)

     ×  Parse Config  ssl_dhparam should eq "/etc/nginx/dh2048.pem"

     expected: "/etc/nginx/dh2048.pem"
          got: nil

     (compared using ==)

  ×  nginx-13: Add HSTS Header
     ×  Parse Config  add_header should include "Strict-Transport-Security max-age=15768000"
     expected nil to include "Strict-Transport-Security max-age=15768000", but it does not respond to `include?`
  ↺  nginx-14: Disable insecure HTTP-methods
     ↺  Skipped control due to only_if condition.
  ×  nginx-15: Content-Security-Policy
     ×  Parse Config  add_header should include "Content-Security-Policy \"script-src 'self'; object-src 'self'\""
     expected nil to include "Content-Security-Policy \"script-src 'self'; object-src 'self'\"", but it does not respond to `include?`
  ↺  nginx-16: Set cookie with HttpOnly and Secure flag
     ↺  Skipped control due to only_if condition.
  ×  nginx-17: Control timeouts to improve performance (4 failed)
     ×  Parse Config  keepalive_timeout should eq "5 5"

     expected: "5 5"
          got: "65"

     (compared using ==)

     ×  Parse Config  client_body_timeout should eq "10"

     expected: "10"
          got: nil

     (compared using ==)

     ×  Parse Config  client_header_timeout should eq "10"

     expected: "10"
          got: nil

     (compared using ==)

     ×  Parse Config  send_timeout should eq "10"

     expected: "10"
          got: nil

     (compared using ==)



Profile Summary: 0 successful controls, 14 control failures, 2 controls skipped
Test Summary: 7 successful, 25 failures, 2 skipped
```
We get a nice summary of our test, boy we have some work to do as 25 compliance tests failed!  Luckly, 7 were successfull :)

## Running DevSec Linux Baseline In-Spec Profile Against our Docker Container

Recall that we can find all profiles by executing:
```bash
inspec supermarket profiles
```
Another profile available to us that can help is the DevSec Linux Baseline `dev-sec/linux-baseline`, so we will use this one for our Docker Image, as NGINX is based on Linux.

To run it, we simply execute the following command:

```bash
inspec supermarket exec dev-sec/linux-baseline -t docker://173d0819f326
```

The results of running our `dev-sec/linux-baseline` profile yields the following results

```bash
Profile: DevSec Linux Security Baseline (linux-baseline)
Version: 2.2.2
Target:  docker://173d0819f326313757848014ae1c4d4117c5e70e57c95af97e4612c6f7fefb7c

  ✔  os-01: Trusted hosts login
     ✔  File /etc/hosts.equiv should not exist
  ✔  os-02: Check owner and permissions for /etc/shadow
     ✔  File /etc/shadow should exist
     ✔  File /etc/shadow should be file
     ✔  File /etc/shadow should be owned by "root"
     ✔  File /etc/shadow should not be executable
     ✔  File /etc/shadow should not be readable by other
     ✔  File /etc/shadow group should eq "shadow"
     ✔  File /etc/shadow should be writable by owner
     ✔  File /etc/shadow should be readable by owner
     ✔  File /etc/shadow should be readable by group
  ✔  os-03: Check owner and permissions for /etc/passwd
     ✔  File /etc/passwd should exist
     ✔  File /etc/passwd should be file
     ✔  File /etc/passwd should be owned by "root"
     ✔  File /etc/passwd should not be executable
     ✔  File /etc/passwd should be writable by owner
     ✔  File /etc/passwd should not be writable by group
     ✔  File /etc/passwd should not be writable by other
     ✔  File /etc/passwd should be readable by owner
     ✔  File /etc/passwd should be readable by group
     ✔  File /etc/passwd should be readable by other
     ✔  File /etc/passwd group should eq "root"
  ✔  os-04: Dot in PATH variable
     ✔  Environment variable PATH split should not include ""
     ✔  Environment variable PATH split should not include "."
  ×  os-05: Check login.defs (3 failed)
     ✔  File /etc/login.defs should exist
     ✔  File /etc/login.defs should be file
     ✔  File /etc/login.defs should be owned by "root"
     ✔  File /etc/login.defs should not be executable
     ✔  File /etc/login.defs should be readable by owner
     ✔  File /etc/login.defs should be readable by group
     ✔  File /etc/login.defs should be readable by other
     ✔  File /etc/login.defs group should eq "root"
     ✔  login.defs ENV_SUPATH should include "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
     ✔  login.defs ENV_PATH should include "/usr/local/bin:/usr/bin:/bin"
     ×  login.defs UMASK should include "027"
     expected "022" to include "027"
     ×  login.defs PASS_MAX_DAYS should eq "60"

     expected: "60"
          got: "99999"

     (compared using ==)

     ×  login.defs PASS_MIN_DAYS should eq "7"

     expected: "7"
          got: "0"

     (compared using ==)

     ✔  login.defs PASS_WARN_AGE should eq "7"
     ✔  login.defs LOGIN_RETRIES should eq "5"
     ✔  login.defs LOGIN_TIMEOUT should eq "60"
     ✔  login.defs UID_MIN should eq "1000"
     ✔  login.defs GID_MIN should eq "1000"
  ↺  os-05b: Check login.defs - RedHat specific
     ↺  Skipped control due to only_if condition.
  ✔  os-06: Check for SUID/ SGID blacklist
     ✔  suid_check diff should be empty
  ✔  os-07: Unique uid and gid
     ✔  /etc/passwd uids should not contain duplicates
     ✔  /etc/group gids should not contain duplicates
  ✔  os-08: Entropy
     ✔  3126 should >= 1000
  ✔  os-09: Check for .rhosts and .netrc file
     ✔  [] should be empty
  ↺  os-10: CIS: Disable unused filesystems
     ↺  Skipped control due to only_if condition.
  ✔  os-11: Protect log-directory
     ✔  File /var/log should be directory
     ✔  File /var/log should be owned by "root"
     ✔  File /var/log group should match /^root|syslog$/
  ✔  package-01: Do not run deprecated inetd or xinetd
     ✔  System Package inetd should not be installed
     ✔  System Package xinetd should not be installed
  ✔  package-02: Do not install Telnet server
     ✔  System Package telnetd should not be installed
  ✔  package-03: Do not install rsh server
     ✔  System Package rsh-server should not be installed
  ✔  package-05: Do not install ypserv server (NIS)
     ✔  System Package ypserv should not be installed
  ✔  package-06: Do not install tftp server
     ✔  System Package tftp-server should not be installed
  ↺  package-07: Install syslog server package
     ↺  Skipped control due to only_if condition.
  ↺  package-08: Install auditd
     ↺  Skipped control due to only_if condition.
  ✔  package-09: CIS: Additional process hardening
     ✔  System Package prelink should not be installed
  ↺  sysctl-01: IPv4 Forwarding
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-02: Reverse path filtering
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-03: ICMP ignore bogus error responses
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-04: ICMP echo ignore broadcasts
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-05: ICMP ratelimit
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-06: ICMP ratemask
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-07: TCP timestamps
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-08: ARP ignore
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-09: ARP announce
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-10: TCP RFC1337 Protect Against TCP Time-Wait
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-11: Protection against SYN flood attacks
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-12: Shared Media IP Architecture
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-13: Disable Source Routing
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-14: Disable acceptance of all IPv4 redirected packets
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-15: Disable acceptance of all secure redirected packets
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-16: Disable sending of redirects packets
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-17: Disable log martians
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-18: Disable IPv6 if it is not needed
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-19: IPv6 Forwarding
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-20: Disable acceptance of all IPv6 redirected packets
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-21: Disable acceptance of IPv6 router solicitations messages
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-22: Disable Accept Router Preference from router advertisement
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-23: Disable learning Prefix Information from router advertisement
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-24: Disable learning Hop limit from router advertisement
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-25: Disable the system`s acceptance of router advertisement
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-26: Disable IPv6 autoconfiguration
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-27: Disable neighbor solicitations to send out per address
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-28: Assign one global unicast IPv6 addresses to each interface
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-29: Disable loading kernel modules
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-30: Magic SysRq
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-31a: Secure Core Dumps - dump settings
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-31b: Secure Core Dumps - dump path
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-32: kernel.randomize_va_space
     ↺  Skipped control due to only_if condition.
  ↺  sysctl-33: CPU No execution Flag or Kernel ExecShield
     ↺  Skipped control due to only_if condition.


Profile Summary: 15 successful controls, 1 control failure, 38 controls skipped
Test Summary: 53 successful, 3 failures, 38 skipped
```

# Conclusion

Hopefully you are able to see the value in injecting compliance tests into your CI/CD pipeline.  Although I did not show you how to specifically do that, you certainly now have an idea on what commands you might execute using `In-Spec` compliance framework.

~Oscar