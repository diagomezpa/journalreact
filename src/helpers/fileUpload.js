export const fileUpload = async(file) => {

    if(!file) throw Error('No tenemos ningún archio para subir');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dnx5ux6nr/upload';
    const formData = new FormData();
    formData.append('upload_preset','react-journal')
    formData.append('file',file)
    try{
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });
        if (!resp.ok) throw new Error ('No se pudo subir la imagen')
        const cloudResp = await resp.json();
    
        return cloudResp.secure_url;

    }catch(error){
       
        throw new Error(error.message);
    }
}