import os
from bs4 import BeautifulSoup


a = [
    "1-sura-al-fatihah", "2-sura-al-baqarah", "3-sura-ali-imran",
    "4-sura-an-nisa", "5-sura-al-maidah", "6-sura-al-anam", "7-sura-al-araf",
    "8-sura-al-anfal", "9-sura-at-tawbah", "10-sura-yunus", "11-sura-hud",
    "12-sura-yusuf", "13-sura-ar-rad", "14-sura-ibrahim", "15-sura-al-hijr",
    "16-sura-an-nahl", "17-sura-al-isra", "18-sura-al-kahf", "19-sura-maryam",
    "20-sura-taha", "21-sura-al-anbya", "22-sura-al-haj", "23-sura-al-muminun",
    "24-sura-an-nur", "25-sura-al-furqan", "26-sura-ash-shuara",
    "27-sura-an-naml", "28-sura-al-qasas", "29-sura-al-ankabut",
    "30-sura-ar-rum", "31-sura-luqman", "32-sura-as-sajdah",
    "33-sura-al-ahzab", "34-sura-saba", "35-sura-fatir", "36-sura-ya-sin",
    "37-sura-as-saffat", "38-sura-sad", "39-sura-az-zumar", "40-sura-ghafir",
    "41-sura-fussilat", "42-sura-ash-shuraa", "43-sura-az-zukhruf",
    "44-sura-ad-dukhan", "45-sura-al-jathiyah", "46-sura-al-ahqaf",
    "47-sura-muhammad", "48-sura-al-fath", "49-sura-al-hujurat", "50-sura-qaf",
    "51-sura-adh-dhariyat", "52-sura-at-tur", "53-sura-an-najm",
    "54-sura-al-qamar", "55-sura-ar-rahman", "56-sura-al-waqiah",
    "57-sura-al-hadid", "58-sura-al-mujadila", "59-sura-al-hashr",
    "60-sura-al-mumtahanah", "61-sura-as-saf", "62-sura-al-jumuah",
    "63-sura-al-munafiqun", "64-sura-at-taghabun", "65-sura-at-talaq",
    "66-sura-at-tahrim", "67-sura-al-mulk", "68-sura-al-qalam",
    "69-sura-al-haqqah", "70-sura-al-maarij", "71-sura-nuh", "72-sura-al-jinn",
    "73-sura-al-muzzammil", "74-sura-al-muddaththir", "75-sura-al-qiyamah",
    "76-sura-al-insan", "77-sura-al-mursalat", "78-sura-an-naba",
    "79-sura-an-naziat", "80-sura-abasa", "81-sura-at-takwir",
    "82-sura-al-infitar", "83-sura-al-mutaffifin", "84-sura-al-inshiqaq",
    "85-sura-al-buruj", "86-sura-at-tariq", "87-sura-al-ala",
    "88-sura-al-ghashiyah", "89-sura-al-fajr", "90-sura-al-balad",
    "91-sura-ash-shams", "92-sura-al-layl", "93-sura-ad-duhaa",
    "94-sura-ash-sharh", "95-sura-at-tin", "96-sura-al-alaq",
    "97-sura-al-qadr", "98-sura-al-bayyinah", "99-sura-az-zalzalah",
    "100-sura-al-adiyat", "101-sura-al-qariah", "102-sura-at-takathur",
    "103-sura-al-asr", "104-sura-al-humazah", "105-sura-al-fil",
    "106-sura-quraysh", "107-sura-al-maun", "108-sura-al-kawthar",
    "109-sura-al-kafirun", "110-sura-an-nasr", "111-sura-al-masad",
    "112-sura-al-ikhlas", "113-sura-al-falaq", "114-sura-an-nas"
]

b = '''
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>বাংলা কোরআন অডিওসহ | Bangla Quran with audio</title>
    <meta
      name="description"
      content="সকল সূরাসমুহের আরবি ও বাংলা অনুবাদ অডিওসহ | Arabic and Bangla translation of whole Quran with audio"
    />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="বাংলা কোরআন অডিওসহ | Bangla Quran with audio" />
    <meta
      property="og:description"
      content="সকল সূরাসমুহের আরবি ও বাংলা অনুবাদ অডিওসহ | Arabic and Bangla translation of whole Quran with audio"
    />
    <meta property="og:url" content="https://www.quran.imranpollob.com/" />
    <meta property="og:site_name" content="Imran Pollob" />
    <meta
      property="og:image"
      content="https://www.quran.imranpollob.com/quran.png"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="stylesheet" href="/css/home.css" />

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-BJGFEWFC25"
    ></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "G-BJGFEWFC25");
    </script>
  </head>

  <body>
    <div class="wrapper">
      <header>
        <h1>কোরআন</h1>
        <h2>সকল সূরাসমুহের আরবি ও বাংলা অনুবাদ অডিওসহ</h2>
      </header>

      <div class="cards">
        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১। আল ফাতিহা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/1.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/1.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/1.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২। আল বাকারা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/2.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/2.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/2.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩। আলে ইমরান</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/3.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/3.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/3.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪। আন নিসা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/4.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/4.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/4.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫। আল মায়েদা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/5.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/5.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/5.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬। আল আনআম</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/6.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/6.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/6.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭। আল আরাফ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/7.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/7.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/7.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮। আল আনফাল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/8.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/8.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/8.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯। আত তাওবা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/9.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/9.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/9.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০। ইউনুস</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/10.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/10.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/10.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১১। হূদ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/11.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/11.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/11.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১২। ইউসুফ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/12.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/12.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/12.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১৩। আর্ রাদ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/13.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/13.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/13.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১৪। ইবরাহিম</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/14.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/14.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/14.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১৫। আল হিজর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/15.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/15.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/15.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১৬। আন্ নাহল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/16.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/16.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/16.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১৭। বনি ইসরাঈল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/17.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/17.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/17.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১৮। আল কাহফ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/18.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/18.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/18.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১৯। মরিয়ম</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/19.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/19.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/19.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২০। তোয়াহা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/20.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/20.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/20.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২১। আল আম্বিয়া</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/21.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/21.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/21.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২২। আল হজ্জ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/22.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/22.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/22.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২৩। আল মুমিনুন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/23.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/23.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/23.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২৪। আন্ নূর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/24.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/24.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/24.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২৫। আল ফুরকান</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/25.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/25.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/25.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২৬। আশ্ শোয়ারা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/26.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/26.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/26.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২৭। আন্ নামল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/27.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/27.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/27.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২৮। আল কাসাস</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/28.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/28.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/28.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">২৯। আল আনকাবুত</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/29.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/29.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/29.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩০। আর্ রূম</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/30.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/30.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/30.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩১। লুকমান</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/31.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/31.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/31.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩২। আস্ সাজদা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/32.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/32.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/32.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩৩। আল আহযাব</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/33.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/33.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/33.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩৪। আস্ সাবা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/34.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/34.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/34.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩৫। আল ফাতির</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/35.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/35.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/35.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩৬। ইয়াসিন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/36.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/36.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/36.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩৭। আস্ আস্ সফাত</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/37.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/37.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/37.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩৮। সোয়াদ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/38.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/38.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/38.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৩৯। আয্ যুমার</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/39.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/39.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/39.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪০। আল মুমিন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/40.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/40.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/40.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪১। হামিম আস সাজদা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/41.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/41.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/41.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪২। আশ্ শূরা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/42.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/42.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/42.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪৩। আয্ যুখরুফ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/43.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/43.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/43.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪৪। আদ্ দুখান</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/44.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/44.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/44.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪৫। আল জাসিয়া</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/45.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/45.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/45.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪৬। আল আহকাফ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/46.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/46.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/46.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪৭। মুহাম্মদ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/47.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/47.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/47.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪৮। আল ফাত্হ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/48.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/48.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/48.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৪৯। আল হুজুরাত</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/49.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/49.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/49.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫০। কাফ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/50.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/50.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/50.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫১। আয্ যারিয়াত</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/51.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/51.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/51.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫২। আত্ তূর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/52.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/52.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/52.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫৩। আন্ নাজম</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/53.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/53.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/53.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫৪। আল কামার</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/54.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/54.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/54.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫৫। আর রহমান</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/55.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/55.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/55.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫৬। আল ওয়াকিয়া</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/56.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/56.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/56.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫৭। আল হাদিদ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/57.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/57.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/57.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫৮। আল মুজাদালা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/58.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/58.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/58.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৫৯। আল হাশর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/59.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/59.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/59.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬০। আল মুমতাহানা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/60.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/60.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/60.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬১। আস্ সফ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/61.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/61.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/61.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬২। আল জুমুয়া</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/62.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/62.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/62.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬৩। আল মুনাফিকুন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/63.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/63.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/63.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬৪। আত্ তাগাবুন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/64.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/64.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/64.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬৫। আত্ তালাক</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/65.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/65.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/65.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬৬। আত্ তাহরিম</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/66.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/66.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/66.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬৭। আল মুলক</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/67.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/67.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/67.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬৮। আল কলম</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/68.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/68.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/68.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৬৯। আল হাককাহ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/69.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/69.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/69.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭০। আল মাআরিজ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/70.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/70.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/70.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭১। নূহ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/71.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/71.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/71.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭২। আল জিন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/72.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/72.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/72.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭৩। আল মুযযাম্মিল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/73.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/73.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/73.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭৪। আল মুদ্দাসসির</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/74.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/74.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/74.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭৫। আল কিয়ামা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/75.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/75.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/75.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭৬। আল ইনসান</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/76.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/76.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/76.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭৭। আল মুরসালাত</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/77.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/77.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/77.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭৮। আন্ নাবা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/78.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/78.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/78.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৭৯। আন্ নাযিয়াত</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/79.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/79.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/79.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮০। আবাসা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/80.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/80.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/80.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮১। আত্ তাকভীর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/81.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/81.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/81.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮২। আল ইনফিতার</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/82.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/82.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/82.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮৩। আল মুতাফ্ফিফীন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/83.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/83.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/83.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮৪। আল ইনশিকাক</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/84.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/84.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/84.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮৫। আল বুরূজ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/85.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/85.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/85.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮৬। আত তারিক</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/86.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/86.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/86.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮৭। আল আলা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/87.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/87.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/87.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮৮। আল গাশিয়া</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/88.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/88.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/88.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৮৯। আল ফাজর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/89.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/89.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/89.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯০। আল বালাদ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/90.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/90.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/90.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯১। আশ্ শামস</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/91.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/91.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/91.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯২। আল লাইল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/92.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/92.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/92.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯৩। আদ্ দোহা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/93.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/93.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/93.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯৪। আল ইনশিরাহ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/94.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/94.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/94.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯৫। আত্ তীন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/95.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/95.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/95.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯৬। আল আলাক</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/96.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/96.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/96.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯৭। আল কাদর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/97.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/97.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/97.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯৮। আল বাইয়্যেনা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/98.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/98.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/98.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">৯৯। যিলযাল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/99.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/99.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/99.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০০। আল আদিয়াত</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/100.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/100.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/100.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০১। আল কারিয়া</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/101.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/101.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/101.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০২। আত্ তাকাসুর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/102.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/102.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/102.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০৩। আল আসর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/103.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/103.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/103.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০৪। আল হুমাযা</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/104.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/104.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/104.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০৫। আল ফীল</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/105.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/105.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/105.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০৬। আল কুরাইশ</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/106.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/106.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/106.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০৭। আল মাউন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/107.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/107.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/107.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০৮। আল কাওসার</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/108.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/108.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/108.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১০৯। আল কাফিরূন</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/109.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/109.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/109.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১১০। আন্ নসর</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/110.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/110.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/110.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১১১। আল লাহাব</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/111.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/111.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/111.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১১২। আল ইখলাস</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/112.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/112.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/112.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১১৩। আল ফালাক</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/113.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/113.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/113.html">বাংলা</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-sura-info">
            <div class="card-sura-name">১১৪। আন্ নাস</div>
          </div>
          <div class="card-sura-links">
            <div class="card-sura-links-arabic-bangla">
              <a href="/arabic-bangla/114.html">আরবি ও বাংলা</a>
            </div>
            <div class="card-sura-links-arabic">
              <a href="/arabic/114.html">আরবি</a>
            </div>
            <div class="card-sura-links-bangla">
              <a href="/bangla/114.html">বাংলা</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

'''

directory = 'arabic'

for filename in os.listdir(directory):
    if filename.endswith(".html") and filename != 'list.html':
        # print(os.path.join(directory, filename))

        sura_no = int(filename.split('.')[0]) - 1
        print(filename, sura_no, a[sura_no])

        os.rename(os.path.join(directory, filename), os.path.join(directory, f'{a[sura_no]}-arabic.html'))

# c = ""

# for line in b.split('\n'):

#     if '<a href="/arabic-bangla/' in line:
#         digit = int(''.join(filter(str.isdigit, line)))
#         line = line.replace(f'<a href="/arabic-bangla/{digit}', f'<a href="/{a[digit-1]}-arabic-bangla')
#     if '<a href="/arabic/' in line:
#         digit = int(''.join(filter(str.isdigit, line)))
#         line = line.replace(f'<a href="/arabic/{digit}', f'<a href="/{a[digit-1]}-arabic')
#     if '<a href="/bangla/' in line:
#         digit = int(''.join(filter(str.isdigit, line)))
#         line = line.replace(f'<a href="/bangla/{digit}', f'<a href="/{a[digit-1]}-bangla')

#     line += '\n'
#     c += line
# print(c)

# a = open('s.txt', 'w')
# a.write(c)
