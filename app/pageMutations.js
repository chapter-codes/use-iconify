'use strict'
import {staticVariables} from './handleSearch.js'
const {currentKeyword, enteredKeyword} = staticVariables


//replace ";" in icon classname with '/'
const formatIconsClass = (icons) =>{
    return icons.map(icon=>icon.replace(':', '/'))
} 

const resultHtml = (icons)=>{
    return icons.map(iconformattedclass=>{
             return ` <div class="relative flex items-center justify-center size-14 bg- bg-transparent-img">
                <img src="https://api.iconify.design/${iconformattedclass}.svg?color=grey" alt="icon" class="relative z-20 w-4/5 h-full">
                <img src="https://api.iconify.design/ic/round-download.svg?color=white" alt="copy" class="download url-${iconformattedclass} absolute z-20 top-1 left-1  w-4" />
                <img src="https://api.iconify.design/basil/copy-solid.svg?color=white" alt="copy" class="copy url-${iconformattedclass} absolute z-20 top-1 right-1  w-4" />
            </div>
        `})
}

export const addIconsToUI = (data)=>{
   const urlReadyIconClasses = formatIconsClass(data.icons)
   const resultsSection = document.getElementById('results')
    const html = resultHtml(urlReadyIconClasses).join('') 

    console.log(enteredKeyword, currentKeyword)
    if(staticVariables.enteredKeyword === staticVariables.currentKeyword) return  resultsSection.innerHTML +=html;
    resultsSection.innerHTML = html  // overwrite
    staticVariables.currentKeyword = staticVariables.enteredKeyword
}


export const clearUI = ()=>{
    const loadingSpinner = `<div class="w-full shrink-0 flex justify-center"> <img src="https://api.iconify.design/gg/spinner-two.svg?color=white" class="animate-spin w-10" /> </div>`
    const resultsSection = document.getElementById('results')

    console.log('current', staticVariables.currentKeyword)
    console.log('input', staticVariables.enteredKeyword)
    if(staticVariables.enteredKeyword === staticVariables.currentKeyword) return;
    resultsSection.innerHTML = loadingSpinner
}