/* Todos los archivos que están dentro del directorio api, crean rutas de api
donde según el nombre y la ubicación del archivo dentro de este directorio es como
crearan el endpoint, dentro de este endpoint podemos exportar por defecto una función,
la cual sera nuestro handler de las peticiones, sin importar el método HTTP que se 
utilice, en este mismo handler podemos hacer una condición para determinar el método
utilizado para la petición, si es GET, POST, PUT, DELETE, etc. */
export default function handler(req, res) {
  res.status(200).json({
    message: 'Hello World'
  })
}
