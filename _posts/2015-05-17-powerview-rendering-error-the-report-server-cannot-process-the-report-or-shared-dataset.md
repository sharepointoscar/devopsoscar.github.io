---
id: 16424
title: 'PowerView Rendering Error &#8211; The report server cannot process the report or shared dataset'
author: SharePointOscar
layout: post
image: /img/wp-content/uploads/2015/05/PowerViewReport.png
categories:
  - Business Intelligence
  - SharePoint 2013
  - Uncategorized
tags:
  - PowerPivot
  - PowerView
  - Reporting Services
---
Let&#8217;s assume you are developing a PowerView Report, and you move it to a different location, you will likely get this error.

&nbsp;

<img src="/img/wp-content/uploads/2015/05/PowerPivotDataSourceError.png" />

## WHY DO I SEE THIS?

When we first created the PowerView Report, a reference to the Report _Data Source_ was created.  Because I moved the PowerView Report and the Report Data Source to different locations (in my case, I moved both to a BI sub-site), it makes sense it would not find the Shared Dataset.

&nbsp;

## HOW TO FIX THIS

To fix this, we need to edit the data source for the PowerView Report.  Go to the **PowerPivot Gallery** > select **All Documents View** > click on the PowerView Report context Menu > select **Manage Data Sources** as shown below.

<img src="/img/wp-content/uploads/2015/05/managedatasourcemenu.png" alt="managedatasourcemenu" width="569" height="346" />

&nbsp;

&nbsp;

&nbsp;

&nbsp;

now click on **EntityDataSource** as shown below.

<img  src="/img/wp-content/uploads/2015/05/managedatasource.png"  />

Now simply click on the elipsis under **Data Source Link**, and browse to the new location where your Report Data Source file resides.

<img src="/img/wp-content/uploads/2015/05/ConnectionSettings.png"  />

&nbsp;

&nbsp;

once you change this, you should be able to see your report.

&nbsp;

<img src="/img/wp-content/uploads/2015/05/PowerViewReport-1024x691.png" alt="PowerViewReport"  />

&nbsp;

&nbsp;

That does it, hopefully this helps you.

-Oscar