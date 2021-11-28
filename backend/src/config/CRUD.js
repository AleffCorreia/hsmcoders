const fs = require('fs')

const filePath = 'src/database/database.json';
const enconding = 'utf-8';

const list = () => {

    try {
        const data = fs.readFileSync(filePath, enconding);
        const cursos = JSON.parse(data);
        return cursos;
    } catch (e) {
        return(e);
    }
}

const search = (id) => {

   try{
        const data = fs.readFileSync(filePath, enconding);
        const dataObject = JSON.parse(data);
        const {cursos} = dataObject;
        for (let i = 0; i < cursos.length; i++) {
           if(cursos[i].id == id){
              return cursos[i];
           }
        }
      

   }catch(e){
       return e;
   }

   return "";
   
}

const insert = (data) => {

    const dataString = fs.readFileSync(filePath, enconding);
    const dataObject = JSON.parse(dataString);
    const { cursos } = dataObject
    const id = cursos.length + 1;
    const newUpData = { ...data};
    cursos.push(newUpData);
    dataObject.cursos = cursos;
    const newDataString = JSON.stringify(dataObject, null, 2);
    fs.writeFileSync(filePath, newDataString, enconding)
}


const update = (id, updateDate) => {
    const dataString = fs.readFileSync(filePath, enconding);
    const dataObject = JSON.parse(dataString);
    const { cursos } = dataObject;
  
    for (let i = 0; i < cursos.length; i++) {
        if (cursos[i].id == id) {
            cursos[i] = updateDate;
        }
    }

    dataObject.cursos = cursos;
    const newDataString = JSON.stringify(dataObject, null, 2);
    fs.writeFileSync(filePath, newDataString, enconding);
  
   

}

const del = (id) => {
    const dataString = fs.readFileSync(filePath, enconding);
    const dataObject = JSON.parse(dataString);
    const {cursos} = dataObject;
    let newCursos;
    for(let i = 0; i < cursos.length; i++){
       if(cursos.length > -1){
           if(cursos[i].id == id){
               newCursos = cursos.splice(i, 1);
               
           }
       }
    }

    dataObject.cursos = cursos;
    const newDataString = JSON.stringify(dataObject, null, 2);
    fs.writeFileSync(filePath, newDataString, enconding);
}



module.exports = { update, insert, list, search, del }