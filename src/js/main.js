const blurVal = document.getElementById('fBlur'), contrastVal = document.getElementById('fCont'), 
    contrastRange = document.getElementById('contRange'), gsVal = document.getElementById('fgrayScale'), 
    invertVal = document.getElementById('fInvert'), saturateVal = document.getElementById('fSat'), 
    saturateRange = document.getElementById('satuRange'), brightVal = document.getElementById('fBrig'), 
    brightnessRange = document.getElementById('brigRange'), hueRotVal = document.getElementById('fHue'),     
    opacityVal = document.getElementById('fOpa'), opacityRange = document.getElementById('opacityRange'),
    sepiaVal = document.getElementById('fSepia'), noneButton = document.getElementById('filterNone'),
    hShadow = document.getElementById('hShadow'), vShadow = document.getElementById('vShadow'), bShadow = document.getElementById('bShadow'), 
    cShadow = document.getElementById('dsColor')

const inputElements = document.querySelectorAll('.column input'), filterPreview = document.querySelector('.preview'), cssCode = document.getElementById('CSS-code'),
    copyBtn = document.querySelector('.copy-btn')

window.onload = () => {
    resetElements()
    generateFilterProperties()
}

inputElements.forEach(element => {
    element.addEventListener('input', () => {        
        generateFilterProperties()        
    })
});

let code
const generateFilterProperties = () => {   
    let blur = blurVal.value == 0 ? '' : `blur(${blurVal.value}px)`, contrast = contrastVal.value == 100 ? '' : ` contrast(${contrastVal.value}%)`,
        grayScale = gsVal.value  == 0 ? '' : ` grayscale(${gsVal.value}%)`, invert = invertVal.value == 0 ? '' : ` invert(${invertVal.value}%)`,
        saturate = saturateVal.value == 1 ? '' : ` saturate(${saturateVal.value})`, brightness = brightVal.value == 100 ? '' : ` brightness(${brightVal.value}%)`,
        hueRotate = hueRotVal.value == 0 ? '' : ` hue-rotate(${hueRotVal.value}deg)`, opacity = opacityVal.value == 1 ? '' : ` opacity(${opacityVal.value})`,
        sepia = sepiaVal.value == 0 ? '' : ` sepia(${sepiaVal.value}%)`, dropShadow = hShadow.value == 0 && vShadow.value == 0 && bShadow.value == 0 
            ? '' : ` drop-shadow(${hShadow.value}px ${vShadow.value}px ${bShadow.value}px ${cShadow.value})`

    code = blur + contrast + grayScale + invert + saturate + brightness + hueRotate + opacity + sepia + dropShadow
    cssCode.value = code == '' ? '' : `filter: ${code};`
    filterPreview.style.filter = code   
}

/* Remueve el/los filtros de la imagen y resetea los elementos */
noneButton.addEventListener('click', () => { resetElements() })

const resetElements = () => {
    inputElements.forEach(element => { element.value = 0 });
    brightVal.value = brightnessRange.value = contrastVal.value = contrastRange.value = 100
    saturateVal.value = saturateRange.value = opacityVal.value = opacityRange.value = 1
    vShadow.value = hShadow.value = bShadow.value = '0'
    cShadow.value = '#000000'
    filterPreview.style.filter = '', cssCode.value = ''
}

copyBtn.addEventListener('click', () => {
    cssCode.select()
    cssCode.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(cssCode.value)
})