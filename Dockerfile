FROM node:14-alpine

# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы
COPY . .

# Соберите приложение
RUN npm run build

# Укажите команду для запуска приложения
CMD ["node", "dist/main"]
