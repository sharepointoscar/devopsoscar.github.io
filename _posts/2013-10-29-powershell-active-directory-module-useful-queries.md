---
id: 18
title: PowerShell + Active Directory Module Useful Queries
date: 2013-10-29T03:44:51+00:00
author: SharePointOscar
layout: post
guid: http://www.sharepointoscar.com/?p=18
permalink: /2013/10/29/powershell-active-directory-module-useful-queries/
image: /wp-content/uploads/2013/10/pw_ad.png
categories:
  - PowerShell
tags:
  - Active Directory
  - PowerShell
---
I was working on a custom tool that allows for synching AD Users and related data to an Office365 SharePoint site, while testing my queries, I wrote tons of stuff but wanted to share just some useful ones.

<pre class="brush:ps"># get a count of Users not disabled who's Office value is Lafayette, show all properties for each User, set ResultSetSize to null so that
# we retrieve all objects
(Get-ADUser -LDAPFilter "(physicalDeliveryOfficeName=Lafayette)(!userAccountControl:1.2.840.113556.1.4.803:=2)" -SearchScope Subtree -SearchBase "DC=sharepointoscar,DC=com" -ResultSetSize $null -Properties *).Count

# get a count of Users not disabled who's Office value is 'Lafayette', show all properties for each User
Get-ADUser -LDAPFilter "(physicalDeliveryOfficeName=Lafayette)(!userAccountControl:1.2.840.113556.1.4.803:=2)" -SearchScope Subtree -SearchBase "DC=sharepointoscar,DC=com" -ResultSetSize $null -Properties * &gt; myusers.txt

#get a count of enabled users
(Get-ADUser -Filter 'enabled -eq $true' -SearchScope Subtree -SearchBase "DC=sharepointoscar,DC=com").Count</pre>

&nbsp;

` `