---
layout: post
title: Using PowerShell to generate a well formatted User Mappings XML for the ShareGate thingy
subtitle: Using a simple csv file vs. querying a domain controller
---

I'm working on a project to migrate a customer's Office 365 tenant to another Office 365 Tenant (yeah this one is weird).  One of the workloads we are handling is SharePoint Online of course.   I wanted to run some test migrations but before I could do that, I needed to ensure the permissions for any site objects are properly set.  

Enter that thingy called ShareGate and the User Mappings feature, which is available through the GUI and allows you to import your mappings.

{% highlight PowerShell  %}
    <#
        .DESCRIPTION – This script akes a csv file with user accounts and creates a properly formatted xml file for ShareGate User Mappings.
       
        Simply take the file and import it through the Migration GUI

        The CSV file contains a header row which looks like this
        
        ZS_EMAIL, AZ_EMAIL, FULL_NAME
        user@sourcedomain.com,user@targetdomain.net,"Medina, Oscar"

     #>

$path = "C:\Users\omedina\Desktop\UserMap.sgum"
$XmlWriter = new-object System.XML.XMLTextWriter($path, $null)
$XmlWriter.Formatting = 'Indented'
$xmlwriter.Indentation = 1
$XmlWriter.IndentChar = "`t"
 
 
#write the header
$xmlWriter.WriteStartDocument()
 
$XmlWriter.WriteComment("Start of XML")
$XMLWriter.WriteStartElement('UserAndGroupMappings')
$XmlWriter.WriteAttributeString('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema")
$XmlWriter.WriteAttributeString('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
 
 
$XMLWriter.WriteStartElement("Mappings")
$path = "C:\PRIDS.csv"
$csv = Import-Csv -path $path

    foreach($item in $csv)
    { 

        $zs_email = $item.("ZS_EMAIL")
        $az_email = $item.("AZ_EMAIL")
        $full_name = $item.("FULL_NAME")
        Write-Host  $zs_email $az_email $full_name
        write-host "===================================="

        $XMLWriter.WriteStartElement("Mapping")
        $SourceAccountName = "i:0#f|membership|$($zs_email)"
        $SourceDisplayname =$full_name
     
        $DestinationAccountName = "i:0#f|membership|$($az_email)"
        $DestinationDisplayname = $full_name
     
        $XMLWriter.WriteStartElement("Source")
        $XmlWriter.WriteAttributeString('AccountName', $SourceAccountName)
        $XmlWriter.WriteAttributeString('DisplayName', $SourceDisplayname)
        $XmlWriter.WriteEndElement() #source
     
        $XMLWriter.WriteStartElement("Destination")
        $XmlWriter.WriteAttributeString('AccountName', $DestinationAccountName)
        $XmlWriter.WriteAttributeString('DisplayName', $DestinationDisplayname)
        $XmlWriter.WriteEndElement() #Destination
        $XmlWriter.WriteEndElement() #mapping

    }


    $XmlWriter.WriteEndElement() #mappings
    $XmlWriter.WriteEndElement() #UserAndGroupMappings
 
 
#finalize the document
$xmlWriter.WriteEndDocument()
$xmlWriter.Flush()
$xmlWriter.Close()
 
{% endhighlight %}

### The Output
The script outputs an XML file that you can then import into your migration job on the ShareGate tool.  The XML looks similar to this.

{% highlight xml %}
<UserAndGroupMappings xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <Mappings>
    <Mapping>
      <Source AccountName="i:0#.f|membership|oscar@sourcedomain.com" DisplayName="Oscar Medina" PrincipalType="User" />
      <Destination AccountName="i:0#.f|membership|oscar@targetdomain.net" DisplayName="Medina, Oscar" PrincipalType="User" />
    </Mapping>
    .....
  </Mappings>
</UserAndGroupMappings>
{% endhighlight%}


