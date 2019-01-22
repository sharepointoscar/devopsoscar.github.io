---
layout: post
published: true
title: Incorporate Compliance Testing Using In-Spec by Chef
subtitle: Keeping Docker Images, Vagrant VMs, AWS EC2 Instances in Compliance using In-Spec by Chef!
---
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