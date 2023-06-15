export function readJsonFromScript() {
    if (document.getElementById('saviJSON')) {
        return JSON.parse(document.getElementById('saviJSON').textContent.trim())
    } else return null
}