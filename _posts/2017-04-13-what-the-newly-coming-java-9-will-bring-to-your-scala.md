---
id: 913
title: What the newly coming Java 9 will bring to your Scala?
date: 2017-04-13T20:02:16+00:00
author: root
layout: post
guid: http://javabean.ru/?p=913
permalink: /?p=913
categories:
  - stuff
---
### **Abstract**

Java 9 is supposedly coming in July this year. All of its features are already discussed, however, as it was in the past everyone will wait until the minor version 1 or even 2 will be released for the wide adoption to take place. What&#8217;s even more important that usually OpenJDK community doesn&#8217;t care a lot about the JVM languages if it&#8217;s not Java. Those Clojure developers who used to install every JVM update know what I&#8217;m talking about.

Let&#8217;s quickly reiterate what are the major JVM/Java features that might affect (or have already affected, according to the current b168 build) Scala and its ecosystem as Scala has currently its prime-time with a lot of business users unwilling to break their core apps due to a new version of the platform its built upon.

In my opinion the list of features should look like that:

  * JShell
  *  Compact strings
  *  Variable type inference
  *  Factory methods for making immutable collections
  *  ECMA6 features in Nashhorn
  *  Http/2 client
  *  Private methods in interfaces
  *  Reactive streams
  *  Multi-release jars
  *  AOT Compilation
  * G1 Garbage collector
  * Modules

Let me quickly go through that list one by one to explain what in  my opinion will be the pros and cons of every feature.

### JShell

If someone still recalls what was the [Bean](https://en.wikipedia.org/wiki/BeanShell)Shell back in the days when there still was a need to write scripts in java due to lack of robust scripting language for the JVM let me assure you that&#8217;s not it though a full-rethought fork of it that has gone through multiple JCP improvements. It&#8217;s not as versatile as running

<pre class="EnlighterJSRAW" data-enlighter-language="java"> sbt console</pre>

&nbsp;

on your project with all your dependencies and Scala code compiled being already added to the classpath, but hopefully Java build tools could improve that and make this REPL as useful as it is  for Scala projects.

<pre class="EnlighterJSRAW" data-enlighter-language="java">import java.security.Security

Security.setProperty("crypto.policy", "unlimited")</pre>

Notice the lack of semicolons, but be aware that you still need to use them if you plan to write a function.

<pre class="EnlighterJSRAW" data-enlighter-language="java">void println(String arg) {
    System.out.println(arg);
}

println("Hello Java")</pre>

### **Compact strings**

Did you like that every string is a char array? I didn&#8217;t as even considering a string pool having a lot of strings was costly, made your heap unnecessarily large and  made your <del>unicorn</del> garbage collector cry since why should it be bothered with cleaning of &#8230; strings?

<div style="width: 341px" class="wp-caption aligncenter">
  <img src="http://img2.wikia.nocookie.net/__cb20130126191858/mlp/es/images/1/19/Crying_rainbow_dash_by_keanno-d49w8t2_large.gif" alt="" width="331" height="241" />
  
  <p class="wp-caption-text">
    GC has to stop the world due to abundance of strings
  </p>
</div>

Since JDK 9 your strings will become&#8230; arrays of bytes plus an encoding flag.

According to [findings](http://cr.openjdk.java.net/~shade/density/state-of-string-density-v1.txt) [made](https://www.youtube.com/watch?v=_evzaAkd594) by the JDK committee the lower footprint will make your <del>unicorn</del> garbage collector dance of joy.

<div style="width: 174px" class="wp-caption aligncenter">
  <img src="https://mlpforums.com/uploads/post_images/sig-4639785.228523__UNOPT__safe_rainbow-dash.gif.gif" alt="" width="164" height="197" />
  
  <p class="wp-caption-text">
    The GC is waiting for more garbage
  </p>
</div>

Let me illustrate it with a slide from a great [presentation](https://shipilev.net/talks/jfokus-Feb2016-lord-of-the-strings.pdf) done by Aleksey Shipilev at JFokus.

[<img class="wp-image-923 aligncenter" src="http://javabean.ru/wp-content/uploads/2017/04/Screen-Shot-2017-04-14-at-11.03.03-300x75.png" alt="" width="408" height="102" srcset="http://localhost/wp-content/uploads/2017/04/Screen-Shot-2017-04-14-at-11.03.03-300x75.png 300w, http://localhost/wp-content/uploads/2017/04/Screen-Shot-2017-04-14-at-11.03.03.png 471w" sizes="(max-width: 408px) 100vw, 408px" />](http://javabean.ru/wp-content/uploads/2017/04/Screen-Shot-2017-04-14-at-11.03.03.png)

### Variable type inference

You&#8217;re finally allowed to omit the type while allocating a new Java variable, like you know&#8230; in Scala.

<pre class="EnlighterJSRAW" data-enlighter-language="java">var myCounter = 0L

val myName = "Adam"</pre>

Sorry, just kidding. It&#8217;s not yet there. It&#8217;s the most anticipated JEP for me personally that was proposed last year by the JCP, even though it was [authored](http://openjdk.java.net/jeps/286) by Brian Goetz there&#8217;s no final decision yet will it be a part of Java 10 or Java XXL (the one that will implement generics in a real type safe way rather than with type erasure).

&nbsp;

### Factory methods for making immutable collections

One of the most loved and hated Scala feature is its collection library. In case of JDK 9 it has nothing to fear about. Making immutable collections have become less tedious, though the choice of factory methods instead of constructors is questionable if you ask me. The most frequent use case for Google&#8217;s Guava (apart from the magnificent CacheBuilder which we often use with Scala) is fully covered now by the Java core functionality in my opinion.

<pre class="EnlighterJSRAW" data-enlighter-language="java">List immutableList = List.of();
List&lt;String&gt; immutableList = List.of("1","2","3")
Map emptyImmutableMap = Map.of()
Map nonemptyImmutableMap = Map.of(1,"one",2,"two",3,"three")</pre>

&nbsp;

### ECMA6 features in Nashhorn

We use Nashhorn and JVM-based scripting quite often, therefore having ECMA6 features like arrow function and block scope will be very helpful.

Unfortunately, in every JDK9 build I tried I couldn&#8217;t find features promised in the corresponding [JEP](http://openjdk.java.net/jeps/292).

Let me list them so we could hope to see it in the near feature with a minor update.

Promised during the initial update

  * Template strings
  * `let`, `const`, and block scope
  * Iterators and `for..of` loops
  * `Map`, `Set`, `WeakMap`, and `WeakSet`
  * Symbols
  * Binary and octal literals

Promised with later updates

  * Arrow functions
  * Enhanced object literals
  * Destructuring assignment
  * Default, rest, and spread parameters
  * Unicode
  * Subclassable built-ins
  * Promises
  * Proxies
  * `Math`, `Number`, `String`, and `Object` APIs
  * Reflection API
  * Classes
  * Generators
  * Modules
  * Module loaders
  * Tail calls

### Http/2 client with websockets

Though not as useful as Spray-can and its later reborn as Akka-http-client this version of out of the box http client for Java has finally managed to use Http version 2 as well as WebSockets. This is really helpful as it will allow to get rid of nasty includes of Apache Commons and Spring for the single purpose to do a http call&#8230; like we do in 2017. Did I say that it also has an asynchronous API?

<pre class="EnlighterJSRAW" data-enlighter-language="java">import java.net.http.*

import static java.net.http.HttpRequest.*

import static java.net.http.HttpResponse.*

URI uri = new URI("http://grandparade.co.uk/blog")

HttpResponse response = HttpRequest.create(uri).body(noBody()).GET().response()

System.out.println("Response was " + response.body(asString()))</pre>

&nbsp;

### **Private methods in interfaces**

This is the feature that looks to me as an attempt to chase the  Scala&#8217;s trait features. In addition to the default method implementation in interfaces added in JDK8 this is the second step to make mixins available for Java developers.

This is very handy for those who need to switch between Scala and Java quite often (like I do).

<pre class="EnlighterJSRAW" data-enlighter-language="java">public interface Bear {
  private Long iterateTeeth() {
      return 42; 
  }
  private static void makeARoar(){
      System.out.println("GO BEARS GO!");
 }
}

</pre>

### **Reactive streams**

I&#8217;m not exactly sure how this [feature](https://community.oracle.com/docs/DOC-1006738) will be adopted by the Java developers as we&#8217;ve seen a lot of traction towards JavaRx amongst them. Although lambdas provided by JDK8 allow to follow the reactive manifesto in Java easier than before, it&#8217;s still a long way to go to do this in Java

<pre class="EnlighterJSRAW" data-enlighter-language="java">val o = Observable.interval(200 millis).take(5)
o.subscribe(n =&gt; println("n = " + n))
Observable.just(1, 2, 3, 4).reduce(_ + _)</pre>

However, this is also fine written with the Flow API provided by JDK 9

<pre class="EnlighterJSRAW" data-enlighter-language="java">import java.util.concurrent.SubmissionPublisher;  
...  
    //Create Publisher  
    SubmissionPublisher&lt;String&gt; publisher = new SubmissionPublisher&lt;&gt;();  
  
    //Register Subscriber  
    MySubscriber&lt;String&gt; subscriber = new MySubscriber&lt;&gt;();  
    publisher.subscribe(subscriber);  
  
    //Publish items  
    System.out.println("Publishing Items...");  
    String[] items = {"1", "x", "2", "x", "3", "x"};  
    Arrays.asList(items).stream().forEach(i -&gt; publisher.submit(i));  
    publisher.close();</pre>

Such primitives of the Flow API will be given during the initial release:

  * java.util.concurrent.Flow
  * java.util.concurrent.Flow.Publisher
  * java.util.concurrent.Flow.Subscriber
  * java.util.concurrent.Flow.Processor

### Multi-release jars

By releasing multi-release jars Java committee is planning to address the pain you have to go through while upgrading a JVM version by providing compiled classes for every JVM version they might be executed on.

<pre class="EnlighterJSRAW" data-enlighter-language="shell">jar root
  - A.class
  - B.class
  - C.class
  - D.class
  - META-INF
     - versions
        - 9
           - A.class
           - B.class
        - 10
           - A.class</pre>

Let&#8217;s say your API has been compiled with the JDK 10, but for those retrogrades who are still using JDK 9 you can provide their own oldschool version of your class inside your jar file with no effort from the user&#8217;s side.

This feature makes my unicorn very happy.

<img class="aligncenter " src="https://media.giphy.com/media/WZmgVLMt7mp44/giphy.gif" width="345" height="345" />

### AOT Compilation

This feature addresses those apps that have grown so massive that the JIT compiler takes time to warm-up and fill its caches. The idea is to have your code already compiled to bytecode before  starting your application to make the bootstrap of both big and small apps as agile as it could possibly be.

<pre class="EnlighterJSRAW" data-enlighter-language="java">//first you compile it with the new jaotc compiler
jaotc --output libHelloWorld.so HelloWorld.class
//Then specify generated AOT library during its execution
java -XX:AOTLibrary=./libHelloWorld.so HelloWorld</pre>

There&#8217;s a lengthy [thread](https://news.ycombinator.com/item?id=12807906) on HN that explains all pros and cons of that feature, but during my small experiments I haven&#8217;t noticed any big difference. Scala compiler still takes the longest time to finish its compilation process in comparison with javac and jaotc. Theoretically, this feature might be a game changer for small apps like test Java packs that are eager to start as soon as possible with no need to wait until the caches get warm.

### G1 Garbage collector

G1 collector has been added some time ago, so now after a long improvement & refinement process, it&#8217;s going to be the default GC as well as it&#8217;s one of the only two that are available for the jaotc compiler.

In my personal experience not having to think about what GC you&#8217;re using and which options of it to tune to get the most performance is actually a great thing as it allows you to stand on the shoulders of giants.

In my personal experience G1 makes the smallest GC pauses as well as it has the most throughput in comparison with parallel and CMS garbage collector.

### Modules

One of the most awaited features of the new JDK is the &#8220;[Jigsaw](http://openjdk.java.net/projects/jigsaw/talks/intro-modular-dev-j1-2015.pdf)&#8221; project that was promised to use since java7 six long years ago.

JDK 9 will introduce such parts of it:

  * Modular JDK
  * Modular Java Source Code
  * Modular Run-time Images
  * Encapsulate Java Internal APIs
  * Java Platform Module System

The bottom line is that you will be able to release your app in multiple jars by splitting it into modules and encapsulating each one into its own file. The JDK9 itself will be released in 92 modules (this number may change for the final release).

Unfortunately, sbt and scalac don&#8217;t support modules at that moment.

###