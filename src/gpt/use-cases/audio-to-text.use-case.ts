import * as fs from 'fs';

import OpenAI from "openai";

interface Options {
    prompt?: string;
    audioFile: Express.Multer.File;
}


export const audioToTextUseCase = async ( openai: OpenAI, options: Options ) => {

    const {prompt, audioFile} = options;

    const resp = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream( audioFile.path ),
        prompt: prompt,  //same language that audio
        language: 'es',
        response_format: 'verbose_json' // 'vtt', 'srt'
    });

    return resp;
}