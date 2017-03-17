---
title: Extracting private key and cert from a PFX file
author: SharePointOscar
subtitle: Ever need to extract a private key from a PFX file? Here is how
layout: post
image: http://www.markneustadt.com/wp-content/uploads/2017/01/data-encryption.jpg
share-img: http://www.markneustadt.com/wp-content/uploads/2017/01/data-encryption.jpg
---

This is mainly a note for myself.  Ran into a scenario where I needed to extract the private key from a PFX file, this is the command to run (on OS X).

{% highlight bash%}
  openssl pkcs12 -in  file.pfx -nocerts -out file.pem -nodes
{% endhighlight %}

Now extract the certificate
{% highlight bash%}
  openssl pkcs12 -in  file.pfx -nokeys -out certificate.crt
{% endhighlight %}
