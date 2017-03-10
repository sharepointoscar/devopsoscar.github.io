---
id: 103
title: SharePoint 2010 – Add “Tag Page” JavaScript to your page
date: 2008-09-28T04:51:55+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=103
permalink: /2008/09/28/sharepoint-2010-add-tag-page-javascript-to-your-page/
image: /wp-content/uploads/2014/06/ootb_tag.png
categories:
  - SharePoint 2010
tags:
  - SharePoint Social
---
One of the projects that I am working on totally leverages the out of the box social components and features of SharePoint 2010.  The trick, is that we have a super cool custom branding on the Portal, and do not use the default look for many controls.

We all know that the top right corner of any page has the “**I Like It**” and the “**Tags and Notes**” but what if you wanted to not use the Control that comes with the Microsoft.SharePoint.Portal.WebControls Library?

**FIGURE 1 – Out of the box control**

<img class="alignleft size-full wp-image-104" alt="ootb_tag" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/ootb_tag.png" width="138" height="132" />

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Here is a quick way of adding the Tags and Notes JavaScript.  In my case, I simply wanted to label it “Tag Page”

<pre class="brush:php">&lt;a title="Tag this Page" id="TagsAndNotes_ctl00_ctl42" onmouseover="" onclick="SafeRunFunction(function() { TagDialogOpener.Open('http:\u002f\u002fdemo2010a:45354\u002fen-us\u002fPages\u002fdefault.aspx', document.title, '0'); }, 'SocialData.js', 'TagDialogOpener');" href="javascript:;"&gt;Tag Page&lt;/a&gt;</pre>

&nbsp;

&nbsp;

Click on link and the standard dialog shows up.

**FIGURE 2 – Standard Tags Dialog Box**

<img class="alignleft size-medium wp-image-108" alt="oot_taggingmodal" src="http://www.sharepointoscar.com/wp-content/uploads/2008/09/oot_taggingmodal-300x209.png" width="300" height="209" srcset="http://www.sharepointoscar.com/wp-content/uploads/2008/09/oot_taggingmodal-300x209.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2008/09/oot_taggingmodal-220x153.png 220w, http://www.sharepointoscar.com/wp-content/uploads/2008/09/oot_taggingmodal.png 644w" sizes="(max-width: 300px) 100vw, 300px" />

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Enjoy,
  
Oscar