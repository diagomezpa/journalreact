import { fileUpload } from "../../src/helpers/fileUpload"; 
import { v2 as cloudinary } from 'cloudinary'


// tenga en cuenta eque esto es solo un ejercicio en la vida real esto no se debe hacer del lado del back 
cloudinary.config({
    cloud_name: 'dnx5ux6nr',
    api_key:'537678811211418',
    api_secret:'yZ79IuS7EaO_7eL5JRCuhMR8v84',
    secure:true
});

describe('Pruebas en fileUpload ', ()=> {

    test('debe de subir el archivo correctamente a clouddinary ', async()=> {
        const imageurl = 'https://cdn.pixabay.com/photo/2022/05/17/21/41/naruto-7203817_640.jpg'; 
        const resp = await fetch(imageurl);
        const blob = await resp.blob();
        const file = new File([blob],'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');


        const segments = url.split('/');
        const imageId = segments[segments.length -1 ].replace('.jpg','');
        await cloudinary.api.delete_resources(['journal/'+imageId]);

    });

    test('debe retornar null', async()=> {
        const file = new File([],'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);

    });

})