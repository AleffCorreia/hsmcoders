const {Router} = require('express');
const routes = Router();
const {listaCursos, criarCurso,atualizarCurso,exibirCurso, deletarCurso} = require('./controllers/cursoController');
const multer = require('multer');
const upload = multer({dest: 'src/uploads'});


routes.get('/cursos',listaCursos);
routes.post('/cursos',upload.single("imagePath"),criarCurso);


routes.get('/cursos/:id',exibirCurso);
routes.put('/cursos/:id',upload.single("imagePath"),atualizarCurso);
routes.delete('/cursos/:id',deletarCurso);


module.exports = routes;