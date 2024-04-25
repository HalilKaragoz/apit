const { request } = require('express');
const db = require('../db.js');
const cookieParser = require('cookie-parser');




const addPost =( req,res )=>
{


  


  const q = "INSERT INTO posts(`title`, `desc`, `img`, `imgiki`, `imguc`, `imgdort`, `uid`, `date`, `cat`, `video`,`keywords`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.imgiki,
    req.body.imguc,
    req.body.imgdort,
    req.body.uid,
    req.body.date,
    req.body.cat,
    req.body.video,
    req.body.keywords, // 'video' alanı eklendi
  ];

    db.query(q,[values],(err,data)=> {
      if (err) return res.status(500).json(err);
      return res.json("post oluşturuldu");
    })
    
}
  const getPosts = (req, res) => {
  // Sorguda ORDER BY anahtar kelimesi ile sıralama yapıyoruz.
  const q = req.query.cat 
    ? "SELECT * FROM posts WHERE cat=? "
    : "SELECT * FROM posts ";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.send(err);
    return res.status(200).json(data);
  });
};

 const getPost =( req,res )=>
{
    
    
        const id = req.params.id;
        const q = "SELECT p.*, u.username, u.isimsoyisim FROM posts p  JOIN users u ON p.uid = u.id WHERE p.id = ?;";
        db.query(q, [id], (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.length) {
            return res.status(200).json(data[0]);
          } else {
            return res.status(404).send("Post not found");
          }
        });
    
}
 const deletePost = (req, res) => {
  // Gönderi ID'sini URL parametresinden al
  const postId = req.params.id;

  // Veritabanında bu ID'ye sahip gönderiyi bul
  const q = "SELECT * FROM posts WHERE id = ?";
  db.query(q, [postId], (err, data) => {
    if (err) {
      console.error("Veritabanı sorgusu sırasında hata:", err);
      return res.status(500).json("Sunucu hatası.");
    }
    if (data.length === 0) {
      return res.status(404).json("Gönderi bulunamadı.");
    }

    // Gönderiyi silmek için yeni bir SQL sorgusu hazırla
    const deleteQuery = "DELETE FROM posts WHERE id = ?";
    db.query(deleteQuery, [postId], (deleteErr, deleteData) => {
      if (deleteErr) {
        console.error("Veritabanı sorgusu sırasında hata:", deleteErr);
        return res.status(500).json("Sunucu hatası.");
      }
      if (deleteData.affectedRows === 0) {
        return res.status(404).json("Gönderi bulunamadı veya zaten silinmiş.");
      }
      res.status(200).json("Gönderi başarıyla silindi.");
    });
  });
};

 const updatePost = (req, res) => {
  const postId = req.params.id;
  console.log(postId); // Post ID'sini konsola yazdır

  const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=?,`video`=? WHERE `id`=?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.video
  ];
console.log()
  db.query(q, [...values, postId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (data.affectedRows === 0) {
      // Eğer güncellenecek bir satır bulunamazsa
      return res.status(404).json("Güncellenecek post bulunamadı.");
    }
    return res.json("Post başarıyla güncellendi.");
  });
};

 const updatePostiki = (req, res) => {
  const postId = req.params.id;
  console.log(postId); // Post ID'sini konsola yazdır

  // 'imgiki' sütunu için güncelleme sorgusu
  const q = "UPDATE posts SET `imgiki`=? WHERE `id`=?";
  const values = [
    req.body.imgiki
  ];

  db.query(q, [...values, postId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (data.affectedRows === 0) {
      // Eğer güncellenecek bir satır bulunamazsa
      return res.status(404).json("Güncellenecek post bulunamadı.");
    }
    return res.json("Postun imgiki sütunu başarıyla güncellendi.");
  });
};

 const updatePostuc = (req, res) => {
  const postId = req.params.id;
  console.log(postId); // Post ID'sini konsola yazdır

  // 'imgiki' sütunu için güncelleme sorgusu
  const q = "UPDATE posts SET `imguc`=? WHERE `id`=?";
  const values = [
    req.body.imguc
  ];

  db.query(q, [...values, postId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (data.affectedRows === 0) {
      // Eğer güncellenecek bir satır bulunamazsa
      return res.status(404).json("Güncellenecek post bulunamadı.");
    }
    return res.json("Postun imguc sütunu başarıyla güncellendi.");
  });
};

 const updatePostdort = (req, res) => {
  const postId = req.params.id;
  console.log(postId); // Post ID'sini konsola yazdır

  // 'imgiki' sütunu için güncelleme sorgusu
  const q = "UPDATE posts SET `imgdort`=? WHERE `id`=?";
  const values = [
    req.body.imgdort
  ];

  db.query(q, [...values, postId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    if (data.affectedRows === 0) {
      // Eğer güncellenecek bir satır bulunamazsa
      return res.status(404).json("Güncellenecek post bulunamadı.");
    }
    return res.json("Postun imguc sütunu başarıyla güncellendi.");
  });
};

module.exports = {
    addPost,
    getPosts,
    getPost,
    deletePost,
    updatePost,
    updatePostiki,
    updatePostuc,
    updatePostdort
};
