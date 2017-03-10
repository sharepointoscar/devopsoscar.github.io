---
id: 90
title: 'Developer Tip: Debugging your SharePoint 2010 Solution'
date: 2010-04-06T14:48:18+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=90
permalink: /2010/04/06/developer-tip-debugging-your-sharepoint-2010-solution/
categories:
  - SharePoint
  - SharePoint 2010
---
**Problem**
  
If you run into a scenario where you have modified the web.config file on the root IIS Site to output the stack trace and and in addition you have switched your **customErrors=off** but still cannot see the stack trace, what do you do?

**Solution**
  
You can temporarily modify the web.config file located under the virtual directory **_layouts, **restart IIS and you should see the error details at that point.

Hope this helps,

-Oscar