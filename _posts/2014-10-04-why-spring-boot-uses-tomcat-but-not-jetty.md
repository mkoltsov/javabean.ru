---
id: 346
title: Why Spring Boot uses tomcat but not jetty?
date: 2014-10-04T15:36:06+00:00
author: root
layout: post
guid: http://javabean.ru/?p=346
permalink: /?p=346
categories:
  - stuff
---
<img class="alignleft" src="http://www.greenmoonsoftware.com/images/spring-boot-project-logo.png" alt="" width="126" height="126" />I had an annoying bug while migrating some code from Spring Boot to a legacy Spring application.

Every time i&#8217;ve been changing some front end code my Grunt build failed because it couldn&#8217;t change the corresponding file(i use a highly sophisticated pipeline to compile assets). At first i was thinking that my VCS was the cause of a problem, but that was not the case. Then i find that build fails after the app server runs.

<img class="alignleft" src="http://www.eclipse.org/jetty/images/jetty-logo-80x22.png" alt="" width="283" height="80" />

After a couple of wasted hours some serious googling has helped me to find that jetty was in charge!

The jetty:run command [locks the files](http://appfuse.org/display/APF/FAQ#FAQ-jettyrunlocked) that you web server is serving to the clients. In case of legacy apps(jsp\jsf) it&#8217;s not a problem because static resources got generated on the server. If you&#8217;re writing a single-page app(Angular, React all the things) you should be aware of this annoying problem.

The problem can be fixed, but from now on i prefer tomcat in my SBT/MAVEN/GRADLE projects!

<img class="aligncenter" src="http://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Tomcat-logo.svg/200px-Tomcat-logo.svg.png" alt="" width="200" height="133" />

p.s. Spring Boot & Grails use Tomcat since the beginning