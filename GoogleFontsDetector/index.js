async function getGoogleFonts(url) {
    const response = fetch(url);
    const html = await response.text();
    const soup = new BeautifulSoup(html, "html.parser");

    const fonts = [];
    for (const link of soup.find_all("link")) {
        if (link.get("href").startsWith("https://fonts.googleapis.com/css")) {
            fonts.push(link["href"].split("/")[-1]);
        }
    }

    return fonts;
}

window.addEventListener('load', () => {



    const fonts = getGoogleFonts("https://www.google.com");

    for (const font of fonts) {
        console.log(font);
    }

})

