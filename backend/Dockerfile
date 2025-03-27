# בחירת תמונת הבסיס
FROM node:16

# קביעת ספריית העבודה
WORKDIR /app

# העתקת קבצי הפרויקט
COPY package*.json /app/

# התקנת תלויות
RUN npm install

# התקנת TypeScript גלובלית בתוך הקונטיינר
RUN npm install -g typescript

# העתקת יתר הקבצים
COPY . /app/

# קמפול של קבצי TypeScript ל-JavaScript
RUN tsc

# חשיפת פורט השרת
EXPOSE 3000

# הפעלת השרת
CMD ["node", "src/index.js"]
