---
id: 73
title: 'SharePoint 2010 &#8211; Deploy WebTemplate Via PowerShell'
date: 2011-03-03T05:10:05+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=73
permalink: /2011/03/03/sharepoint-2010-deploy-webtemplate-via-powershell/
categories:
  - Uncategorized
---
Short but sweet post.  So you’ve created your Web Template and need to deploy as part of your overall deployment scripts.  How do you include this?

The Web Template in this case is a User Solution (Sandbox Solution), and this is how you go about deploying it.  Learn more on the available parameters at [http://technet.microsoft.com/en-us/library/ff607715.aspx](http://technet.microsoft.com/en-us/library/ff607715.aspx "http://technet.microsoft.com/en-us/library/ff607715.aspx")

<div>
  <pre></pre>
  
  <pre class="brush:ps">#Install Web Template
Add-SPUserSolution -Site $intraneturl -LiteralPath (resolve-path "Web Templates\WebTemplateName.wsp").Path -Confirm:$false
Install-SPUserSolution -Identity "WebTemplateName.wsp" -Site $siteUrl -Confirm:$false</pre>
  
  <p>
    &nbsp;
  </p>
</div>

<div>
  This will also activate it 🙂
</div>

<div>
</div>

<div>
  -Oscar
</div>