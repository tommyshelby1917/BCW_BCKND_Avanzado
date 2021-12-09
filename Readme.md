# Josep Miquel Arenas Beltran - Keepcoding
# Nodepop
# Node.js / MongoDB / Express

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

  1) En el frontpage -> localhost:3000
  2) En un JSON -> localhost:3000/api/posts
  3) Podemos obtener la lista de tags en -> localhost:3000/api/posts/tags

## ¿Cómo hago una consulta a la API de Nodepop?

- Hay que pasarle uno o más parámetros configurados para la API, en la query a la URL. Por ejemplo:

  1) En el frontpage -> localhost:3000/?price=50
  2) En un JSON -> localhost:3000/api/posts?price=50

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
  - Podemos hacer un post a nuestra API, incluyendo en el cuerpo el siguiente esqueleto. Todos los campos son requeridos:
    - name (String)
    - sale (Boolean)
    - price (Number)
    - photo (String)
    - tags (Array)


