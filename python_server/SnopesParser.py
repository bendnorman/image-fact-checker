import urllib2
from bs4 import BeautifulSoup

from PIL import Image
import imagehash
import requests
from io import BytesIO

import csv


class SnopesParser:

    def __init__(self, threshold):
        self.hash_and_ratings = []
        
        self.comparison_threshold = threshold

    def start(self):
        snopes_url = 'https://snopes.com/fact-check/category/photos/'
        page = urllib2.urlopen(snopes_url)
        soup = BeautifulSoup(page, 'html.parser')

        articles = soup.find('main').findChildren('article')

        for article in articles:
            article_url = article.find('a')['href']
            rating_hash_tuple = self.parse_snopes_article(article_url)
            if rating_hash_tuple is not None:
                self.hash_and_ratings.append(rating_hash_tuple)

    def parse_snopes_article(self, article_url):
        """ Return a tuple of (image hash, rating, articl), or none if it is not an image

        """
        page = urllib2.urlopen(article_url)
        soup = BeautifulSoup(page, 'html.parser')

        try:
            image_url = soup.find('header', attrs={'class': 'post-header-card'}).find(
                'img', attrs={'class': 'bg-image'})['data-lazy-src']

            response = requests.get(image_url)
            img = Image.open(BytesIO(response.content))
            hash = imagehash.average_hash(img)
            rating = soup.find(
                'span', attrs={'class': 'rating-name'}).getText()
            return {'hash': hash, 'rating': rating, 'article_url': article_url}

        except:
            return None
        
    def image_compare(self, image_url):
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))
        hash = imagehash.average_hash(img)
        
        print "Checking for a match in the database..."
        for article in self.hash_and_ratings:
            if article['hash'] - hash <= self.comparison_threshold:
                return (article['article_url'], article['rating'])
        return None
        # scrape
        # hash
        # save
