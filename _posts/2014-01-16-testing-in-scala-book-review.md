---
id: 118
title: Testing in Scala book review
date: 2014-01-16T10:52:03+00:00
author: root
layout: post
guid: http://javabean.ru/?p=118
permalink: /?p=118
categories:
  - stuff
---
<img class="alignleft" title="cover" src="http://akamaicovers.oreilly.com/images/0636920022602/cat.gif" alt="" width="180" height="236" />Intent for reading this book was trivial. I needed it to take full responsibility for testing an application at my job. This doesn&#8217;t happen every day. Most of the books I&#8217;ve read had no trivial connection with the things I do for living. That was an exception. I hope that in future it will happen more often. One of the most exciting things I find in IT is an ability to use the newest technology(sometimes inmature) available.

I hope it didn&#8217;t sound as bloated as it seems to me =) The job I needed to do was as simple as usual. There were a bunch of JUnit tests, I needed a tool to write more of them with a speed of sound. The most obvious thing for me was to refactor the existing test codebase to bring some Scala seasoning  in it. That took almost no time, thanks to Maven and it&#8217;s Scalagen plugin.

While looking at Junit tests written in Scala, Spring and Hamcrest I had a feeling that I&#8217;ve missed something. Scala syntax was consise, but the style of writing the unit-tests was still Java-like. That means it was bulky and too verbose.

Here comes the &#8220;Testing in Scala&#8221; book. If every book is considered to be a motor ride this particular book would be a driving on a highway in a sports car.

It gives you only what you need. The introduction to Scala-esque way of writing a unit test, all popular frameworks are included.

There&#8217;s no much talk about the trivial things like some other books. Only brief recital of how to write consise tests in JUnit and how to use ScalaTest, Scalacheck etc. You could read it throughout a day! I like the book so much that i&#8217;ve started to use most of the things from it in my own projects.

If you find yourself writing a test in any Jvm &#8211; based language you should consider reading this book.

My score 4/5