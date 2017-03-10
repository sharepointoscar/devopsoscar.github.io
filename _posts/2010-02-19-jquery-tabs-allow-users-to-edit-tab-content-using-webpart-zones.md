---
id: 120
title: jQuery Tabs – Allow users to edit tab content using WebPart Zones
date: 2010-02-19T05:11:27+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=120
permalink: /2010/02/19/jquery-tabs-allow-users-to-edit-tab-content-using-webpart-zones/
image: /wp-content/uploads/2014/06/figure21.png
categories:
  - JavaScript
  - SharePoint 2010
tags:
  - jQuery
---
It has been a while since my last post, my apologies.  But hey that is a good thing it only means I have been busy with billable work 🙂

Anyway, I thought I’d share this cool implementation of jQuery Tabs that allow a user to update tab content for each tab.  I am using the **jQuery plug-in for accessible, unobtrusive tabs** found at [http://www.stilbuero.de/2006/05/13/accessible-unobtrusive-javascript-tabs-with-jquery/](http://web.archive.org/web/20111120172248/http://www.stilbuero.de/2006/05/13/accessible-unobtrusive-javascript-tabs-with-jquery/ "http://www.stilbuero.de/2006/05/13/accessible-unobtrusive-javascript-tabs-with-jquery/")

A recent project called for the ability to use a “tab interface” that would have the following functionality:

  * Do not refresh entire page when clicking on tab
  * Allow non-technical users to update content on each tab

And of course, I quickly realized jQuery was the right tool &#8211; plus combine that with SharePoint WebPart Zones to allow users to add content to said Tabs…all good!

Here is what my solution looks like.

**DISCLAIMER: **I should tell you, in order to have new pages with the Tabs Feature, you do need the SharePoint Designer 2007 (um, yes not thoroughly accepted by all yet to me, it is the army swiss knife in the SharePoint Realm)

### SOLUTION DETAILS

Basically, for each Tab you drop a WebPart Zone in a custom Layout Page.  Via the browser, the user simply drops a _Content Editor WebPart_ and that is all!

**NOTE: Nothing prevents one to add any type of WebPart….think of the possibilities 🙂**

**FIGURE 1 – jQuery Tabs Interface using WebPart Zones to allow non-tech user add content**

[<img class="alignleft size-medium wp-image-123" alt="figure1" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure12-300x149.png" width="300" height="149" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure12-300x149.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure12-220x109.png 220w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure12.png 644w" sizes="(max-width: 300px) 100vw, 300px" />](http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure12.png)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**FIGURE 2 – Tabs Page in edit-mode**

[<img class="alignleft size-medium wp-image-122" alt="figure2" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure21-300x166.png" width="300" height="166" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure21-300x166.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure21-220x122.png 220w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure21.png 644w" sizes="(max-width: 300px) 100vw, 300px" />](http://www.sharepointoscar.com/wp-content/uploads/2014/06/figure21.png)

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

&nbsp;

Notice the rounded corners??? Ah yes, that would be also a jQuery plug-in by Mike Alsup

([http://jquery.malsup.com/corner/)](http://web.archive.org/web/20111120172248/http://jquery.malsup.com/corner/))

And that does it!  Hope this helps you in brainstorming solutions when using jQuery and SharePoint!

-Oscar

&nbsp;