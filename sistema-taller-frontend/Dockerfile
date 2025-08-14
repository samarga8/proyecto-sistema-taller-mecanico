# Fase de construcción
FROM node:18 AS build

WORKDIR /app

# Copiar package.json y package-lock.json para optimizar la instalación de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir el proyecto para producción
RUN npm run build

# Fase de producción: usar Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiar los archivos construidos a la carpeta predeterminada de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto 80 (puerto por defecto de Nginx)
EXPOSE 80

# Iniciar Nginx en modo foreground
CMD ["nginx", "-g", "daemon off;"]
