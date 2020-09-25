const { json, response } = require('express');
const { TooManyRequests } = require('http-errors');
const fetch = require('node-fetch')
const puppeteer = require('puppeteer');

async function fetchdata() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://wazeopedia.waze.com/wiki/Colombia/Listado_de_Peajes_en_Colombia', {waitUntil: 'domcontentloaded'});
    var resultsh3 = await page.evaluate(() => {
        var spans = document.querySelectorAll('span.mw-headline');
        var results = []
        spans.forEach((element)=>{results.push(element.textContent)})
        return results
    })

    var resultstables = await page.evaluate( async () => {
        var datostabla = document.querySelectorAll('table[border="1"] tbody td');
        var results2 = []
        var wrapper = {}
        var index = 0;
        var id = 0;
        datostabla.forEach((element, ind) => {
            const labels = ["Nombre/Localizacion", "Coordenadas", "Operador", "Editor Creador", "Fecha de Actualizar", "Nueva Tarifa", "Precio Actualizado por", "Peaje Actualizado al Waze Toll por", "Fecha Actualizacion Waze Toll","id"];
            if (element.innerHTML.toString().search("lat") !== -1 && ind > 0)
            {
                wrapper[labels[index]] = id;
                id++;
                index = 0;
                results2.push(wrapper);
                wrapper = {}
            }
            wrapper[labels[index]] = element.textContent.replace("\n","");
            if (index === 0) {
                index++;
                LatLong = element.innerHTML.toString().split("?");
                if (LatLong.length > 1) {
                    var longitud = LatLong[1].match(/lon=-?\d{1,}.\d{1,}/)[0].replace("lon=", "")
                    var latitud = LatLong[1].match(/lat=-?\d{1,}.\d{1,}/)[0].replace("lat=", "")
                    wrapper[labels[index]] = {"lat": parseFloat(latitud), "lon": parseFloat(longitud)}
                }
                else
                    wrapper[labels[index]] = null;
            }
            index++;
        })
        return results2
    })
    return {peajes: resultstables};
}
module.exports = fetchdata