import { readJsonFromScript, videoPlayerAttributes } from './data';
import { videoPlayerLogic } from './videoPlayer';
import { knockKnock } from './knock'

// Script ID for object detection
const scriptID = 'saviJSON'

const jsonObject = [
    {
        role: 'play-pause',
        isLottieNeeded: true,
        toggleWithLoader: true,
        lottie_url: "https://assets3.lottiefiles.com/datafiles/oy40tKMzjbuByYM/data.json",
        animation_start: '0',
        animation_end: '50'
    },
    {
        role: 'mute-unmute',
        isLottieNeeded: true,
        lottie_url: "https://assets8.lottiefiles.com/packages/lf20_tGCilb/mute%20unmute.json",
        animation_start: '0',
        animation_end: '20'
    },
    {
        role: 'loader',
        isLottieNeeded: true
    }
]

window.addEventListener('load', async () => {
    // let jsonObject = await readJsonFromScript()
    // if (jsonObject === null) {
    //     throw new Error(`Please add the object inside a script tag with id="${scriptID}" and try again...`)
    // } else {
    let videoPlayerElements = {}
    // Video Player Logic
    // console.log(videoPlayerAttributes, jsonObject)
    for (const [key, value] of Object.entries(videoPlayerAttributes)) {
        // console.log(key, value);
        if (document.querySelector(value.attribute) !== null) {
            // console.log(key, value)
            videoPlayerAttributes[key].element = document.querySelector(value.attribute)
            videoPlayerElements[key] = videoPlayerAttributes[key]
            // videoPlayerElements[key] = document.querySelector(value)
        }

    }

    // Object.keys(videoPlayerAttributes).forEach((key) => {
    //     console.log(key);
    // });
    // console.log(videoPlayerElements)
    videoPlayerLogic({ videoPlayerElements, jsonObject })



    // }
})

