---
title: 'Deploying Gatsby to a Subfolder'
tags: ["gatsby", "javascript", "react"]
published: true
date: '2020-03-22'
---
I was even more surprised and delighted with how easy and fun Gatsby is than I expected from reviews! Setting up the development environment is a piece of cake, as is applying a theme and customizing it in my own happy little way.

Deployment is simple too, except I did run across one small wrinkle!

I wanted to run my blog in a subfolder off the root of my domain, so I could still have my portfolio on the main domain, then allow people to click a button to get to my blog in the /blog subfolder. I expected that I could simply build then upload the contents of Gatsby's /public folder to /blog. That is how it usually works!

It turned out that once I ran the build, however, Gatsby defaults to the assumption that the site is in the root folder, which causes **relative links to static assets to break**. So, the picture of my face on the sidebar disappeared, and the pagination links failed, for instance. 

No worries though!

If this happens to you, it is only a few super short, easy steps to fix!

1. Open your gatsby-config.js file and add the following in the module.exports section:

   ```
   module.exports = {
     pathPrefix: `/blog`,
   }
   ```

1. In your shell, build Gatsby with the --prefix-paths option. If you don't do this, Gatsby will again default to the root folder.

   ```
   gatsby build --prefix-paths
   ```

1. According to the [Gatsby Documentation](https://www.gatsbyjs.org/docs/path-prefix Gatsby Documentation), you can now serve your Gatsby site with the --prefix-paths flag as well, like:

   ```
   gatsby serve --prefix-paths
   ```

   My domain lives on my dedicated LAMP server with cPanel, so because the Apache web server is already available to the directory, I don't use the serve command. Rather, I simply upload the contents of Gatsby's /public folder directly into my /blog subfolder for my domain. The serve command with --prefix-paths would normally be required, but I want to make sure that people who want to host their site on cPanel know how easy it is for them to deploy Gatsby as well!

I'd love to hear about your experiences with Gatsby if you have discovered any interesting goodies, or even if you have a problem you'd like help solving that we could solve together!

Sabrina




