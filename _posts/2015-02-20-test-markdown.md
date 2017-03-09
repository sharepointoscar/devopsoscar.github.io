---
layout: post
title: Test markdown
subtitle: Each post also has a subtitle
---

You can write regular [markdown](http://markdowntutorial.com/) here and Jekyll will automatically convert it to a nice webpage.  I strongly encourage you to [take 5 minutes to learn how to write in markdown](http://markdowntutorial.com/) - it'll teach you how to transform regular text into bold/italics/headings/tables/etc.

**Here is some bold text**

## Here is a secondary heading

Here's a useless table:
 
| Number | Next number | Previous number |
| :------ |:--- | :--- |
| Five | Six | Four |
| Ten | Eleven | Nine |
| Seven | Eight | Six |
| Two | Three | One |
 

How about a yummy crepe?

![Crepe](http://s3-media3.fl.yelpcdn.com/bphoto/cQ1Yoa75m2yUFFbY2xwuqw/348s.jpg)


Sample JavaScript:

{% highlight javascript %}
var foo = function(x) {
  return(x + 5);
}
foo(3)
{% endhighlight %}

My Python Snippet

{% highlight python %}
    from scipy import ndimage as nd
{% endhighlight %}

Bash looks like this
{% highlight bash %}
#!/bin/bash
echo "What is your preferred programming / scripting language"
echo "1) bash"
echo "2) perl"
echo "3) phyton"
echo "4) c++"
echo "5) I do not know !"
read case;
#simple case bash structure
# note in this case $case is variable and does not have to
# be named case this is just an example
case $case in
    1) echo "You selected bash";;
    2) echo "You selected perl";;
    3) echo "You selected phyton";;
    4) echo "You selected c++";;
    5) exit
esac 
{% endhighlight%}

PowerShell - Get a list of Cmdlets for Exchange Online
{% highlight PowerShell  %}
$mods=Get-Module | where {$_.Name -like "tmp_*"}; $modName=$mods.Name
Get-Command -Module $modName | More
{% endhighlight%}

