# Online Store Project

## Integrantes
-David Donneys
-Alejandro Muñoz
-Samuel Ibarras

## Descripción

Este proyecto es una tienda en línea desarrollada como proyecto final de curso. La tienda permite a los administradores agregar productos al inventario y a los clientes comprar productos. Se genera una factura para cada compra realizada por un cliente. La gestión de datos se realiza de forma volátil, es decir, los datos permanecen mientras el programa principal está en ejecución.

## Requisitos Funcionales

1. **Roles de Usuario:**
   - **Administrador:**
     - Iniciar sesión en su cuenta.
     - Agregar nuevos productos al inventario especificando nombre, descripción, precio y cantidad disponible.
   - **Cliente:**
     - Registrarse o iniciar sesión en su cuenta.
     - Ver la lista de productos disponibles.
     - Agregar productos al carrito de compras.
     - Realizar una compra, generando una factura con los detalles de los productos comprados, la cantidad y el precio total.
     - Ver el historial de compras anteriores.

2. **Servicios Prestados:**
   - **Administrador:** Agregar productos al inventario.
   - **Cliente:** Navegar productos, agregar al carrito y realizar compras.

## Tecnologías Utilizadas

- **Backend:** Node.js, Express
- **Frontend:** HTML, CSS, JavaScript
- **Autenticación:** JSON 

## Como iniciar el servidor

Una vez abierto el proyecto se crear una terminal y ejecutar los siguientes comandos en orden:
1. cd server

2. npm start