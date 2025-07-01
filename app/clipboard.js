// copies image tag to script.
'use strict'
import { state } from "./assets/js/appState.js"


export const getUrlClass = (target)=>{
    const copyClass = Array.from(target.classList).find(classItem=> classItem.includes('url-'))

    if(!copyClass) return null;

    const urlClass = copyClass.split('url-')[1]
    return urlClass
}
const formatCopiedText = (urlClass)=>{
    const { useJsx, color, height, width } = state;
    console.log(useJsx, color, height, state);
    
    const text = useJsx
      ? `<Icon icon="${urlClass.split("/").join(':')}"${color ? ` color="${color}"` : ''}${height ? ` height="${height}"` : ''}${width ? ` width="${width}"` : ''} />`
      : `<img src="https://api.iconify.design/${urlClass}.svg?${color ? `color=${color}&` : ''}${height ? `height=${height}&` : ''}${width ? `width=${width}` : ''}" />`;
    
    return text;
    
}
let alertTimeoutId =  0 ;    
export const handleCopy = async  (e)=>{
    clearTimeout(alertTimeoutId) // clear existing timeout each time the handler is called
    const target= e.target

    if (!target.classList.contains('copy')) return ;
    const urlClass = getUrlClass(target)
    console.log('click copied', urlClass)

    if(!urlClass) return;
    const copiedText = formatCopiedText(urlClass)
    console.log('text', copiedText)

    try{
        await navigator.clipboard.writeText(copiedText)
        const alert = document.getElementById('alert')
        alert.classList.replace('hidden', 'flex')
        alertTimeoutId = setTimeout(()=> alert.classList.replace('flex', 'hidden'), 1500)
    }
    catch(error){
        console.log(error)
    }
}

