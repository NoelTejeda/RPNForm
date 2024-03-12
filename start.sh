#!/bin/bash
cd C:/proyectos/RPNForm/server
npm start &
echo 'server started'

cd C:/proyectos/RPNForm/client
npm start
echo 'Despliegue terminado con éxito'
