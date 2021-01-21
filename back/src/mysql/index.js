/*=============================================================================
 * Authors: Brian Ducca
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAM - CEIoT - Project Structure
 * Brief: MySQL Connector to DB using a connection pool.
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var mysql = require('mysql');

var configMySQL = {

    connectionLimit: 10, 
    host: 'mysql-server',
    port: '3306',
    user: 'root',
    password: 'userpass',
    database : 'DAM'
}

// Configuramos el pool.
var pool = mysql.createPool(configMySQL);

//=======[ Main module code ]==================================================

// verificamos la conexion
pool.getConnection((err, connection) => {
    
    if(err)
    {
        switch(err.code)
        {
            case 'PROTOCOL_CONNECTION_LOST':
            {
                console.log("Se cerró la conexión a la base de datos.");
                break;
            }
            case 'ER_CON_COUNT_ERROR':
            {
                console.log("Se Superó máxima cantidad de conexiones permitidas.");
                break;
            }
            case 'ECONNREFUSED':
            {
                console.log("La conexion fue rechazada");
                break;
            }
            default:
            {
                console.log("Se produjo el siguiente error:" + err.code);
                break;
            }
        }
    }

    if(connection)
    {
        connection.release;
    }
    return;
});

// Exportamos el pool para que pueda ser accedido desde cualquier parte de la aplicación.
module.exports = pool;

//=======[ End of file ]=======================================================
