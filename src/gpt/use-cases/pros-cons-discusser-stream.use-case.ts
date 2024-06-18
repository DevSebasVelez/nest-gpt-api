import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const prosConsDiscusserStreamUseCase = async (openai: OpenAI, { prompt }: Options) => {

    return await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
                    Se te hará una pregunta o se te dará dos o varias opciones.Tu tarea es dar una respuesta con los pros y contras de cada opción,
                    la respuesta debe de ser en formato markdown,
                    los pros y contras deben de estar en una lista,

                `
            },
            {
                role: "user",
                content: prompt
            }
        ],
        // model: "gpt-4o"
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 350,
        stream: true,
      });


}