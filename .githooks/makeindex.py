import os

file = open("article/0/include/page.html", "w", encoding="UTF-8")
file.write("<ul>\n")

files = os.listdir("article")
files.reverse()

for dir in files:
    if dir == "css" or dir == "js" or dir == "include":
        continue
    idx = int(dir)
    f = open(f"article/{idx}/index.html", "r", encoding="UTF-8")
    content = f.read()
    f.close()
    start = content.find('<h1 class="title">')
    end = content.find('</h1>')
    title = content[start+18:end]
    
    file.write(f"<li><a href=../{idx}><b>{title}</b></a>a</li>\n")

file.write("</ul>")
file.close()