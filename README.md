![header](doc/header.png)

# Trabajo Práctico Final

Autor:

* Jose severiche

Docente:

* Brian Ducca

## Índice de contenidos

1. [Introducción general](#introducción)
2. [Instalación de dependencias](#instalación-de-dependencias)
3. [Ejecución de la aplicación](#ejecución-de-la-aplicación)
4. [Licencia](#licencia)

## Introducción general

El presente trabajo práctico final de la materia **Desarrollo de Aplicaciones Multiplataforma** tiene por objetivo el desarrollo de una aplicación que permite controlar un sistema de riego automatizado. Para el desarrollo de esta aplicacion se baso en los conceptos vistos en la materia para implementar una aplicación utilizando como base el framework **Angular** para diseñar una página web y mediante el framework **Ionic** transformarla en una aplicación para dispositivos móviles.

## Instalación de dependencias

Para poder ejecutar el "backend" de la aplicación se debe tener instalado Docker, ya que la aplicación fue desarrollada sobre un contenedor Docker, motivo por el cual es necesario instalar algunas dependencias antes de poder ejecutarla. Antes de realizar los siguientes pasos es necesario tener instalado Docker y Docker Compose. En la documentación oficial de Docker y de Docker Compose están los pasos para instalar las herramientas en todas las plataformas.

Por otro lado, para ejecutar la aplicación del "frontend" se requiere tener instalado el framework Ionic. Se diferencian dos situaciones.

### Node.js instalado con anterioridad

Si su computadora cuenta con Node.js instalado, seguramente cuente con el instalador **npm** que viene incluído por defecto, por lo que basta con ejecutar el siguiente comando para instalar el framework completo:

    $ npm install -g @ionic/cli

Ya instalado Ionic, esta aplicación hace uso de la biblioteca **Highcharts** para mostrar el gráfico de cada uno de los sensores. Es por eso que seguramente sea necesario instalarlo con el siguiente comando:

    $ npm install highcharts --save


### Node.js no instalado con anterioridad

En este caso será necesario instalar primero Node.js seguiendo la [página de descargas oficial](https://nodejs.org/en/). Una vez finalizada la instalación, se podrán seguir los pasos de la sección anterior para instalar Ionic.



## Ejecución de la aplicación

### Inicialización del "backend"

Una vez que se han instaladas todas las dependencias se podrá ejecutar la aplicación. Para ello, se deberá descargar éste repositorio con el siguiente comando desde una terminal:

         git clone https://github.com/severiche90/TP-DAM.git

Para inicializar el contenedor, primero se debe acceder al directorio donde se descargó el repositorio.

         cd back

Luego ejecutar el siguiente comando.

         docker-compose up

Una vez iniciado, ya se contará una la API en funcionamiento. Para cerrar el contenedor, se puede correr el comando ``docker-compose down`` desde otra terminal o bien utilizar el shortcut ``Ctrl+C``, obteniendo el mismo resultado.

NOTA: Puede suceder que la primera vez nodeJS no se pueda conectar a la base de datos, si esto sucede ejecutar

docker-compose down
docker-compose up

### Inicialización del "frontend"

Para mostrar la aplicación a través de una pestaña de un explorador web, se necesita acceder al siguiente directorio

    cd front

Y ejecutar el siguiente comando.

    ionic serve

Con éste último comando, la aplicación comenzará a compilar y en caso de que no existan errores, abrirá una nueva pestaña en la dirección ``http://localhost:8100/home``. Una vez abierta, es posible navegar a través de la misma utilizando la vista web o bien simulando un dispositivo móvil, haciendo ``Ctrl + Shift + I`` para acceder a las herramientas de desarrollador desde un navegador basado en Chromium.

## Licencia

Este proyecto se encuentra publicado bajo la licencia GPLv3. En [este enlace](https://www.gnu.org/licenses/quick-guide-gplv3.html) podrá encontrar más información sobre la misma.

![footer](doc/footer.png)
