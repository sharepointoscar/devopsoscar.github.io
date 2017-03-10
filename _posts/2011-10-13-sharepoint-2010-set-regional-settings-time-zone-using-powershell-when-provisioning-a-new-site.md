---
id: 53
title: SharePoint 2010 – Set Regional Settings Time Zone using PowerShell when Provisioning a New Site
date: 2011-10-13T19:10:30+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=53
permalink: /2011/10/13/sharepoint-2010-set-regional-settings-time-zone-using-powershell-when-provisioning-a-new-site/
categories:
  - PowerShell
  - SharePoint 2013
---
<!-- Social Sharing Toolkit v2.0.4 | http://www.marijnrongen.com/wordpress-plugins/social_sharing_toolkit/ -->

As you probably already know SharePoint 2010 has added functionality when dealing with multiple Time Zones.  There are two areas aside form the Web Application level where a user can set this preference.  The first is managed at the site level via the **Site Settings** > **Regional Settings** page.

The second is managed at the user level via the **My Regional Setting**s page accessible via the User actions menu where a user can choose a Region other than the one configured at the Site  Level.

So this is easily configured via the browser when you do not have a plethora of sites to provision, but  most projects I work on are fairly large – and many of these are regional implementations, so we typically have scripts to handle large intranet deployments.  So what scripting language do I use?  Why PowerShell of course, and hey the <a title="@ScriptingGuys" href="https://twitter.com/@ScriptingGuys" target="_blank">@ScriptingGuys</a> would approve 🙂

With PowerShell you can easily provision SharePoint sites programmatically and configure many of their properties!  One of the properties that we are setting for both MySites (via a **Provisioning Receiver**) and Location-based sites is the Regional Settings.

Here is a code snippet that allows you to set the Time Zone when provisioning a sub-site based on the Time Zone ID desired.

<div class="csharpcode-wrapper">
  <pre class="brush:ps">$web = New-SPWeb -url ($intraneturl + "/NewDehli") -name "New Dheli"  -Template ($PubPortalGenericTemplate) $web.RegionalSettings.TimeZone.ID = 23 # (UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi $web.Update()</pre>
  
  <p>
    &nbsp;
  </p>
  
  <pre class="csharpcode" id="codeSnippet"></pre>
  
  <p>
    &nbsp;
  </p>
</div>

<div class="csharpcode-wrapper">
  Enjoy,<br /> Oscar
</div>

<div class="csharpcode-wrapper">
</div>