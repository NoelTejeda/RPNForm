#!/bin/bash
cd C:/Noel/CrudReactPostgresNode/server
npm start &
echo 'server started'

cd C:/Noel/CrudReactPostgresNode/client
npm start
echo 'Despliegue terminado con éxito'
