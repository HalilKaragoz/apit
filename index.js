const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/posts.js');
const authRoutes = require('./routes/auth.js');
const usersRoutes = require('./routes/users.js');
const multer = require('multer');
const path = require("path");
const app = express();


// CORS ve JSON middleware'lerini ayarla
const corsOptions = {
    origin: 'https://burdahaberajansi.com',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Multer storage ve upload ayarlarını yap
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
});
const upload = multer({ storage });

// API route'larını tanımla
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

// Dosya yükleme rotalarını tanımla
app.post('/upload', upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});
// ... (Diğer dosya yükleme rotaları) ...




// imgiki sütunu için dosya yükleme rotası
app.post('/uploadimgiki', upload.single("file"), function (req, res) {
  const file = req.file;
  // Burada, dosya adını imgiki sütunu için kullanabilirsiniz
  // Örneğin, veritabanında bir gönderi güncelleyebilirsiniz
  // Gönderi ID'si ve kullanıcı bilgisi gibi diğer parametreler gerekebilir
  // Bu bilgiler genellikle istekten alınır
  res.status(200).json(file.filename);
});
app.post('/uploadimguc', upload.single("file"), function (req, res) {
  const file = req.file;
  // Burada, dosya adını imgiki sütunu için kullanabilirsiniz
  // Örneğin, veritabanında bir gönderi güncelleyebilirsiniz
  // Gönderi ID'si ve kullanıcı bilgisi gibi diğer parametreler gerekebilir
  // Bu bilgiler genellikle istekten alınır
  res.status(200).json(file.filename);
});
app.post('/uploadimgdort', upload.single("file"), function (req, res) {
  const file = req.file;
  // Burada, dosya adını imgiki sütunu için kullanabilirsiniz
  // Örneğin, veritabanında bir gönderi güncelleyebilirsiniz
  // Gönderi ID'si ve kullanıcı bilgisi gibi diğer parametreler gerekebilir
  // Bu bilgiler genellikle istekten alınır
  res.status(200).json(file.filename);
});
app.post('/uploadimgbes', upload.single("file"), function (req, res) {
  const file = req.file;
  // Burada, dosya adını imgiki sütunu için kullanabilirsiniz
  // Örneğin, veritabanında bir gönderi güncelleyebilirsiniz
  // Gönderi ID'si ve kullanıcı bilgisi gibi diğer parametreler gerekebilir
  // Bu bilgiler genellikle istekten alınır
  res.status(200).json(file.filename);
});


// Statik dosyaları servis et
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route'u en sona koy
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu başlat
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${app.get('env')} mode.`);
});

