

/**
 * Esta función se encarga de subir las imagenes a la cloudinary.
 * @function
 * @param {file} file - Archivo a ser subido.
 * @returns {String} - Retorna el url de la imagen subida a cloudinary.
 */
export const fileUpload = async( file ) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/the-kings-company/image/upload';

    const formData = new FormData();

    formData.append('upload_preset','react-journal');
    formData.append('file', file);

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });

        if( resp.ok ) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }

    } catch (error) {
        throw error;
    }
} 