---
id: 16439
title: Creating New Site Collection in Office365 Defaults to Wiki Site Template
date: 2015-06-13T15:56:57+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=16439
permalink: /2015/06/13/creating-new-site-collection-in-office365-defaults-to-wiki-site-template/
video_format_choose:
  - youtube
vc_teaser:
  - 'a:2:{s:4:"data";s:115:"[{"name":"title","link":"post"},{"name":"image","image":"featured","link":"none"},{"name":"text","mode":"excerpt"}]";s:7:"bgcolor";s:0:"";}'
qode_animate-page-title:
  - 'no'
qode_show-sidebar:
  - default
qode_hide-featured-image:
  - 'no'
categories:
  - Uncategorized
---
So, I thought it was me selecting the wrong template the first time, but hell no&#8230;after trying a second time, it did the same thing.

What now? Well, I then tried using PowerShell to provision the New Site Collection and indicating the CMSPUBLISHING#0 and BLANKINTERNET#0 neither worked

[<img class="aligncenter wp-image-16443 " src="http://www.sharepointoscar.com/wp-content/uploads/2015/06/PowerShellError-450x210.png" alt="PowerShellError" width="686" height="320" srcset="http://www.sharepointoscar.com/wp-content/uploads/2015/06/PowerShellError-450x210.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2015/06/PowerShellError-300x140.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2015/06/PowerShellError-1024x478.png 1024w, http://www.sharepointoscar.com/wp-content/uploads/2015/06/PowerShellError-700x326.png 700w" sizes="(max-width: 686px) 100vw, 686px" />](http://www.sharepointoscar.com/wp-content/uploads/2015/06/PowerShellError.png)

&nbsp;

## THE SOLUTION

To get past this, I ended up still creating the Site Collection via the admin web interface, just NOT selecting a template and instead selected the **<Select template later&#8230;>** option.

[<img class="alignnone  wp-image-16445" src="http://www.sharepointoscar.com/wp-content/uploads/2015/06/SelectTemplateSiteCollection.png" alt="SelectTemplateSiteCollection" width="782" height="402" srcset="http://www.sharepointoscar.com/wp-content/uploads/2015/06/SelectTemplateSiteCollection.png 1292w, http://www.sharepointoscar.com/wp-content/uploads/2015/06/SelectTemplateSiteCollection-450x231.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2015/06/SelectTemplateSiteCollection-300x154.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2015/06/SelectTemplateSiteCollection-1024x526.png 1024w, http://www.sharepointoscar.com/wp-content/uploads/2015/06/SelectTemplateSiteCollection-700x359.png 700w" sizes="(max-width: 782px) 100vw, 782px" />](http://www.sharepointoscar.com/wp-content/uploads/2015/06/SelectTemplateSiteCollection.png)

&nbsp;

Hit OK.  Once site is created go to the URL and the template picker shows up, select Publishing Portal template, hit OK.

Done.

Cheers,
  
Oscar