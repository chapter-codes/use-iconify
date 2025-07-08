// download image when user click icon
'use strict'
import { getUrlClass } from "./clipboard.js";
import { state } from "./assets/js/appState.js";

const download = (objectUrl, urlClass) =>{
    const a = document.createElement('a')
    a.href = objectUrl
    a.download = `${urlClass}.svg`
    document.body.appendChild(a)
    a.click()
}

export const handleDownload = async (e)=>{
    const target = e.target
    const {color, height, width} = state
     if (!target.classList.contains('download')) return ;
        const urlClass = getUrlClass(target)
        if(!urlClass) return console.log('can\'t dowload')
        
        const url = new URL(`https://api.iconify.design/${urlClass}.svg?color=${color || ''}&width=${width || ''}&height=${height || ''}`)
        console.log(url)   
        
        try{
            const response = await fetch(encodeURIComponent(url))
            const blob = await response.blob()
            const objectUrl = URL.createObjectURL(blob)
            download(objectUrl, urlClass)
        }
        catch (error){
            console.error('Error: ', error.message)
        }

}
