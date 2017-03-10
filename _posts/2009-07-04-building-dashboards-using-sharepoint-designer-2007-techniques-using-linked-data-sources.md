---
id: 145
title: Building Dashboards Using SharePoint Designer 2007. Techniques using Linked Data Sources
date: 2009-07-04T15:48:25+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=145
permalink: /2009/07/04/building-dashboards-using-sharepoint-designer-2007-techniques-using-linked-data-sources/
categories:
  - MOSS 2007
  - SharePoint Designer
tags:
  - Business Intelligence
  - Dashboards
---
Today I am going to show you the different built-in technologies you may take for granted, always have been curious about or simply do not know about.  My scenario in this case is building a dashboard using the SharePoint Designer 2007.

Our end result will look something like what you see in **Figure 1.  **It is a DataViewWebPart created using the SharePoint Designer 2007

  1. Use of **Linked Data Sources **in SPD 2007 to form a relationship between two SharePoint Lists (you can use this method to form a relationship with any other Data Source type)
  2. Custom XSL to render the conditional image using XSL as well as importing your own XSL templates for reusability of those.__

**Figure 1 –** The end result of our scenario shows Courses with related Tasks.   The indicator image is determined by calculating how many tasks are either past due (red) or are due within a week (yellow)

<img class="alignnone size-full wp-image-150" alt="Dashboard" src="http://www.sharepointoscar.com/wp-content/uploads/2009/07/Dashboard.png" width="644" height="138" srcset="http://www.sharepointoscar.com/wp-content/uploads/2009/07/Dashboard.png 644w, http://www.sharepointoscar.com/wp-content/uploads/2009/07/Dashboard-450x96.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2009/07/Dashboard-300x64.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2009/07/Dashboard-220x47.png 220w" sizes="(max-width: 644px) 100vw, 644px" />

#### Linked Data Sources

Linked Data Sources are very powerful, on code these are called Aggregate Data Sources.  As an example you may have the following hierarchical relationship in order to display your data using XSL.

As you can see on **Figure 2,** each Course has many Events, and each Event has many Tasks associated with it. The Task List has a Lookup column to the Event List, and the Event List has a Lookup Column to the Courses List.  Both Course and Event Tasks are stored on the same List.

**Figure 2 – shows SharePoint List relationships**

<img class="alignnone size-full wp-image-153" alt="SPListRelationships" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/SPListRelationships.png" width="644" height="300" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/SPListRelationships.png 644w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/SPListRelationships-450x209.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/SPListRelationships-300x139.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/SPListRelationships-220x102.png 220w" sizes="(max-width: 644px) 100vw, 644px" />

In order to display this on a _DataViewWebPart_, here are the steps you may take:

  1. Drag the Course List on to the page, modify the columns as you wish
  2. Select a row on that table, right click and insert a row below (this will make room for the Events table)
  3. Create a Linked Data Source called it **Events and Associated Tasks,** it links the Events and Tasks as the name implies.  Add the Events List and the Event Task List to this Data Source.  So now your Data Source properties should look something like **Figure 3 **below.
  4. Create another Linked Data Source, I called it **Courses and Tasks plus Event Tasks**, this Data Source will contain our first Data Source, so go ahead and click on Configure Data Source button, and add the first the**Events and Associated Tasks** Data Source.  Now your properties should look like **Figure 4****Figure 3 – Event and Tasks Data Source Properties **
  
    <img class="alignnone size-full wp-image-151" alt="AssociatedTasks" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/AssociatedTasks.png" width="339" height="302" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/AssociatedTasks.png 339w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/AssociatedTasks-300x267.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/AssociatedTasks-220x195.png 220w" sizes="(max-width: 339px) 100vw, 339px" />
  
    ****

**
  
Figure 4 – Shows the Courses and Tasks plus Events Task Data Source with a nested Linked Data Source (Events and Associated Tasks – an SQL Data Source)**

<img class="alignnone size-full wp-image-154" alt="TaskDataSource" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/TaskDataSource.png" width="345" height="313" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/TaskDataSource.png 345w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/TaskDataSource-300x272.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/TaskDataSource-220x199.png 220w" sizes="(max-width: 345px) 100vw, 345px" />

If you view Data Source Details on the right of the Designer screen, you should see the relational data, much like what **Figure 5** shows.
  
<img class="alignnone size-full wp-image-152" alt="DataSourceLiveView" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/DataSourceLiveView.png" width="341" height="772" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/DataSourceLiveView.png 341w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/DataSourceLiveView-159x360.png 159w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/DataSourceLiveView-132x300.png 132w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/DataSourceLiveView-220x498.png 220w" sizes="(max-width: 341px) 100vw, 341px" />

At this point, it is easy to drag data and make it look pretty with XSL.  Your end result is what you see in **Figure 1**above.

The related Data Sources could have been say an SQL Data Source linked to a SharePoint List Data Source for when you need to show related data from a database that matches your SharePoint List data.  The possibilities are endless!  You can link almost any type of Data Source such as BDC, SQL, and Web Service so long as you have a field that relates the two Data Sources.

#### XSL Fun!

I don’t know about you, but I enjoy the challenge of pushing the limits with XSL and XSLT, this technology is extremely versatile and powerful.  With a little work, you can create complex rendering tables that show your data in pretty much any way you want (almost all the time, there are exceptions)

On this dashboard project I previously worked on, there was a requirement to show “KPI” images based on some business rules.  Now you may ask; why not use the out of the box KPI WebParts?

For this particular project there were many date calculations that determined the image to display.  For example, if any tasks for a given Event where past due, show red image.  For any tasks that are due in 5 days, show yellow image.

**FIGURE 5 – Shows you the XSLT expressions I used **

<img class="alignnone size-full wp-image-155" alt="XSLTAtWork" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTAtWork.png" width="644" height="72" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTAtWork.png 644w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTAtWork-450x50.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTAtWork-300x33.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTAtWork-220x24.png 220w" sizes="(max-width: 644px) 100vw, 644px" />

**FIGURE 5 – Shows the output of my XSLT expressions shown on FIGURE 6**
  
<img class="alignnone size-full wp-image-156" alt="XSLTExpression" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTExpression.png" width="528" height="246" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTExpression.png 528w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTExpression-450x209.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTExpression-300x139.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTExpression-220x102.png 220w" sizes="(max-width: 528px) 100vw, 528px" />

## Reusing your own custom XSL Templates

What if you are an XSL enthusiast and over time have created some utility XSL Templates and maybe even Functions that you would like to use on a SharePoint DataFormView WebPart?

You can!  All you need to do is import the XSL file and call your Templates.  I used this technique recently to do data comparison calculations
  
**FIGURE 7 – Shows you how to import your custom XSL templates file **[
  
<img class="alignnone size-full wp-image-157" alt="XSLTImport" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTImport.png" width="547" height="187" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTImport.png 547w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTImport-450x153.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTImport-300x102.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTImport-220x75.png 220w" sizes="(max-width: 547px) 100vw, 547px" />
  
](http://web.archive.org/web/20110201212419/http://blogs.sharepointace.com/image.axd?picture=WindowsLiveWriter/BuildingDashboardsTechniquesusingSPD2007_13170/image_16.png) 

**FIGURE 8 – Shows how to call the custom Template and save result in a variable and hen use that variable to display my images.**

<img class="alignnone size-full wp-image-158" alt="XSLTVar" src="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTVar.png" width="549" height="204" srcset="http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTVar.png 549w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTVar-450x167.png 450w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTVar-300x111.png 300w, http://www.sharepointoscar.com/wp-content/uploads/2014/06/XSLTVar-220x81.png 220w" sizes="(max-width: 549px) 100vw, 549px" />

&nbsp;

Well, I hope you found this article useful and can make use of the information on your existing or future projects.  If you have any questions or feedback, please contact me.

Oscar