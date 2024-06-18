import OpenAi from 'openai'

interface Options {
    prompt: string;
    lang: string;
}

export const translateUseCase = async ( openai: OpenAi, { prompt, lang }: Options)  => {

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
                    Traduce el siguiente texto al idioma ${lang}:${prompt}
                `
            },
        ],
        // model: "gpt-4o"
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        // max_tokens: 350,
      });


    return { message: completion.choices[0].message.content };


}