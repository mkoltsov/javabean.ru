---
id: 45
title: Oracle java 7 mac issues
date: 2012-10-27T17:33:46+00:00
author: root
layout: post
guid: http://javabean.ru/?p=45
permalink: /?p=45
categories:
  - java
  - oracle
---
<img class="alignleft" title="issues" src="http://osxdaily.com/wp-content/uploads/2012/08/java-security-problem.jpg" alt="" width="313" height="295" />
  
Решил поставить Oracle JDK 7 на домашний компьютер с Mac OS X Lion. Столкнулся с тем что некоторые приложения запускаются, но не работают.

Откатился до Apple Java 1.6, все ок. Решается все удалением JVM и возвращением настроек в первозданный вид.

&nbsp;

&nbsp;

Удалить JDK можно так:

**_cd /Library/Java/JavaVirtualMachines/_**

**_rm -rf jdk1.7.0_09.jdk_**

<img class="aligncenter" title="java pref" src="http://sniptools.com/cms/wp-content/uploads/2011/07/java_pref.png" alt="" width="520" height="388" />

Продолжаю использовать версию 7ки для Linux, подожду более стабильной реализации под мак.