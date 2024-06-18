import OpenAI from "openai";

interface Options {
    prompt: string;
}

export const prosConsDiscusserUseCase = async (openai: OpenAI, { prompt }: Options) => {
    const completion = await openai.chat.completions.create({
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
      });


    const resp = completion.choices[0].message;

    return resp;
}