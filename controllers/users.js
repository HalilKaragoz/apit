const { request } = require('express');
const db = require('../db.js');


// server.js veya index.js dosyanızda oluşturulacak API endpoint'i

// Yazarları listeler
// server.js veya index.js dosyanızda oluşturulacak API endpoint'i

// Yazarları listeler
 const getPosts =( req,res )=>
{
    const q =  " SELECT * FROM yazarlar";

    db.query(q , (err,data) =>{

    if (err) return res.send(err);   
    return res.status(200).json(data);
});

};

     const deleteUser = (req, res) => {
        const query = "DELETE FROM yazarlar WHERE id = ?";
const { id } = req. query;
console.log(id);
        db.query(query, [req.params.id], (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            if (data.affectedRows === 0) {
                return res.status(404).json({ error: "Yazar bulunamadı veya zaten silinmiş." });
            }
            res.status(200).json({ message: "Yazar başarıyla silindi." });
        });
    };
     const addUser = (req, res) => {
      const q = "INSERT INTO yazarlar(`issoyisim`, `unvan`, `yazarfotografi`) VALUES (?, ?, ?)";
      const values = [req.body.issoyisim, req.body.unvan, req.body.img];
    
      db.query(q, values, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Veritabanı hatası.", error: err });
        }
        return res.status(201).json({ message: "Yazar başarıyla eklendi.", data: data });
      });
    };

module.exports = {
    getPosts,
    deleteUser,
    addUser
};
    