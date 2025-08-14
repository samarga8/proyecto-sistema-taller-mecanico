El backend utiliza MySQL como base de datos. Es necesario configurar la URL, el usuario y la contraseña de la base de datos en el archivo application.properties.

# URL de la base de datos MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/nombre_base_datos

# Usuario de la base de datos
spring.datasource.username=tu_usuario

# Contraseña de la base de datos
spring.datasource.password=tu_contraseña

# Controlador de la base de datos (MySQL)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración de Hibernate (JPA)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Configuración del puerto del servidor
server.port=8080
# Configuración de correo electrónico
email.username=tu_correo@gmail.com
email.password=tu_contraseña_o_clave_de_aplicacion

# Configuración de Stripe
stripe.key.secret=sk_test_tu_clave_secreta_de_stripe
stripe.key.public=pk_test_tu_clave_publica_de_stripe

