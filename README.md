<p align="center">
  <a href="https://nodejs.org/api/https.html" target="blank"><img src="./assets/node.png" width="500" alt="Node Logo" /></a>
</p>

# Acerca de la API

Esta api permite crear un chat con varias conversaciones y varios participantes en cada una de ellas.
Tiene implementado una ruta de autenticación  utilizando la estrategia Json Web Token de Passport, asi como la verificación del rol del usuario para la autorización de algunas rutas.
La API utiliza el protocolo HTTP para la solicitud de los mensajes que son almacenados en una base de datos ```Postgres``` montado en un contenedor de ```Docker``` usando la imagen de Postgres:14.3.

# 🚀 Guia para la ejecución CHAT-API

# Stack usado
* Postgres
* NodeJS
* Express
* Sequelize
* Passport 
* Json Web Token
* Bcrypt
* UUID


# Chat - API

1. Clonar el repositorio
2. Instalar la dependencias
```
npm install
```
3. Copiar el archivo .env.template y renombrarlo como .env
4. Llenar las variables de entorno en funcion a la aplicacion
5. Abrir la aplicacion de docker en su computadora para que se reconozcan los comandos docker en la terminal (si no lo tiene instalado, descargue e instale [Docker](https://www.docker.com/products/docker-desktop/)
6. Levantar la base de datos en docker
```
docker compose up -d
```
7. Ejecutar la aplicacion en desarrollo
```
npm run dev
```

# Rutas de la aplicacion

* HOST API: http://localhost:9000/api/v1/

# Rutas Autenticación
<h3>POST </h3>

```
api/v1/auth/login
```

```
Example:
email: usuario@example.com
password: ******password*****
```
```
Retorna:

Status 200: Login correcto
Status 400: Request Incorrecto
Status 404: Usuario no encontrado
```

# Rutas Usuarios
<h3>GET</h3>

```
api/v1/users

Retorna:

Status 200: Retorna todos los usuarios
Status 400: Request Incorrecto
```
<h3>GET</h3>

```
api/v1/users/me

Retorna:

Status 200: Retorna la información de tu perfil
Status 400: Request Incorrecto
Status 404: Usuario no encontrado
```
<h3>GET</h3>

```
api/v1/users/:id

Parametros:
/:id - id del usuario buscado

Retorna:

Status 200: Retorna un usuario por ID
Status 400: Request Incorrecto
Status 404: Usuario no encontrado
```

<h3>POST</h3>

```
api/v1/users/
```
```
Modelo User:

id:type:UUID
firstName:type:STRING
lastName:type:STRING        
email:type: STRING
password:type: STRING
profileImage:type: STRING
phone:type:STRING
role:type: STRING Default:normal
status:type:STRING Default: active
isVerified:type:BOOLEAN Default: false

Required TRUE: 
id
firstName
lastName
email
password
phone    
```

```
Retorna:

Status 201: Usuario creado correctamente
Status 400: Request Incorrecto
```

<h3>PATCH</h3>

```
api/v1/users/me
```
```
Modelo User:

firstName:type:STRING
lastName:type:STRING        
email:type: STRING
password:type: STRING
profileImage:type: STRING
phone:type:STRING
```

```
Retorna:

Status 200: Edicion correcta de la información del propio perfil
Status 400: Request Incorrecto
Status 404: Usuario no encontrado
```

<h3>PATCH</h3>

```
api/v1/users/:id
```

```
Es necesario Rol:admin
```

```
Parametros:
/:id - id del usuario buscado
```

```
Modelo User:

firstName:type:STRING
lastName:type:STRING        
email:type: STRING
password:type: STRING
profileImage:type: STRING
phone:type:STRING
role:type: STRING Default:normal
status:type:STRING Default: active
isVerified:type:BOOLEAN Default: false
```

```
Retorna:

Status 200: Edicion correcta de la información del propio perfil
Status 400: Request Incorrecto
Status 404: Usuario no encontrado
```

<h3>DELETE</h3>

```
api/v1/users/me

Retorna:

Status 204: Eliminación correcta del perfil
Status 400: Request Incorrecto
Status 404: Usuario no encontrado
```


<h3>DELETE</h3>

```
api/v1/users/:id
```

```
Es necesario Rol:admin
```

```
Parametros:
/:id - id del usuario buscado
```

```
Retorna:

Status 204: Eliminación correcta del perfil del usuario buscado por ID
Status 400: Request Incorrecto
Status 404: Usuario no encontrado
```


# Rutas Conversaciones
## Rutas mis conversaciones

<h3>GET</h3>

```
api/v1/chats

Retorna:

Status 200: Retorna todas las conversaciones del sistema
Status 400: Request Incorrecto
Status 404: Conversación no encontrada
```
<h3>POST</h3>

```
api/v1/chats
```

```
Esquema conversacion:
 id:type:UUID
 title:type: STRING
 imageUrl:type: STRING
 userId:type:UUID

 Required TRUE:
 id
 title
 userId
```

```
Retorna:

Status 201: Crea una nueva conversación
Status 400: Request Incorrecto
```


<h3>GET</h3>

```
api/v1/chats/me

Retorna:

Status 200: Retorna todas las conversaciones donde esta mi ID
Status 400: Request Incorrecto
```
<h3>GET</h3>

```
api/v1/chats/me/owner

Retorna:

Status 200: Retorna todas las conversaciones creadas como propietario
Status 400: Request Incorrecto

```
## Rutas de las conversaciones

<h3>GET</h3>

```
api/v1/chats/:conversation_id
```

```
Parametros:
conversation_id: ID de la conversación
```

```
Retorna:

Status 200: Retorna una conversacion por ID
Status 400: Request Incorrecto
Status 404: Conversacion no encontrada
```


<h3>PATCH</h3>

```
api/v1/chats/:conversation_id
```

```
Esquema conversacion:
 title:type: STRING
 imageUrl:type: STRING
```

```
Retorna:

Status 200: Actualiza la información de una conversacion por ID
Status 400: Request Incorrecto
Status 404: Conversación no encontrada
```

<h3>DELETE</h3>

```
api/v1/chats/:conversation_id

Retorna:

Status 204: Elimina una conversacion por ID
Status 400: Request Incorrecto
Status 404: Conversación no encontrada
```

## Rutas de conversaciones con mensajes

<h3>GET</h3>

```
api/v1/chats/:conversation_id/messages
```

```
Parametros:
conversation_id: ID de la conversación
```

```
Retorna:

Status 200: Retorna todos los mensajes de una conversacion por ID
Status 400: Request Incorrecto, el usuario no es participante de la conversacion
Status 404: Conversacion no encontrada
```


<h3>GET</h3>

```
api/v1/chats/:conversation_id/messages/:message_id
```

```
Parametros:
conversation_id: ID de la conversación buscada
message_id: ID del mensaje buscado
```

```
Retorna:

Status 200: Retorna un mensaje en especifico de una conversación por ID
Status 400: Request Incorrecto, el usuario no es participante de la conversacion
Status 404: Mensaje no encontrado
```

<h3>POST</h3>

```
api/v1/chats/:conversation_id/messages
```

```
Parametros:
conversation_id: ID de la conversación buscada
```

```
Esquema mensaje:
 id:type:UUID
 userId:type: UUID
 conversationId:type: UUID
 message:type:TEXT

 Required TRUE:
 id
 userId
 conversationId
 message
```

```
Retorna:

Status 201: Crea un nuevo mensaje
Status 400: Request Incorrecto
```

<h3>DELETE</h3>

```
api/v1/chats/:conversation_id/messages/:message_id
```

```
Parametros:
conversation_id: ID de la conversación buscada
message_id: ID del mensaje buscado
```

```
Retorna:

Status 204: Elimina el mensaje por ID de la conversacion por ID
Status 400: Request Incorrecto, el usuario no es participante de la conversacion
Status 404: Mensaje no encontrado
```

## Rutas de conversaciones con participantes

<h3>GET</h3>

```
api/v1/chats/:conversation_id/participants
```

```
Parametros:
conversation_id: ID de la conversación
```

```
Retorna:

Status 200: Retorna todos los participantes de la conversacion
Status 400: Request Incorrecto
Status 404: Conversacion no encontrada
```


<h3>GET</h3>

```
api/v1/chats/:conversation_id/participants/:participant_id
```

```
Parametros:
conversation_id: ID de la conversación buscada
participant_id: ID del participante buscado
```

```
Retorna:

Status 200: Retorna un participante de la conversacion
Status 400: Request Incorrecto
Status 404: Participante no encontrado
```

<h3>POST</h3>

```
api/v1/chats/:conversation_id/participants
```

```
Parametros:
conversation_id: ID de la conversación donde se quiere agregar otro participante
```

```
Esquema para agregar un nuevo participante a una conversacion:
 id:type:UUID
 userId:type: UUID
 conversationId:type: UUID

 Required TRUE:
 id
 userId
 conversationId
 
```

```
Retorna:

Status 201: Participante agregado correctamente
Status 400: Request Incorrecto, el usuario no es participante de la conversacion
```

<h3>DELETE</h3>

```
api/v1/chats/:conversation_id/participants/:participant_id
```

```
Parametros:
conversation_id: ID de la conversación buscada
participant_id: ID del participante buscado
```

```
Retorna:

Status 204: Elimina el participante por ID de la conversacion por ID
Status 400: Request Incorrecto, el usuario no es participante de la conversacion
Status 404: Conversacion no encontrada
```




