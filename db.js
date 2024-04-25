const mysql = require('mysql2');
const config = {
  host: "localhost",
  user: "root",
  password: "Kara408408!",
  database: "haber"
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(config);

  connection.connect(function(err) {
    if (err) {
      console.error('Veritabanı bağlantısı başarısız oldu: ' + err.stack);
      setTimeout(handleDisconnect, 2000);
    }
    console.log('Veritabanına başarıyla bağlandı, bağlantı kimliği: ' + connection.threadId);
  });

  connection.on('error', function(err) {
    console.error('Veritabanı hatası: ', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;