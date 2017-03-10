---
id: 16305
title: Getting Bytes from a string in JavaScript
date: 2015-02-10T15:12:44+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=16305
permalink: /2015/02/10/getting-bytes-from-a-string-in-javascript/
video_format_choose:
  - youtube
vc_teaser:
  - 'a:2:{s:4:"data";s:115:"[{"name":"title","link":"post"},{"name":"image","image":"featured","link":"none"},{"name":"text","mode":"excerpt"}]";s:7:"bgcolor";s:0:"";}'
qode_show-sidebar:
  - default
qode_hide-featured-image:
  - 'no'
categories:
  - JavaScript
  - Uncategorized
---
I was asked this question recently. Took me a little bit to figure it out, but here it is.

<pre class="brush:javascript">var _theString = 'Hello World!';

alert(_theString.split('').map(function(c) { return c.charCodeAt(); }));</pre>

&nbsp;