import {typeWrite} from './typewriter.js'
import {getKeyword, searchKeyword, staticVariables} from './handleSearch.js';
import { addIconsToUI, clearUI } from './pageMutations.js'
import {loadIconsInfinitely} from "./infiniteScroll.js"
import {handleCopy} from "./clipboard.js"
import { handleDownload } from './download.js';
import {storeSessionData, fetchKey} from './restore.js'


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
const restore = async ()=>{
    const keywordObj = await fetchKey('keyword')
    const keyword = keywordObj['keyword']
    const limitObj = await fetchKey('limit')
    const limit = limitObj['limit'] || 0
    

    if(!keyword) return;
    // staticVariables.currentKeyword = keyword
    staticVariables.enteredKeyword = keyword
    if(limit)  staticVariables.restoredLimit = Number(limit);
    console.log(limit, ' limit', staticVariables.limit)

    const search = document.querySelector("input[type='search']");
    search.value = keyword


    await loadIcons(keyword)
    const scrollObj = await fetchKey('scroll')
    const scroll= scrollObj['scroll'] || 0
    
    const resultsSection = document.getElementById('results')
    console.log(scroll)
    resultsSection.scrollTo(0, Number(scroll))
    setTimeout(()=> loadIconsInfinitely(keyword) ,2000)
}
restore()

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
    console.log(e.target)
    handleCopy(e)
    handleDownload(e)
}


const syntaxToggle = document.getElementById('syntax-toggle')
let useJsx = true
syntaxToggle.onclick = ()=>{
    console.log('toggle')
    syntaxToggle.classList.toggle('no-slide')
    syntaxToggle.classList.toggle('slide')
    useJsx = !useJsx
}

// flip, rotate, height, width, color