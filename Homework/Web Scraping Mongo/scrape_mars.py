

import time
from splinter import Browser
from bs4 import BeautifulSoup
from selenium import webdriver
from sys import platform
import requests as req
import re
from bs4 import BeautifulSoup as bs
import pandas as pd
import pymongo

def news():

    mars_news_html = 'https://mars.nasa.gov/news/'
    response = req.get(mars_news_html)
    mars_news_soup = bs(response.text, "html.parser")
    news_title = mars_news_soup.find('div', class_='content_title').text
    news_title = news_title.strip('\n')

    news_p = mars_news_soup.find('div', class_='rollover_description_inner').text
    news_p = news_p.strip('\n')

    return news_title, news_p

def JPL():


    jpl_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    response = req.get(jpl_url)
    jpl_soup = bs(response.text, "html.parser")
    featured_image_url = jpl_soup.find('a', class_='fancybox')

    featured_image_url = featured_image_url['data-fancybox-href']

    featured_image_url = 'https://www.jpl.nasa.gov' + featured_image_url

    return featured_image_url

def mars_weather():

    mars_twitter = 'https://twitter.com/marswxreport?lang=en'
    response = req.get(mars_twitter)
    soup = bs(response.text, "html.parser")
    mars_username = '@MarsWxReport'
    tweets = soup.body.find_all('div',class_='tweet')
    mars_posts = []
    for tweet in tweets:
        if tweet.find_all('span',class_='username')[0].text == mars_username:
            mars_posts.append(tweet.find_all('p',class_='tweet-text')[0].text)
    mars_weather = mars_posts[0]
    return mars_weather

def facts():

    mars_facts_url = 'https://space-facts.com/mars/'

    mars_facts_table = pd.read_html(mars_facts_url)

    mars_facts_df = mars_facts_table[0]

    mars_facts_df

    mars_facts_html = mars_facts_df.to_html(index=False, header=None)

    mars_facts_html


    mars_facts_html.replace('\n', '')
    print(mars_facts_url)
    return mars_facts_html

def hemispheres():

    mars_hemis_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    response = req.get(mars_hemis_url)
    mars_hemis_soup = bs(response.text, 'html.parser')

    browser = Browser('chrome', executable_path='chromedriver', headless=False)
    browser.visit(mars_hemis_url)
    mars_hemis_images = mars_hemis_soup.find_all('a', class_='itemLink')

    hemisphere_image_urls = []

    for hem_img in mars_hemis_images:
    
        hemisphere_dict = {}
        title = hem_img.h3.text
        browser.click_link_by_partial_text(title)

        full_image_url = browser.find_by_css('.wide-image').first['src']
 
        hemisphere_dict['title'] = title
        hemisphere_dict['img_url'] = full_image_url
        hemisphere_image_urls.append(hemisphere_dict) 
    
        browser.back()
    # print(hemisphere_image_urls)
    return hemisphere_image_urls

def scrape():
    browser = Browser("chrome",headless=True)
    (news_title, news_p) = news()
    content = {
        'latest_news' : {
            'title' : news_title,
            'description' : news_p},
        'featured_image' : JPL(),
        'weather' : mars_weather(),
        'facts' : facts(),
        'hemispheres' : hemispheres(),
    }
    return content

def main():
    print(scrape())

if __name__ == '__main__':
    main()


