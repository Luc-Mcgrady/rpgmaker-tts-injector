import { EdgeSpeechTTS } from "@lobehub/tts";

const audioCtx = new AudioContext
const source = audioCtx.createBufferSource()
source.connect(audioCtx.destination)

async function go() {
    //@ts-ignore
    const text: string = $gameMessage.allText().replace(/【.+】|~|♥/g, "")
    // const text = "nihao"
    //const voice = tts.voices.findByName('English (United States)');
    
    const tts = new EdgeSpeechTTS({locale: "zh-CN"})
    const resp = await tts.createAudio({input: text, options: {voice: "zh-CN-XiaoxiaoNeural"}})

    source.buffer = resp
    source.start()
    console.log(source, resp)
}

go()