---
title: SharePoint List Calculated Column – Calculate Business Days
id: 94
author: SharePointOscar
layout: post
categories:
- SharePoint
- SharePoint 2010
---

Ran into a nice little scenario where my client wanted to know how many business days were remaining prior to a Task Due Date**. **Once I had this date, I built a nice DataViewWebPart (see Figure 3) with the SharePoint Designer!** **This is what I came up with, hope it helps you!

A) Create a calculated column; call it something like “**Days Prior to Due Date**” in my case.

b) Paste this value into a _Calculated Column_, formula
  
=(DATEDIF(Today,[Due Date],”d”))-INT(DATEDIF(Today,[Due Date],”d”)/7)*2-IF((WEEKDAY([Due Date])-WEEKDAY(Today))<0,2,0)+1

C) Make the output type **“Single line of text”**

**NOTE: **At the time of creating this calculated column, you must have another dummy column called “Today”, it does not matter what data type it is. Once you create your calculated column, make sure to delete the Today column or your values will not work!

**FIGURE 1 – Shows the formula for your calculated column to count only weekdays.**

<img  src="/img/wp-content/uploads/2014/06/062408_0118_SharePointL1-300x209.png" width="300" height="209"/>