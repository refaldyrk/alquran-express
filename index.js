import axios from 'axios';
import express from 'express';

const app = express();

const port = process.env.PORT || 6879

//Area
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())


// set view engine menggunakan EJS
app.set('view engine', 'ejs');

// membuat halaman utama
app.get('/', (req, res) => {
    axios.get('https://api.quran.gading.dev/surah').then(resp => {
        let surahAll = resp.data.data
        res.render('index', { title: 'Alquran', item: surahAll});
    })
});

app.get('/detail/:id', (req, res) => {
    axios.get('https://api.quran.gading.dev/surah/'+req.params.id).then(resp => {
        let surahSpec = resp.data.data
        let verses = surahSpec.verses
        res.render('detail', { title: surahSpec.name.transliteration.id, item: verses});
    })
})

// menjalankan server pada port yang telah ditentukan
app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`)
});