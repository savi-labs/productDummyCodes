import { readJsonFromScript } from "../common/scriptReader";
import { counterjsAttributes, scriptJson } from "./data";
import { counterjsLogic } from "./counterjs";
import req from "express/lib/request";

const desiredFunctionalities = () => {

}

const requiredAttributes = ["prefix", "suffix", "number", "target_attr", "targetEl"]


window.addEventListener('load', async () => {
    console.log("loaded!!!!", counterjsAttributes)
    // const scriptJson = await readJsonFromScript()



    scriptJson.counter.forEach(el => {
        const targetEl = document.querySelector(el.target_attr)
        const text = targetEl?.innerText || null
        // console.log(text)
        if (text) {
            let obj = segregateText(text)
            el.suffix = obj.suffix
            el.prefix = obj.prefix
            el.number = obj.number
            el.targetEl = targetEl
            el.enableScrollSpy = true
            // console.log(obj)

            getOtherOptions(el)
        }
        else {
            console.log(`Text not found in the target Element with attribute ${el.target_attr}`)
        }
    })
    // console.log(scriptJson)
    counterjsLogic(scriptJson)
})

const segregateText = (text) => {
    // console.log("first", text)

    const regex = /^(?<prefix>[^\d]*)(?<number>[0-9]+(?:[,.][0-9]+)?)(?<suffix>[^\d]*)$/;
    let str = {}
    // testStrings.forEach((str) => {
    const match = regex.exec(text);

    str.prefix = match.groups.prefix || "";
    str.number = parseFloat(match.groups.number);
    str.suffix = match.groups.suffix || "";
    // str.decimalPlaces = getDecimalPlaces()
    // });

    return str
}

const getOtherOptions = (obj) => {
    // console.log(obj, scriptJson)

    Object.keys(obj).forEach(key => {
        if (!requiredAttributes.includes(key)) {
            console.log(key);

        }
    });
}