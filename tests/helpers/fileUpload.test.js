import { fileUpload } from "../../src/helpers/fileUpload"; 

describe('Pruebas en fileUpload ', ()=> {

    test('debe de subir el archivo correctamente a clouddinary ', async()=> {
        const imageurl = 'https://cdn.pixabay.com/photo/2022/05/17/21/41/naruto-7203817_640.jpg'; 
        const resp = await fetch(imageurl);
        const blob = await resp.blob();
        const file = new File([blob],'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

    });

})