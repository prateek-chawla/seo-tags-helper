# SEO Tags Helper
Generates Meta Tags for SEO, Facebook Open Graph, Twitter Cards

<!-- CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#example-with-ejs">Example with ejs</a></li>
    <li><a href="#configuration-options">Configuration Options Reference</a></li>
    <li><a href="#meta-tags-data-reference">Meta Tags Data Reference</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


### Installation
```sh
npm i seo-tags-helper
```
### Getting Started
```javascript
// Node.js
const seoHelper = require('seo-tags-helper')
```
### Usage
```javascript
seoHelper.print( meta = {}, config = {} )
```

Returns the constructed HTML Output String, using data specified in `meta`.
 - `meta`
    An object containing data for meta tags, values specified here override the default values *(if specified)*

    <a href="#meta-tags-data-reference"> Refer Here </a> for a list of possible keys for `meta`

 - `config`
    An object containing configuration options, values specified here override the global configuration

    <a href="#configuration-options"> Refer Here </a> for a list of possible configuration options

---


```javascript
seoHelper.setConfig( config = {} )
```

Sets Global Configuration

<a href="#configuration-options"> Refer Here </a> for a list of possible configuration options

---

```javascript
seoHelper.setDefault( defaultMeta = {} )
```

Sets default values for meta tags data, default values are used as fallbacks for keys not specified in `seoHelper.print`

<a href="#meta-tags-data-reference"> Refer Here </a> for a list of possible keys for `defaultMeta`

---

#### Example with ejs
```javascript

// Controller
const seoHelper = require("seo-tags-helper");

// Set Default Value, acts as fallback
seoHelper.setDefault({ title: "Dummy Title" });

// Set Global Config
seoHelper.setConfig({ enableRobots: false, enableFacebookOg: false });

module.exports.dummy = (req, res) => {

	const metaData = {
		title: "Lorem Ipsum",
		favicon: "https://picsum.photos/60",
		desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",

		twitterTitle: "Twitter - Dummy Title",
		twitterDesc:  "Twitter - Lorem ipsum dolor sit amet consectetur adipisicing elit",
		twitterImage: "https://picsum.photos/400",
		twitterUrl: "https://www.lipsum.com/",
	};

		// Pass Data To view
		res.render("view", { metaData, seoHelper });
	});
};

```

```ejs

<!-- View -->

<html>

  <head>
    <!-- Pass config as the second argument, overrides global config -->
    <%- seoHelper.print(metaData, { useGeneralAsDefault: false } ) %>
  </head>

  <body>
    Hello World
  </body>

</html>

```
---

#### Configuration Options

| Option              	| Default 	| Description                                          	|
|---------------------	|---------	|------------------------------------------------------	|
| enableGeneral       	| true    	| Enable General Meta Tags                             	|
| enableFacebookOg    	| true    	| Enable Tags for Facebook Open Graph                  	|
| enableTwitter       	| true    	| Enable Tags for Twitter Cards                        	|
| enableRobots        	| true    	| Allow / Disallow Robots                                	|
| useGeneralAsDefault 	| true    	| Use General tags as default for Facebook and Twitter 	|


#### Meta Tags Data Reference
| Key             	| Description                                                                                                                     	|
|-----------------	|---------------------------------------------------------------------------------------------------------------------------------	|
| title           	| Meta Title                                                                                                                      	|
| desc            	| Meta Description                                                                                                                	|
| image           	| Image to be used for Facebook and Twitter if `ogImage` or `twitterImage` is missing and `enableGeneralAsDefault` is set to true 	|
| imageAlt        	| Alt Text for Image                                                                                                              	|
| url             	| Url to be used for Facebook and Twitter if `ogUrl` or `twitterUrl` are missing and `enableGeneralAsDefault` is set to true      	|
| favicon         	| Link to Favicon Image                                                                                                           	|
| ogTitle         	| Title to be used for Facebook Open Graph, defaults to `title` if `enableGeneralAsDefault` is set to true                        	|
| ogType          	| Type to be used for Facebook Open Graph - article, audio, video etc.                                                            	|
| ogDesc          	| Description to be used for Facebook Open Graph, defaults to `desc` if `enableGeneralAsDefault` is set to true                   	|
| ogImage         	| Image to be used for Facebook Open Graph, defaults to `image` if `enableGeneralAsDefault` is set to true                        	|
| ogImageAlt      	| Alt Text for `ogImage`                                                                                                          	|
| ogUrl           	| Url to be used for Facebook Open Graph, defaults to `url` if `enableGeneralAsDefault` is set to true                            	|
| ogFbAppId       	| Facebook App ID                                                                                                                 	|
| twitterTitle    	| Title to be used for Twitter Card, defaults to `title` if `enableGeneralAsDefault` is set to true                               	|
| twitterDesc     	| Description to be used for Twitter Card, defaults to `desc` if `enableGeneralAsDefault` is set to true                          	|
| twitterUrl      	| Url to be used for Twitter Card, defaults to `url` if `enableGeneralAsDefault` is set to true                                   	|
| twitterImage    	| Image to be used for Twitter Card, defaults to `image` if `enableGeneralAsDefault` is set to true                               	|
| twitterImageAlt 	| Alt Text for `twitterImage`                                                                                                     	|

<!-- CONTACT -->
### Contact
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://www.linkedin.com/in/prateekchawla12/)