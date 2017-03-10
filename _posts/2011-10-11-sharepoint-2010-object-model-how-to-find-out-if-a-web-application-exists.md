---
id: 80
title: 'SharePoint 2010 Object Model: How to find out if a Web Application exists'
date: 2011-10-11T14:00:38+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=80
permalink: /2011/10/11/sharepoint-2010-object-model-how-to-find-out-if-a-web-application-exists/
categories:
  - CSOM
  - JavaScript
  - PowerShell
  - SharePoint 2010
  - Uncategorized
tags:
  - SharePoint 2010
---
Ever run into a situation where you allow a user to configure a custom component with site URLs but wish you can verify if those URLs are valid in SharePoint?

This was the case for a couple of custom components I recently completed.  The user simply types the Site URLs on the WebPart Tool Pane configuration Textbox delimited by semicolon.

One thing I wanted to do is to validate if the Web Application existed before actually iterating through it and searching for a given SPSite Object based on the URL. (line 6)

Here is a snippet on that _(other code omitted for brevity)_

<div>
  <pre class="brush:javascript">//check if the Web App exists
_spWebApplication = SPWebApplication.Lookup(new Uri(url));
if (_spWebApplication != null)
 {
      //We have a Web App, find Site by URL
      if (_spWebApplication.Sites.Where(s =&gt; s.Url.Equals(url)).Count() &gt; 0)
      {
          SPSite _site = new SPSite(url);
          _sites.Add(_site);
      }
  }</pre>
  
  <p>
    &nbsp;
  </p>
  
  <pre><strong style="font-family: Georgia, 'Times New Roman', 'Bitstream Charter', Times, serif; font-size: 13px; line-height: 19px;">

NOTE: Code not optimized etc, but this should give you an idea.</strong></pre>
</div>

Hope this helps!

Oscar