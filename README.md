# Next JS, Tailwind, Contentful Starter

## Features
- Gatsby Image (fluid converter)
- Rich Text Notes (Contentful)
- [NextJS SEO](https://www.npmjs.com/package/next-seo)
- NextJS Site Map (Coming soon)
- NextJS PWA 
  - Make sure to change the manifest details and the _document.js information about the site (name description)
  - Add Icons to the manifest as well 
- NextJS Offline (Coming Soon)


## Notes
- Need to check that the `next-seo` plugin isn't affected by custom `_document`

### Next JS Site Map Options
```js
const sitemap = require('nextjs-sitemap-generator');  

sitemap({  
  alternateUrls: {  
      en: 'https://example.en',  
      es: 'https://example.es',  
      ja: 'https://example.jp',  
      fr: 'https://example.fr',  
  },  
  baseUrl: 'https://example.com',  
  ignoredPaths: ['admin'],
  extraPaths: ['/extraPath'],
  pagesDirectory: __dirname + "\\pages",  
  targetDirectory : 'static/',
  nextConfigPath: __dirname + "\\next.config.js",
  ignoredExtensions: [
        'png',
        'jpg'
  ],
  pagesConfig: {
    '/login': {
      priority: '0.5',
      changefreq: 'daily'
    }
  },
  sitemapStylesheet: [
    {
      type: "text/css",
      styleFile: "/test/styles.css"
    },
    {
      type: "text/xsl",
      styleFile: "test/test/styles.xls"
    }
  ]
});
```

#### Options Description 
* alternateUrls: You can add the alternate domains corresponding to the available language. (OPTIONAL)
* baseUrl: The url that it's going to be used at the beginning of each page.
* ignoreIndexFiles: Whether index file should be in URL or just directory ending with the slash (OPTIONAL)
* ignoredPaths: File or directory to not map (like admin routes).(OPTIONAL)
* extraPaths: Array of extra paths to include in the sitemap (even if not present in pagesDirectory) (OPTIONAL)
* ignoredExtensions: Ignore files by extension.(OPTIONAL)
* pagesDirectory: The directory where Nextjs pages live. You can use another directory while they are nextjs pages. It must to be an absolute path.
* targetDirectory: The directory where sitemap.xml going to be written.
* pagesConfig: Object configuration of priority and changefreq per route.(OPTIONAL)
* sitemapStylesheet: Array of style objects that will be applied to sitemap.(OPTIONAL)
* nextConfigPath(Used for dynamic routes): Calls exportPathMap if exported from nextConfigPath js file. See this to understand how to do it (https://github.com/zeit/next.js/blob/canary/examples/with-static-export/next.config.js) (OPTIONAL)