import os

from bs4 import BeautifulSoup

soup = BeautifulSoup(open("home/index.html", encoding="UTF-8"), 'html.parser')

print(soup)