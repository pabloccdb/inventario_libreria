const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn}=require('../lib/auth');


router.get('/',isLoggedIn, async (req, res) => {
    var querys = 'SELECT * FROM libros';
    const libros = await pool.query(querys);
    res.render('libros/add', { libros });
});
router.post('/add',isLoggedIn, async (req, res) => {
    const { titulo, autor, fechalanzamiento, stock } = req.body;
    var query = "INSERT INTO `libros`(`titulo`, `fechalanzamiento`, `autor`, `user_id`, `stock`) VALUES ('" + req.body.titulo + "','" + req.body.fechalanzamiento + "','" + req.body.autor + "',1,'" + req.body.stock + "')";
    await pool.query(query);
    req.flash('success','Libro agregado correctamente');
    res.redirect('/libros/');
});

router.get('/delete/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('Delete from libros where ID=?', [id]);
    req.flash('success','Libro eliminado correctamente');
    res.redirect('/libros/');
});

router.get('/update/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const update = (await pool.query('select * from libros where ID=?', [id]));
    res.render('libros/add', { update: update[0] });
    console.log(update);
});
router.post('/update/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, fechalanzamiento, stock } = req.body;
    const updatelibro =
    {
        titulo,
        autor,
        fechalanzamiento,
        stock
    };
    await pool.query('UPDATE libros SET ? where ID=?', [updatelibro, id]);
    req.flash('success','Libro actualizado correctamente');
    res.redirect('/libros/');
});
router.get('/search',isLoggedIn, (req, res) => {
    res.render('libros/search');
 });
router.post('/search',isLoggedIn,async (req, res) => {
   const {buscar}=req.body;
   var querys = "SELECT * FROM `libros` WHERE id LIKE '%"+buscar+"%' OR autor LIKE '%"+buscar+"%' OR fechalanzamiento LIKE '%"+buscar+"%' OR stock LIKE '%"+buscar+"%' OR titulo LIKE '%"+buscar+"%' ";
   const libros = await pool.query(querys);
   res.render('libros/search', { libros });
});

module.exports = router;