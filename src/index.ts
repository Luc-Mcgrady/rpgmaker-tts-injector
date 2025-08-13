import { synthesize } from "@echristian/edge-tts";
import { v4 } from 'uuid';

if (!globalThis.crypto.randomUUID) {
    // @ts-ignore
    globalThis.crypto.randomUUID = v4
}

async function go() {
    const audioCtx = new AudioContext
    const source = audioCtx.createBufferSource()
    source.connect(audioCtx.destination)

    //@ts-ignore
    const text: string = $gameMessage.allText().replace(/\\.\[.+\]|\\|\||\\\{|【.+】|~|♥/g, "")
    // const text = "nihao"
    //const voice = tts.voices.findByName('English (United States)');
    
    const { audio } = await synthesize({text, voice: "zh-CN-XiaoxiaoNeural", language: "zh-CN"})
    const audioBuffer = await audio.arrayBuffer()
    source.buffer = await audioCtx.decodeAudioData(audioBuffer)
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