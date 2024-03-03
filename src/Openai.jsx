
const { Configuration, OpenAIApi} = require ('openai');
const  congiguration=new Configuration({apikey: "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"});
const  openai=new OpenAIApi(congiguration);

export async function sendMsgToOpenAI(message){
    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt:message,
        temperature:0.7,
        max_tokens:256,
        top_p: 1,
        frequency_penalty:0,
        presense_penalty:0
    });
    return res.data.choices[0].text;
}
