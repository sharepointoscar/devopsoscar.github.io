---
title: Add The SharePoint 2013 Geolocation Column to a Content Type
layout: post
---

Quick Tip – The PowerShell code below adds it as a **Site Column,** once you do that  navigate to your custom Content Type and **add it from existing site columns**.

{% highlight powershell %}
Add-PSSnapin Microsoft.SharePoint.Powershell -ErrorAction SilentlyContinue

$fieldXml = “&lt;Field Type=’Geolocation’ DisplayName=’My Location’ /&gt;”

$web = Get-SPWeb $webUrl
$fieldName = $web.Fields.AddFieldAsXml($fieldXml)
$web.Update()

{% endhighlight %}

&nbsp;

Cheers,
  
Oscar