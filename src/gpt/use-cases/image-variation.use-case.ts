import * as fs from 'fs';

import OpenAi from 'openai';
import { downloadImageAsPng } from 'src/helpers';

interface Options {
    baseImage: string;
}

export const generateImageVariationUseCase = async ( openai: OpenAi, options: Options ) => {
    const { baseImage } = options;

    const pngImagePath = await downloadImageAsPng( baseImage, true );

    const resp = await openai.images.createVariation({
        model: 'dall-e-2',
        image: fs.createReadStream(pngImagePath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    });

    const fileName = await downloadImageAsPng( resp.data[0].url );
    const url = `${process.env.SERVER_URL}/gpt/image-variation/${fileName}`;

    return {
        url: url,
        openAiUrl: resp.data[0].url,
        revised_prompt: resp.data[0].revised_prompt
    }


}