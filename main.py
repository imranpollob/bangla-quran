from bs4 import BeautifulSoup
import os

for filename in os.listdir():
    if filename.endswith('.html') and filename[0].isdigit():
        print(filename)
        with open(filename, 'r', encoding="utf-8") as f1:
            input_text = f1.read()

        with open(filename, 'w', encoding="utf-8") as f:
            soup = BeautifulSoup(input_text, features="html.parser")
            # print(*soup.find_all('p'), sep="\n\n\n")
            i = 1
            for p in soup.find_all('p'):
                if i % 2 == 0:
                    i += 1
                    continue
                if i == 1:
                    p.replace_with(BeautifulSoup("<h1>" + p.text + "</h1>", 'html.parser'))
                else:
                    p.replace_with(BeautifulSoup("<h3>" + p.text + "</h3>", 'html.parser'))
                i += 1

            f.writelines(str(soup))
        # break
