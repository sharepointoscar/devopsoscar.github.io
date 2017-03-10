---
id: 99
title: SharePoint 2010 – Add an “Edit Page” link on your Page Layout
date: 2008-09-28T04:46:10+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=99
permalink: /2008/09/28/sharepoint-2010-add-an-edit-page-link-on-your-page-layout/
categories:
  - SharePoint
  - SharePoint 2010
---
Another great tip &#8211; The Ribbon is definitely a nice UI  enhancement to SharePoint 2010 and is quite customizable via custom menu items within the groups etc.

However, there are times when your design calls for replicating the functionality of some Ribbon menu items within your page layout.  A great example is the scenario we ran into recently.  Here is how the end result looks and it is embedded directly on the Page Layout.

<img class="aligncenter size-full wp-image-100" alt="edit_page" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/edit_page.png" width="201" height="208" />

&nbsp;

&nbsp;

To get accomplish this, simply place the following HTML code where you need it.

<pre class="brush:php">&lt;a title="Edit Page" class="edit-page" id="ctl00_PageStateActionButton" 
onclick="CoreInvoke('PageActionClick', this);return false;" href="javascript:" 
_savetooltip="Save & Close" _saveoffsety="494" _saveoffsetx="0" _edittooltip="Edit Page" 
_editoffsety="251" _editoffsetx="0" _action="edit"&gt;</pre>

Enjoy,
  
Oscar

&nbsp;