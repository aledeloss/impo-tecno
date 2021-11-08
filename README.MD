# API DE SISTEMA DE PEDIDOS DE TECNOBOX

## PRODUCTOS

### VER TODOS LOS PRODUCTOS

RUTA: /productos/all
MÉTODO: FETCH
USUARIO: Solo pueden verlo usuarios logueados
DEVUELVE: Un array de objetos, de acuerdo a la siguiente estructura:
[
{
"_id": "614cd9aebeb8eaf0dcb965c3",
"category": "cuadernitos",
"trademark": "marquitas",
"name": "notabook",
"price": 24.34,
"stock": 100,
"status": "No sè",
"enabled": true,
"ts_create": "2021-09-23T19:46:54.129Z",
"ts_update": "2021-09-23T19:46:54.129Z",
"__v": 0
},
{
"_id": "614ce17ba25bc3402579fd34",
"category": "Fuentes",
"trademark": "bic",
"name": "biromes",
"price": 24.34,
"stock": 100,
"status": "Sin stock",
"enabled": true,
"ts_create": "2021-09-23T20:20:11.188Z",
"ts_update": "2021-09-23T20:21:24.429Z",
"__v": 0
},
{
"_id": "614ce55d2b3e54a7b8f60144",
"category": "Fuentes",
"trademark": "bic",
"name": "Placas",
"price": 24.34,
"stock": 100,
"status": "En stock",
"enabled": true,
"ts_create": "2021-09-23T20:36:45.338Z",
"ts_update": "2021-09-23T20:36:45.339Z",
"__v": 0
}
]

### CREAR UN PRODUCTO

RUTA: /productos/create
MÉTODO: POST
USUARIO: Solo pueden verlo el usuario administrador
BODY: Hay que hacer un post con la siguiente estructura:
{
"category": "Fuentes",
"trademark": "bic",
"name": "Placas",
"price": 24.34,
"stock": 100,
"status": "En stock"
}

### VER PRODUCTO PARA EDITAR

RUTA: /productos/:id/edit
MÉTODO: GET
USUARIO: Solo pueden verlo el usuario administrador
DEVUELVE: Un objecto con la siguiente estructura

- Hay que hacer un post con la siguiente estructura:
  {
  "\_id": "6146972a76346c3075538279",
  "category": "pliplin",
  "trademark": "marquitas",
  "name": "compu",
  "price": 10023,
  "stock": 90,
  "status": "Sin stock",
  "enabled": true,
  "ts_create": "2021-09-19T01:49:30.032Z",
  "ts_update": "2021-09-19T03:35:56.520Z",
  "\_\_v": 0
  }

### EDITAR UN PRODUCTO PARA MOSTRAR EN LA LISTA DE PRODUCTOS

RUTA: /productos/:id/edit
MÉTODO: PUT
USUARIO: Solo pueden verlo el usuario administrador
BODY: Hay que hacer un post con la siguiente estructura:
{
"\_id": "614ce17ba25bc3402579fd34",
"category": "Motherboard",
"trademark": "bic",
"name": "biromes",
"price": 24.34,
"stock": 100,
"status": "Sin stock"
}
