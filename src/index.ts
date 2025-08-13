import { synthesize } from "@echristian/edge-tts";

import { v4 } from 'uuid';

if (!globalThis.crypto.randomUUID) {
    // @ts-ignore
    globalThis.crypto.randomUUID = v4
}

function getPlainTextFromGameMessage(): string {
    //@ts-ignore
    const raw = $gameMessage.allText();

    // Create a dummy Window_Base just to access convertEscapeCharacters
    //@ts-ignore
    const dummyWindow = new Window_Base(0, 0, 0, 0);
    const converted = dummyWindow.convertEscapeCharacters(raw);

    // Strip any remaining escape codes (optional)
    return converted.replace(/\x1b\w+\[.*?\]/g, '').replace(/\x1b\w/g, '');
}

async function go() {
    //@ts-ignore
    if (!$gameMessage.hasText()) {
        return;
    }

    const audioCtx = new AudioContext
    const source = audioCtx.createBufferSource()
    source.connect(audioCtx.destination)

    const text = getPlainTextFromGameMessage()
    
    const { audio } = await synthesize({text, voice: short_name, language: locale})
    const audioBuffer = await audio.arrayBuffer()
    source.buffer = await audioCtx.decodeAudioData(audioBuffer)
    source.start()
    console.log(text)
}

const element = document.createElement("button")
document.body.appendChild(element)
element.onclick = go
element.innerText = "TTS"
element.style.position = "absolute"
element.style.zIndex = "10"

document.addEventListener("keydown", (ev) => {
    if (ev.key == "q") {
        go()
    }
})