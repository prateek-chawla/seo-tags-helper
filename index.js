const mergeObjects = function (objA, objB) {
	if (typeof objB !== "object" || !objB) objB = {};
	return Object.assign(objA, objB);
};

const seoHelper = {
	config: {
		enableGeneral: true,
		enableFacebookOg: true,
		enableTwitter: true,
		enableRobots: true,
		useGeneralAsDefault: true,
	},

	defaultMeta: {},

	/**
	 * Overrides global configuration
	 * @param  {Object} config - Object of Configuration options
	 * @param  {boolean} [config.enableGeneral=true] - Enable General Meta Tags
	 * @param  {boolean} [config.enableFacebookOg=true] - Enable Tags for Facebook Open Graph
	 * @param  {boolean} [config.enableTwitter=true] - Enable Tags for Twitter Cards
	 * @param  {boolean} [config.enableRobots=true] - Allow / Disallow Robots
	 * @param  {boolean} [config.useGeneralAsDefault=true] - Use General tags as default for Facebook and Twitter
	 */

	setConfig(config = {}) {
		this.config = mergeObjects(this.config, config);
	},

	/**
	 * Sets default values, default values are used as fallbacks whenever a value is not explicitly specified
	 * @param  {Object} defaultMeta Object of default values
	 */

	setDefault(defaultMeta = {}) {
		this.defaultMeta = mergeObjects(this.defaultMeta, defaultMeta);
	},

	/**
	 * Constructs and Prints HTML Output
	 * @param  {Object} [meta={}] Object containing meta tags and values to be used
	 *
	 * General
	 * @param  {string} [meta.title] Meta Title
	 * @param  {string} [meta.desc] Meta Description
	 * @param  {string} [meta.image] Image to be used for Facebook and Twitter if `ogImage` or `twitterImage` is missing and `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.imageAlt] Alt Text for Image
	 * @param  {string} [meta.url] Url to be used for Facebook and Twitter if `ogUrl` or `twitterUrl` are missing and `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.favicon] Link to Favicon Image
	 *
	 * Facebook Open Graph
	 * @param  {string} [meta.ogTitle] Title to be used for Facebook Open Graph, defaults to `title` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.ogType] Type to be used for Facebook Open Graph - article, audio, video etc.
	 * @param  {string} [meta.ogDesc] Description to be used for Facebook Open Graph, defaults to `desc` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.ogImage] Image to be used for Facebook Open Graph, defaults to `image` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.ogImageAlt] Alt Text for `ogImage`
	 * @param  {string} [meta.ogUrl] Url to be used for Facebook Open Graph, defaults to `url` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.ogFbAppId] Facebook App ID
	 *
	 * Twitter Card
	 * @param  {string} [meta.twitterTitle]  Title to be used for Twitter Card, defaults to `title` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.twitterDesc] Description to be used for Twitter Card, defaults to `desc` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.twitterUrl] Url to be used for Twitter Card, defaults to `url` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.twitterImage] Image to be used for Twitter Card, defaults to `image` if `enableGeneralAsDefault` is set to true
	 * @param  {string} [meta.twitterImageAlt] Alt Text for `twitterImage`
	 *
	 * Configuration
	 * @param  {Object} [config={}] Configuration options
	 * @param  {boolean} [config.enableGeneral=true] - Enable General Meta Tags
	 * @param  {boolean} [config.enableFacebookOg=true] - Enable Tags for Facebook Open Graph
	 * @param  {boolean} [config.enableTwitter=true] - Enable Tags for Twitter Cards
	 * @param  {boolean} [config.enableRobots=true] - Allow/Disallow Robots
	 * @param  {boolean} [config.useGeneralAsDefault=true] - Use General tags as default for Facebook and Twitter
	 *
	 * @returns {string} String Containing HTML Output
	 */

	print(meta = {}, config = {}) {
		// Merge global and local config
		const mergedConfig = mergeObjects(this.config, config);
		const mergedMeta = mergeObjects(this.defaultMeta, meta);
		let output = "";

		if (mergedConfig.enableGeneral) {
			if (mergedMeta.title) output += `<title>${mergedMeta.title}</title>`;
			if (mergedMeta.favicon)
				output += `<link rel="icon" type="image/png" href="${mergedMeta.favicon}" />`;
			if (mergedMeta.desc) output += `<meta name="description" content="${mergedMeta.desc}" />`;

			if (mergedConfig.enableRobots) {
				output += '<meta name="robots" content="index,follow"/>';
			} else {
				output += '<meta name="robots" content="noindex,nofollow"/>';
			}
		}
		if (mergedConfig.enableFacebookOg) {
			if (mergedConfig.useGeneralAsDefault) {
				mergedMeta.ogTitle = mergedMeta.ogTitle || mergedMeta.title;
				mergedMeta.ogDesc = mergedMeta.ogDesc || mergedMeta.desc;
				mergedMeta.ogImage = mergedMeta.ogImage || mergedMeta.image;
				mergedMeta.ogUrl = mergedMeta.ogUrl || mergedMeta.url;
				mergedMeta.ogImageAlt = mergedMeta.ogImageAlt || mergedMeta.imageAlt || mergedMeta.ogTitle;
			}

			// All Four fields are required
			if (mergedMeta.ogType && mergedMeta.ogTitle && mergedMeta.ogImage && mergedMeta.ogUrl) {
				output +=
					`<meta property="og:title" content="${mergedMeta.ogTitle}" />` +
					`<meta property="og:type" content="${mergedMeta.ogType}" />` +
					`<meta property="og:description" content="${mergedMeta.ogDesc}" />` +
					`<meta property="og:url" content="${mergedMeta.ogUrl}" />` +
					`<meta property="og:image" content="${mergedMeta.ogImage}" />`;
				if (mergedMeta.ogImageAlt)
					output += `<meta property="og:image:alt" content="${mergedMeta.ogImageAlt}" />`;
				if (mergedMeta.ogFbAppId)
					output += `<meta property="fb:app_id" content="${mergedMeta.ogFbAppId}" />`;
			}
		}

		if (mergedConfig.enableTwitter) {
			if (mergedConfig.useGeneralAsDefault) {
				mergedMeta.twitterImage = mergedMeta.twitterImage || mergedMeta.image;
				mergedMeta.twitterUrl = mergedMeta.twitterUrl || mergedMeta.url;
				mergedMeta.twitterDesc = mergedMeta.twitterDesc || mergedMeta.desc;
				mergedMeta.twitterTitle = mergedMeta.twitterTitle || mergedMeta.title;
				if (mergedMeta.twitterImage)
					mergedMeta.twitterImageAlt =
						mergedMeta.twitterImageAlt || mergedMeta.imageAlt || mergedMeta.twitterTitle;
			}
			// Check Image Dimensions, check all if isset
			if (
				mergedMeta.twitterTitle &&
				mergedMeta.twitterUrl &&
				mergedMeta.twitterDesc &&
				mergedMeta.twitterImage
			) {
				output += '<meta name="twitter:card" content="summary"/>';
				if (mergedMeta.twitterTitle)
					output += `<meta name="twitter:title" content="${mergedMeta.twitterTitle}"/>`;
				if (mergedMeta.twitterUrl)
					output += `<meta name="twitter:url" content="${mergedMeta.twitterUrl}"/>`;
				if (mergedMeta.twitterDesc)
					output += `<meta name="twitter:description" content="${mergedMeta.twitterDesc}"/>`;
				if (mergedMeta.twitterImage)
					output += `<meta name="twitter:image" content="${mergedMeta.twitterImage}"/>`;
				if (mergedMeta.twitterImageAlt)
					output += `<meta name="twitter:image:alt" content="${mergedMeta.twitterImageAlt}"/>`;
			}
		}

		return output;
	},
};

module.exports = seoHelper;
