<p align="center">
<a href="https://fireblogcms.com">
  <img alt="fireblogcms logo" src="https://avatars3.githubusercontent.com/u/56117968?s=600" />
</a>
  </p>
  <p align="center">
  <strong>gatsby-starter-fireblog</strong>
</p>

Hello there! 👋
This is our Gatsby starter to help you develop your own blog on top of your [fireblog](https://fireblogcms.com/).
Thanks to Gatsby you can have a fast as light speed blog!

You can find a demonstration here: https://fireblog-gatsby-starter.netlify.com

## Features

<p align="center">
 <img width=300 src="https://user-images.githubusercontent.com/17828231/67390183-6b92d900-f59c-11e9-9669-95c0e401db00.png" alt="100% score in lighthouse" />
  <img width=300 src="https://user-images.githubusercontent.com/17828231/67390197-7483aa80-f59c-11e9-91d9-31d6f2f8cb64.png" alt="amp compatible" />
</p>

- ✔ Very high score from [google lighthouse](https://developers.google.com/web/tools/lighthouse)
- 📱 Works offline thanks to a service worker (the blog is a [PWA](https://developers.google.com/web/progressive-web-apps))
- 😎 [AMP](https://developers.google.com/amp/?hl=fr) compatible
- 🖼 Main post images are optimized and lazy loaded
- 😅 Easy to install and use
- 💄 Themable using CSS variables
- ✨ Comes with a generated RSS feed
- 📖 Paginated

## How to use it

### Install it

First, you have to install the starter, you have the choice to install gatsby CLI or not.

**with Gatsby CLI:**

```
npm install --global gatsby-cli
gatsby new my-blog https://github.com/fireblogcms/gatsby-starter-fireblog
```

**without Gatsby CLI:**

```
git clone my-blog git@github.com:fireblogcms/gatsby-starter-fireblog.git
cd my-blog
npm install
```

### Configure it

Then you have to create an .env file based on .env.template and fill variables

```
cp .env.template .env
```

**This variable has to be set to make the starter works: `FIREBLOG_GRAPHQL_ENDPOINT`**

Environment variables are:

| code | mandatory | description |
| -- | -- | -- |
| FIREBLOG_GRAPHQL_ENDPOINT | yes | fireblog endpoint, this endpoint can be found in your fireblog space. |
| IFRAMELY_API_KEY | no | [iframely](https://iframely.com/) is used to generate third parties iframes (twitter, soundclound, instagram, etc) |
| GOOGLE_ANALYTICS_TRACKING_ID | no | used to track usage of your blog into google analystics.|

### Hack it

You can change theming informations like colors, or title, or socials informations into the `gatsby-config.js` file.

All commonly modified informations are on top of the file.

## Deploy

### Netlify

One of our favourite way to deploy a _fireblog_ is to use [Netlify](https://www.netlify.com/) : it deploys automatically your site on each `git push` on `master` branch, and also each time your blog content changes, thanks to _webhooks_.

### Deploy on each `git push`

After creating an account on Netlify, you can follow this step by step tutorial to deploy your blog: https://www.netlify.com/blog/2016/02/24/a-step-by-step-guide-gatsby-on-netlify/#connecting-to-netlify

### Rebuild on content change

1. Create a new "build hook" in your Netlify site: Settings > build & deploy > "Build hooks". Give it the name of your fireblog.
2. Copy this build hook link (which will be something like `https://api.netlify.com/build_hooks/5d9de461a22cc284xhhh96e3`) and paste it into your fireblog webhooks : Blog settings > "Webhooks".
