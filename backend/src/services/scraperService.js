const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

// User agent to use for requests
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

// Timeout for requests in milliseconds
const REQUEST_TIMEOUT = 10000;

// Maximum content length to process (in characters)
const MAX_CONTENT_LENGTH = 100000;

/**
 * Extract main content from a URL using a hybrid approach
 * @param {string} url - The URL to extract content from
 * @returns {Promise<{title: string, content: string, text: string, html: string}>} - Extracted content
 */
const extractContent = async (url) => {
  try {
    // First try with a simple HTTP GET
    const response = await axios.get(url, {
      headers: { 'User-Agent': USER_AGENT },
      timeout: REQUEST_TIMEOUT,
      maxContentLength: MAX_CONTENT_LENGTH,
      responseType: 'text',
      validateStatus: null, // Don't reject on non-2xx status
    });

    // Check if we need to use Puppeteer (client-side rendering)
    if (requiresPuppeteer(response.data)) {
      return await extractWithPuppeteer(url);
    }

    // Otherwise, use Cheerio for server-rendered content
    return extractWithCheerio(response.data, url);
  } catch (error) {
    console.error(`Error extracting content from ${url}:`, error.message);
    
    // Fallback to Puppeteer if the initial request fails
    if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return await extractWithPuppeteer(url);
    }
    
    throw new Error(`Failed to extract content: ${error.message}`);
  }
};

/**
 * Check if the page requires client-side rendering
 * @param {string} html - The HTML content to check
 * @returns {boolean} - True if Puppeteer is needed
 */
const requiresPuppeteer = (html) => {
  // Heuristics to determine if we need Puppeteer
  const checks = [
    // Check for common client-side rendering indicators
    html.includes('id="root"'),
    html.includes('id="app"'),
    html.includes('id="__next"'),
    html.includes('id="__nuxt"'),
    html.includes('id="app"'),
    html.includes('id="main"'),
    
    // Check for JavaScript framework indicators
    html.includes('ReactDOM.render'),
    html.includes('Vue.createApp'),
    html.includes('angular.module'),
    
    // Check for common SPA patterns
    html.includes('single-page application'),
    
    // Check for common JavaScript errors
    html.includes('enable JavaScript'),
    html.includes('Please enable JavaScript'),
    
    // Check for minimal content
    html.length < 150,
    
    // Check for common placeholder content
    html.includes('You need to enable JavaScript'),
    html.includes('Loading...'),
  ];
  
  return checks.some(Boolean);
};

/**
 * Extract content using Cheerio (server-side rendering)
 * @param {string} html - The HTML content
 * @param {string} url - The source URL
 * @returns {Promise<{title: string, content: string, text: string, html: string}>} - Extracted content
 */
const extractWithCheerio = (html, url) => {
  try {
    const $ = cheerio.load(html);
    
    // Remove unwanted elements
    $('script, style, noscript, iframe, nav, footer, header, aside, .ad, .ads, .advertisement, .sidebar, .comments, .social-share, .related-posts').remove();
    
    // Get the main content using common selectors
    const selectors = [
      'main',
      'article',
      '.post',
      '.content',
      '.main-content',
      '#content',
      '.article',
      'body',
    ];
    
    let content = '';
    for (const selector of selectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        content = element.html();
        break;
      }
    }
    
    // If no content found, use the whole body
    if (!content) {
      content = $('body').html();
    }
    
    // Clean up the content
    const text = $(content).text()
      .replace(/\s+/g, ' ')
      .trim();
    
    return {
      title: $('title').text().trim() || new URL(url).hostname,
      content: content || '',
      text: text || '',
      html: content || '',
    };
  } catch (error) {
    console.error('Error extracting with Cheerio:', error);
    throw new Error('Failed to parse content with Cheerio');
  }
};

/**
 * Extract content using Puppeteer (client-side rendering)
 * @param {string} url - The URL to extract content from
 * @returns {Promise<{title: string, content: string, text: string, html: string}>} - Extracted content
 */
const extractWithPuppeteer = async (url) => {
  let browser;
  try {
    // Launch Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu',
      ],
    });
    
    const page = await browser.newPage();
    await page.setUserAgent(USER_AGENT);
    await page.setViewport({ width: 1280, height: 800 });
    
    // Set request timeout
    page.setDefaultNavigationTimeout(REQUEST_TIMEOUT);
    page.setDefaultTimeout(REQUEST_TIMEOUT);
    
    // Navigate to the URL
    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: REQUEST_TIMEOUT,
    });
    
    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()} - ${response.statusText()}`);
    }
    
    // Get the page content
    const html = await page.content();
    const title = await page.title();
    
    // Use Readability to extract the main content
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    
    return {
      title: title || new URL(url).hostname,
      content: article?.content || '',
      text: article?.textContent || '',
      html: article?.content || '',
    };
  } catch (error) {
    console.error('Error extracting with Puppeteer:', error);
    throw new Error(`Failed to extract content with Puppeteer: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = {
  extractContent,
  extractWithCheerio,
  extractWithPuppeteer,
};
