# Josep Miquel Arenas Beltran - Keepcoding

# Backend avanzado

## ¿Qué és Nodepop?

- Nodepop es un servicio de compra y venta de artículos online, donde existe la posibilidad de poder filtrar anuncios por: nombre, precios y su rango, tag, si está alguien está interesado en comprarlo o venderlo.

## Inicializar la base de datos

- Para borrar posible contenido que se haya creado anteriormente y **reinicializar la base de datos** puedes ejectuar el siguiente comando:

```sh
npm run initDB
```

## ¿Cómo arrancar MongoDB en Mac y Linux?

- **Descargamos MongoDB desde su página oficial**, descomprimimos el archivo y dentro de la carpeta descomprimida ejecutamos los siguientes comandos:

```sh
sudo mkdir -p /data/db

./bin/mongod -dbpath ./data/db
```

## La APP mongod no se puede abrir porque no se puede verificar el desarrollador

- Si eres un usuario de MacOS, recuerda que tendrás que permitir la apertura de MongoDB, verificando su desarrollador desde la pestanya de Seguridad en Preferencias del Sistema.

## ¿Qué tengo que hacer para arrancar la aplicación?

```sh
npm start
```

- Si todo ha ido bien veremos el siguiente mensaje en consola y entonces podremos empezar a usar la aplicación.

  ```sh
  'The application NODEAPI its now connected to a DATABASE (MongoDB)!'
  ```

## ¿De qué manera puedo utilitzar la API de Nodepop y cuales son sus rutas disponibles?

- Tenemos dos manera de visualizar los resultados que nos devuelve nuestra API:

  1. En el frontpage -> localhost:3000
  2. En un JSON -> localhost:3000/api/posts
  3. Podemos obtener la lista de tags en -> localhost:3000/api/posts/tags

## ¿la API está abierta a todo el mundo?

- No, tienes que ser un usuario registrado. Para hacer peticiones a la API es necesario hacer un get a la ruta api/login con los siguientes campos:

  - email (string)
  - password (string)

  Si las credenciales son correctas, nos devolvera un JWToken que hay que colocar en el header (Authentication). Eso permitira consumir nuestra API.

## ¿Cómo hago una consulta a la API de Nodepop?

- Hay que pasarle uno o más parámetros configurados para la API, en la query a la URL. Por ejemplo:

  1. En el frontpage -> localhost:3000/?price=50
  2. En un JSON -> localhost:3000/api/posts?price=50

## ¿Qué parametros acepta la API de Nodemon?

- Podemos filtrar los anuncios por
  - Nombre: /api/posts?name=bicicleta
  - Tag: /api/posts?tag=motor
  - Venta / Compra: /api/posts?sale=true
  - Precio: /api/posts?price=50
    - 10-50: Buscará anuncios con un precio entre 10€ i 50€
    - 50-: Buscará anuncios con un precio mayor que 50€
    - -50: Buscará anuncios con un precio menor que 50€
    - 50: Buscará anuncios con un precio exacto de 50€
- También están disponibles las siguientes funcionalidades:
  - Skip: /api/posts?skip=1
    - Ignorar la cantidad de anuncios que le pasemos en la query.
  - Select: /api/posts/?select=name
    - Muestra solo los campos del schema que le pasemos en la query. En este caso solo enseñaría el nombre de cada anuncio.
  - Sort: /api/posts/?sort=price
    - Ordena los anuncios por el campo que le indiquemos en la query. En este caso ordenaria la respuesta por el precio de manera ascendente.
  - Limit: /api/posts/?limit=2
    - Muestra un numero máximo de anuncios. En este caso sólo mostraria 2 anuncios.

## ¿Cómo podemos publicar un anuncio?

- Podemos hacer un post a nuestra API, incluyendo en el cuerpo el siguiente esqueleto y en modo form-data. Todos los campos son requeridos:
  - name (String)
  - sale (Boolean)
  - price (Number)
  - photo (File)
  - tags (Array)

## Esta aplicacion tiene una dependencia que es un microservicio que se encarga de generar thumbnails.

- La dependencia está situada en **microservices/thumbnailService**

- Los thumbnails generados se guardaran en **public/thumbnails**

## ¿Qué tengo que hacer para arrancar el servicio?

```sh
cd microservices
node thumbnailService.js
```
