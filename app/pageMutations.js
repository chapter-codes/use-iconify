'use strict'
import { state } from './assets/js/appState.js';
const {currentKeyword, enteredKeyword} = state


//replace ";" in icon classname with '/'
const formatIconsClass = (icons) =>{
    return icons.map(icon=>icon.replace(':', '/'))
} 

const resultHtml = (icons)=>{
    return icons.map(iconformattedclass=>{
             return `
        <div class="relative group ">
            <div id="tooltip" class="absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-[105%] text-white shadow shadow-gray-400 min-w-20 min-h-4 rounded-xl hidden group-hover:block mb-2 cursor-pointer">
                <div class="min-w-20 min-h-4 h-full relative z-10 bg-black rounded-xl p-2 whitespace-nowrap"> ${iconformattedclass.replace('/', ':')}</div>
                <div class="bg-black shadow shadow-gray-400 rotate-45 size-2.5 absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"></div>
            </div>
            <div class="relative flex items-center justify-center size-14 icon-group">
                <img src="https://api.iconify.design/${iconformattedclass}.svg?color=grey" alt="icon" class="relative z-20 w-4/5 h-full">
                <img src="https://api.iconify.design/ic/round-download.svg?color=white" alt="copy" class="download url-${iconformattedclass} absolute z-20 top-1 left-1  w-4" />
                <img src="https://api.iconify.design/basil/copy-solid.svg?color=white" alt="copy" class="copy url-${iconformattedclass} absolute z-20 top-1 right-1  w-4" />
            </div>
        </div>    
        `})
}

export const addIconsToUI = (data)=>{
   const urlReadyIconClasses = formatIconsClass(data.icons)
   const resultsSection = document.getElementById('results')
    const html = resultHtml(urlReadyIconClasses).join('') 

    console.log(enteredKeyword, currentKeyword)
    if(state.enteredKeyword === state.currentKeyword) return  resultsSection.innerHTML += html;
    resultsSection.innerHTML = html  // overwrite
    state.currentKeyword = state.enteredKeyword
}


export const clearUI = ()=>{
    const loadingSpinner = `<div class="w-full shrink-0 flex justify-center"> <img src="https://api.iconify.design/gg/spinner-two.svg?color=white" class="animate-spin w-10" /> </div>`
    const resultsSection = document.getElementById('results')

    console.log('current', state.currentKeyword)
    console.log('input', state.enteredKeyword)
    if(state.enteredKeyword === state.currentKeyword) return;
    resultsSection.innerHTML = loadingSpinner
}