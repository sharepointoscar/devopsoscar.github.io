---
title: Adding PerformancePoint Dashboard Designer Shortcut to a page.
author: SharePointOscar
layout: post
image: /img/wp-content/uploads/2011/10/0474.BICenter2.png
---

  You probably already know that branding the PerformancePoint Site is a good undertaking and you should consider doing it on your branding efforts.  But what if you just need the shortcut to the PerformancePoint Dashboard Designer within a page or even your own design?


{% highlight javascript %}

  function ULSrFH(){var o=new Object;o.ULSTeamName="PerformancePoint Monitoring Service";o.ULSFileName="ppssample.aspx";return o;}     
     var navBarHelpOverrideKey = "WSSEndUser"; 

  function OpenDD()     {
      ULSrFH:;       
     var designerRedirect = "_layouts/ppswebparts/designerredirect.aspx";       
     var siteCollection = "/";       
     var siteLocation = "/YOURSITENAME/";       
     var siteCollectionUrl = location.protocol + "//" + location.host + siteCollection;       
     var siteLocationUrl = siteLocation.replace(siteCollection,"");       

    designerRedirect = siteLocation + designerRedirect + "?SiteCollection=" + siteCollectionUrl + "&SiteLocation=" + siteLocationUrl;       
    location.href = designerRedirect;    
   }
 {% endhighlight %} 

Here is a quick tip, just drop this code into either a Layout Page or Master Page or Form WebPart:
{% highlight html %}
<button onclick="javascript: OpenDD(); return false;">
  <img align="absmiddle" alt="Run Dashboard Designer" src="/_layouts/images/PPSSiteTemplateRun.png" height="36px" width="36px" /> 
  <span class="ppsma-fpbbt">Run Dashboard Designer</span>
</button>
{% endhighlight %}

You can easily style the button etc.

Enjoy,
  
Oscar