import {typeWrite} from './typewriter.js'
import {getKeyword, searchKeyword} from './handleSearch.js';
import { addIconsToUI, clearUI } from './pageMutations.js'
import {loadIconsInfinitely} from "./infiniteScroll.js"
import {handleSyntaxToggle} from './assets/js/syntaxToggle.js'
import { handlePropertiesDropdown, handlePropertiesForm } from './assets/js/handleDropdown.js';
import {handleCopy} from "./clipboard.js"
import { handleDownload } from './download.js';
import { state } from './assets/js/appState.js';
import {storeSessionData, fetchKey, restoreState} from './restore.js'


//start typewriting 
typeWrite(document.getElementById('typedText')) 

const loadIcons = async (keyword)=>{
    storeSessionData(['keyword', keyword])
    clearUI()
    const data = await searchKeyword(keyword)
    console.log(data)
    if(data?.status === 400){

    }else{
        addIconsToUI(data)
    }
    
}

// restore state 
restoreState()
const restoreApp = async ()=>{
 const {keyword, limit, scroll} = state

    if(!keyword) return;
    state.enteredKeyword = keyword
    if(limit)  state.restoredLimit = Number(limit);
    console.log(limit, ' limit', state.limit)

    const search = document.querySelector("input[type='search']");
    search.value = keyword


    await loadIcons(keyword)
    const resultsSection = document.getElementById('results')
    console.log(scroll)
    resultsSection.scrollTo(0, Number(scroll))
    setTimeout(()=> loadIconsInfinitely(keyword) ,2000)
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
