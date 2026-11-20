طريقة الاستخدام
================
1) ملف .nojekyll (ملف فارغ، اسمه بالضبط بنقطة في البداية)
   ضعه في جذر المستودع. من الجوال: GitHub > Add file > Create new file
   اكتب الاسم .nojekyll ثم Commit.

2) HTML عادي: انسخ محتويات plain-html إلى المستودع.
   تأكد أن الروابط نسبية: href="style.css" وليس href="/style.css"

3) مشروع يحتاج build (React/Vite/Next/Astro):
   - انسخ build-projects/.github إلى جذر المستودع.
   - انسخ ملف الإعداد المناسب من configs وغيّر REPO-NAME.
   - في Settings > Pages اجعل Source = GitHub Actions.
   - عدّل OUTPUT_DIR في deploy.yml (dist أو out أو build).

4) أسماء الملفات حساسة لحالة الأحرف (Style.css لا يساوي style.css).
