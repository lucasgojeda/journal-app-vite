import { v2 as cloudinary } from 'cloudinary'

import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'the-kings-company',
    api_secret: 'VFk2YTxe6NbHj6V_hOHqsb2UUDM',
    api_key: '142238993546652',
    secure: true
})


describe('Pruebas en fileUpload', () => {
    
    test('debe de subir correctamente el archivo a cloudinary', async() => {
        
        const imageUrl = 'https://static.dw.com/image/62450424_401.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
 
        const url = await fileUpload(file);


        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.jpg', '');

        // cloudinary.api.delete_resources([ 'journal/' + imageId ]);
        cloudinary.api.delete_resources([imageId]);

        expect( typeof url ).toBe('string');
    });

    test('debe de retornar null', async() => {
        
        const url = await fileUpload();

        expect( url ).toBe(null);
    })

});