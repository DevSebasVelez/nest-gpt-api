import OpenAI from "openai";

interface Options {
    prompt: string;
}


export const orthographyCheckUseCase = async( openai: OpenAI, options: Options ) => {

    const { prompt } = options;

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `
                Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
                tu tarea es corregir esos errores y responder con la solución en formato JSON,
                Las palabras deben existir en el diccionario de la Real Academia Española,
                Entrega un porcentaje de aciertos,

                Si no hay errores, debes retornar un mensaje de felicitación.
                Si existe errores, bajara el porcentaje de aciertos. En ese caso envía un mensaje motivando al usuario a seguir practicando.

                Ejemplo de salida:
                {
                    userScore: number,
                    errors: string[], //['error -> solución']
                    message: string, // Usa emojis y texto para felicitar al usuario
                }

                `
            },
            {
                role: "user",
                content: prompt
            }
        ],
        // model: "gpt-4o"
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        max_tokens: 150,
      });


    const jsonResp = JSON.parse(completion.choices[0].message.content);

    return jsonResp;

}