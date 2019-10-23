<p align="center">
<a href="https://fireblogcms.com">
  <img alt="fireblogcms logo" src="https://avatars3.githubusercontent.com/u/56117968?s=600" />
</a>
  </p>
  <p align="center">
  <strong>gatsby-starter-fireblog</strong>
</p>

Hello there! 👋

This is our Gatsby starter, the purpose of this starter is to help you develop your own blog on top of your fireblog.
Thanks to Gatsby you can have a fast as light speed blog!

You can find a demonstration here: https://fireblog-gatsby-starter.netlify.com

## Features

- 📖 Paginated
- 🖼 Main post images are optimized and lazy loaded
- 📱 Works offline thanks to a service worker (the blog is a [PWA](https://developers.google.com/web/progressive-web-apps))
- 😎 [AMP](https://developers.google.com/amp/?hl=fr) compatible
- 😅 Easy to install and use
- 💄 Themable using CSS variables
- ✔ Very high score from [google lighthouse](https://developers.google.com/web/tools/lighthouse)
- ✨ Comes with a generated rss feed

<p align="center">
 <img width=300 src="https://user-images.githubusercontent.com/17828231/67390183-6b92d900-f59c-11e9-9669-95c0e401db00.png" alt="100% score in lighthouse" />
  <img width=300 src="https://user-images.githubusercontent.com/17828231/67390197-7483aa80-f59c-11e9-91d9-31d6f2f8cb64.png" alt="amp compatible" />
</p>


## How to use it

### Install it

First you have to install the starter, you have the choice to install gatsby CLI or not.

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

**This variable have to be set in order to make the starter works: `FIREBLOG_GRAPHQL_ENDPOINT`**

Environment variables are:

| code | mandatory | description |
|--|--|--|
| FIREBLOG_GRAPHQL_ENDPOINT | yes | fireblog endpoint, this endpoint can be found in your fireblog space. |
| IFRAMELY_API_KEY | no | iframely is used to generate third parties iframe (twitter, soundclound, instagram, etc) |
| GOOGLE_ANALYTICS_TRACKING_ID | no | used to track usage of your blog into google analystics. |

### Hack it

You can change theming informations like colors, or title, or socials informations into the `gatsby-config.js` file.

All commonly modified informations are on top of the file.

## Deploy

### netlify

### github pages
