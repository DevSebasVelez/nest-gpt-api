import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';


export const downloadImageAsPng = async (url: string, fullPath: boolean = false) => {

    const resp = await fetch(url);

    if( !resp.ok ) {
        throw new Error('Error downloading image')
    }

    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });

    const imageName = `${ new Date().getTime() }.png`;
    const buffer = Buffer.from( await resp.arrayBuffer() );

    // fs.writeFileSync(`${folderPath}/${imageName}`, buffer);

    const completePath = path.join(folderPath, imageName);

    await sharp( buffer )
        .png()
        .ensureAlpha()
        .toFile(completePath)

    return fullPath ? completePath : imageName;
}



export const downloadBase64ImageAsPng = async (base64Image: string, fullPath: boolean = false) => {

    // Remover encabezado
    base64Image = base64Image.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Image, 'base64');

    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });

    const imageName = `${ new Date().getTime() }-64.png`;


    const completePath = path.join(folderPath, imageName);

    // Transformar a RGBA, png // Así lo espera OpenAI
    await sharp(imageBuffer)
      .png()
      .ensureAlpha()
      .toFile(completePath);

    return fullPath ? completePath : imageName;

  }