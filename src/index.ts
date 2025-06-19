import { EdgeSpeechTTS } from "@lobehub/tts";

async function go() {
    const audioCtx = new AudioContext
    const source = audioCtx.createBufferSource()
    source.connect(audioCtx.destination)

    //@ts-ignore
    const text: string = $gameMessage.allText().replace(/\\.\[.+\]|\\|\||\\\{|【.+】|~|♥/g, "")
    // const text = "nihao"
    //const voice = tts.voices.findByName('English (United States)');
    
    const tts = new EdgeSpeechTTS({locale: "zh-CN"})
    const resp = await tts.createAudio({input: text, options: {voice: "zh-CN-XiaoxiaoNeural"}})

    source.buffer = resp
    source.start()
    console.log(text)
}

const element = document.createElement("button")
document.body.appendChild(element)
element.onclick = go
element.innerText = "说"
element.style.position = "absolute"
element.style.zIndex = "10"

document.addEventListener("keydown", (ev) => {
    if (ev.key == "a") {
        go()
    }
})