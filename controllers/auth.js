const db = require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



  


// kullanıcı kontrolü yapar
 const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        if (data.length) return res.status(409).json({ error: "Kullanıcı zaten bulunuyor." });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO users (username, password,isimsoyisim) VALUES (?, ?,?)";
        const values = [req.body.username, hash,req.body.isimsoyisim];

        db.query(insertQuery, values, (err, data) => {
            
            if (err) return res.status(500).json({ error: err.message });

         
            db.query('SELECT LAST_INSERT_ID() as userId', (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
          
                // Son eklenen kullanıcının ID'sini yanıt olarak gönder
                const userId = result[0].userId;
                return res.status(200).json({ message: "User successfully created.", userId });
              });
          });
           
      
    });
};

 const login = (req, res) => {
    // Burada giriş işlemleri yapılacak
  
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username],  (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) {
            return res.status(404).json({ error: "Kullanıcı bulunamadı." });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Yanlış kullanıcı adı veya şifre." });
        }
        
          // Kullanıcı ID'sini veritabanından al
    const userId = data[0].id;
console.log
    // Çerezleri ayarla
    res.cookie('sessionId', req.body.username, { maxAge: 360 * 60 * 1000, httpOnly: false,secure: true });
    res.cookie('userId', userId, { maxAge: 360 * 60 * 1000, httpOnly: false,secure: true});

  // Çerezleri ayarla 
  

        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const { password, ...other } = data[0];
        // Çerez ayarlarını güncelle
        res.cookie("access_token", token, {
          httpOnly: false,
          secure: true, // Geliştirme ortamında bu ayarı false yapın
          sameSite: 'lax', // 'strict' yerine 'lax' kullanmayı deneyin
          expires: new Date(Date.now() + 3600000) // 1 saat sonrasına ayarla
        })


        
        .status(200)
        .json(other);


})
};

 const logout = (req, res) => {
    // Burada çıkış işlemleri yapılacak
};



  

 const listUsers = (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(data);
    });
};

// Belirli bir kullanıcıyı siler
 const deleteUser = (req, res) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Kullanıcı bulunamadı veya zaten silinmiş." });
        }
        res.status(200).json({ message: "Kullanıcı başarıyla silindi." });
    });
};

module.exports = {
    register,
    login,
    logout,
    listUsers,
    deleteUser
};