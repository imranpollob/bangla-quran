import os
from bs4 import BeautifulSoup

directory = 'arabic'

for filename in os.listdir(directory):
    if filename.endswith(".html") and filename != 'list.html':
        print(os.path.join(directory, filename))
        data = None
        with open(os.path.join(directory, filename)) as f:
            data = f.read()
        with open(os.path.join(directory, filename), 'w') as f:
            soup = BeautifulSoup(data, features="html.parser")
            first_section = soup.find('section')
            span = soup.new_tag('span', attrs={'class': 'play-tips'})
            span.string = "নিচের ▶ বাটনে ক্লিক করুন"
            first_section.append(span)
            f.write(str(soup))

        # print(data)
    # exit()
