---
published: false
layout: page
title: Areas of Expertise
subtitle: From a non technical perspective
#bigimg:
#  - /img/platforms.png: I work on all platforms, yes I do ;)
---
<script src="https://use.typekit.net/nyt3toc.js"></script>
<script>try{Typekit.load({ async: true });}catch(e){}</script>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<link href='http://fonts.googleapis.com/css?family=Ultra' rel='stylesheet' type='text/css'>
  <style type="text/css" media="screen">
    @font-face {
        font-family: 'LeagueGothicRegular';
        src: url('http://charliepark.org/fonts/League_Gothic-webfont.eot');
        src: url('http://charliepark.org/fonts/League_Gothic-webfont.eot?#iefix') format('embedded-opentype'),
             url('http://charliepark.org/fonts/League_Gothic-webfont.woff') format('woff'),
             url('http://charliepark.org/fonts/League_Gothic-webfont.ttf') format('truetype'),
             url('http://charliepark.org/fonts/League_Gothic-webfont.svg#LeagueGothicRegular') format('svg');
        font-weight: normal;
        font-style: normal;
    }

    .hatchshow_container{text-align:center;margin:0 auto;}
  	.hsjs{visibility:hidden}
    a{color:#c00;text-decoration:none}
    body{font-family:'LeagueGothicRegular','helvetica neue', helvetica, arial;padding:30px 30px 30px}
    h1{font-weight:normal;padding:1em 0 2em;text-align:center}
  	h3{background:#444;color:#fff;font-size:24px;text-align:left;padding: 4px 15px}
    hr{background:none;border:0;border-top:10px solid #000;height:0;margin-top:0px;padding-top:5px;visibility:hidden}
    p{line-height:1.2}
    span.hsjs{line-height:1;position:relative;text-transform:uppercase}
    h1 span{line-height:.9}
  </style>
  <script type="text/javascript" charset="utf-8">

  jQuery.fn.hatchShow = function(){
    $('.hsjs').css('display','inner-block').css('white-space','pre').each(function(){
      var t = $(this);
      t.wrap("<span class='hatchshow_temp' style='display:block'>");
      var pw = t.parent().width();
      while( t.width() < pw ){t.css('font-size', (t.fontSize()+1)+"px"),
        function(){while( t.width() > pw ){t.css('font-size', (t.fontSize()-.1)+"px")}};
      };
    }).css('visibility','visible');
  };
  jQuery.fn.fontSize = function(){return parseInt($(this).css('font-size').replace('px',''));};

  $(window).load(function(){
    $().hatchShow();
  });
  </script>
<div class="hatchshow_container">
<span class="hsjs" style="font-family:roboto, sans-serif;font-style: italic;font-weight: 200;">Areas of Expertise</span>

<p class="hatchshow_container" style="float:left;margin-right:5%;width:25%">
<span class="hsjs" style="color:#c00;font-family: acta-poster, serif;font-style: normal;font-weight: 400;">Modern Cloud Architecures</span>
<span class="hsjs" style="font-family: acta-poster, serif;font-style: normal;font-weight: 400;">Azure IaaS, PaaS and Native Cloud Services such as Azure SQL, HDInsight, vNet, ExpressRoute</span>
</p>
<p class="hatchshow_container" style="float:left;margin-right:5%;width:25%">
 <span class="hsjs">Modern Development</span>
 <span class="hsjs">the classic print shop</span>
 <a href="http://countrymusichalloffame.org/our-work/" style="color:#000">
 <span class="hsjs" style="line-height:.85em;padding-to">Hatch</span>
 <span class="hsjs" style="line-height:.84em">Show</span>
 <span class="hsjs" style="line-height:.84em">Print</span></a>
</p>
<p class="hatchshow_container" style="float:left;margin-right:5%;width:25%">
  <span class="hsjs">UI / UX</span>
  <span class="hsjs">the classic print shop</span>
</p>
<p class="hatchshow_container" style="float:left;margin-right:5%;width:25%">
   <span class="hsjs">CI/CD</span>
   <span class="hsjs" style="line-height:.85em;padding-to">Hatch</span>
 </p>
</div>
