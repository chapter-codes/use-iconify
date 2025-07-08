'use strict'

import {typeWrite} from './typewriter.js'
import {getKeyword, searchKeyword} from './handleSearch.js';
import { addIconsToUI, clearUI } from './pageMutations.js'
import {loadIconsInfinitely} from "./infiniteScroll.js"
import {handleSyntaxToggle} from './assets/js/syntaxToggle.js'
import { handlePropertiesDropdown, handlePropertiesForm } from './assets/js/handleDropdown.js';
import {handleCopy} from "./clipboard.js"
import { handleDownload } from './download.js';
import {storeSessionData} from './restore.js'
import { state } from './assets/js/appState.js';
import { setTheme } from './assets/js/theme.js';



// restore theme
// state.darkMode ? setTheme('dark') : setTheme('light')

//start typewriting 
typeWrite(document.getElementById('typedText')) 

const loadIcons = async (keyword)=>{
    storeSessionData(['enteredKeyword', keyword])
    clearUI()
    const data = await searchKeyword(keyword)
    console.log(data)
    if(data?.status === 400){

    }else{
        addIconsToUI(data)
    }
    
}
const restoreApp = async ()=>{
    const {enteredKeyword, limit, scroll} = state
    
    
    if(!enteredKeyword) return;

    if(limit)  state.restoredLimit = Number(limit);
    console.log(limit, ' limit', state.limit)

    const search = document.querySelector("input[type='search']");
    search.value = enteredKeyword


    await loadIcons(enteredKeyword)
    const resultsSection = document.getElementById('results')
    console.log(scroll)
    resultsSection.scrollTo(0, Number(scroll))
    setTimeout(()=> loadIconsInfinitely(enteredKeyword) ,2000)
}
restoreApp()

// handle form onsubmit
const searchForm = document.querySelector('#search-form');
searchForm.onsubmit = async (e)=>{
    e.preventDefault()  
    const keyword = getKeyword(e.target)
    loadIcons(keyword)
    loadIconsInfinitely(keyword)
}

const resultsSection = document.getElementById('results')
resultsSection.onclick  = (e)=>{
    handleCopy(e)
    handleDownload(e)
}


// toggle to copy jsx or html
const syntaxToggle = document.getElementById('syntax-toggle')
syntaxToggle.onclick = handleSyntaxToggle


//show properties dropdown
const propertiesButton = document.getElementById('properties-button')
console.log(propertiesButton)
propertiesButton.onclick = handlePropertiesDropdown

// hamdle proerties form
const propertiesForm= document.getElementById('properties-form')
propertiesForm.onchange = handlePropertiesForm  



// change theme
const themeButton = document.getElementById('theme-button')
themeButton.onclick = ()=>{
    const {darkMode} = state
    darkMode ? setTheme('light') : setTheme('dark')
    state.darkMode = !darkMode
    storeSessionData(['darkMode', !darkMode])
}