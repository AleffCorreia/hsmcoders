const { request, response } = require('express');
const { list, insert, update, search, del } = require('../config/CRUD');


function listaCursos(request, response) {


    try {
        const listResult = list();
        response.json(listResult);
    } catch (e) {
        response.status(500).json(e);
    }

}

function exibirCurso(request, response) {
    const { id } = request.params;

    const result = search(id);

    if (result === "") {
        response.status(400).json({ message: "Curso não encontrado!" });
    }

    response.json(result)
}

async function criarCurso(request, response) {

    const { titulo, descricao, professor, aulas } = request.body;

    const filePath = request.file.path;
    const createdAt = new Date();
    const updatedAt = new Date();
    const checkId = list();
    const {cursos} = checkId;
    let id;
    if(cursos == ""){
        id = 1;
      
    }else{
       id = cursos.length;
       id = id - 1;
       id = cursos[id].id + 1;
    }

    const data = {
        id: id,
        titulo: titulo,
        descricao: descricao,
        imagePath: filePath,
        professor: professor,
        aulas: aulas,
        createAt: createdAt,
        updatedAt: updatedAt,
    }

    try {
        await insert(data);
    } catch (e) {
        response.status(500).send(e);
    }
    response.status(201).send();

}

function atualizarCurso(request, response) {

    const { id } = request.params;
    const { titulo, descricao, professor, aulas } = request.body;
    const cursoExists = search(id);

    if (cursoExists == "") {
        return response.status(400).json({ message: "Curso não encontrado!" });
    }

   const filePath = request.file ? request.file.path : cursoExists.imagePath;

    const updatedAt = new Date();

    const data = {
        id: cursoExists.id,
        titulo: titulo ? titulo : cursoExists.titulo,
        descricao: descricao ? descricao : cursoExists.descricao,
        imagePath: filePath,
        professor: professor ? professor : cursoExists.professor,
        aulas: aulas ? aulas : cursoExists.aulas,
        updatedAt: updatedAt,
    }

    try {
        update(id, data);
    } catch (e) {
        response.status(500).send(e);
    }

    response.status(202).send();
}

async function deletarCurso(request, response){


    const { id } = request.params;
    const cursoExists = search(id);
    if (cursoExists == "") {
        return response.status(400).json({ message: "Curso não encontrado!" });
    }

    try{
        await del(id)
    }catch(e){
        response.status(500).send(e)
    }

    response.status(204).send();
}


module.exports = { listaCursos, criarCurso, atualizarCurso, exibirCurso, deletarCurso };