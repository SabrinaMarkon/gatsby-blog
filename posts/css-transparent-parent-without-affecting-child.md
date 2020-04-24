---
title: 'How to Make a Parent Element Transparent without also making its Child Elements Transparent'
tags: ["css", "html"]
published: true
date: '2020-04-22'
---

I have always loved the effects you can achieve with semi-transparency, especially in dark-themed designs. 
So, in the old days, I primarily used Photoshop to create semi-transparent images for my layouts which at the time, also heavily leaned on the &lt;table&gt; tag! (I hear you cringing!).

Now, lucky us! We have the magic of modern CSS! Yay!

It allows a beautiful image or element to show through while adding shine and depth to your elements.

You can see the fun I had with CSS transparency in my [NASA Curiosity Rover App](https://sabrinamarkon-react-nasa-api-mars-photos.netlify.app)

A problem with using the CSS opacity setting, though, is that when we change the opacity of an HTML element, its children inherit any semi-transparency.

So, say we have a nice semi-transparent &lt;div&gt; that allows the background to show through, but the &lt;div&gt; has a child &lt;span&gt;. If we use opacity: 0.7 on the parent &lt;div&gt;, for example, it would also cause the &lt;span&gt; to become semi-transparent. Often, this is undesirable, especially for text that we want to look bright and clear.

One approach that often helps me out here is to leave out the opacity property and instead use the rgba alpha value for the parent &lt;div&gt; background-color, with the red, green, and blue values set to 0:


```
.parentDiv {
    background-color: rgba(0,0,0,0.7); 
}
```

I know this doesn't apply to [ALL cases](https://stackoverflow.com/questions/5770341/i-do-not-want-to-inherit-the-child-opacity-from-the-parent-in-css), however it works frequently when we only want the parent to be semi-transparent.

Let me know any tricks you have learned to use with CSS transparency!

Sabrina




