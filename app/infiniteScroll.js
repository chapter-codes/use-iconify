'use strict'
import {searchKeyword} from './handleSearch.js'
import { addIconsToUI } from './pageMutations.js'
import { storeSessionData } from './restore.js'


const resultsSection = document.getElementById('results')


const handleInfiniteLoading = async (keyword)=>{

   // when search input is changed. element snaps back, simulating a scroll to the bottom. so don't load at this point. sctollTop will be zero, then.
  if(resultsSection.scrollTop == 0) return storeSessionData(['scroll', 0]);

  //save scrollposition
  storeSessionData(['scroll', resultsSection.scrollTop])
  console.log(resultsSection.scrollTop)

  if (resultsSection.scrollTop + resultsSection.clientHeight >= resultsSection.scrollHeight) {
    const spinner= document.getElementById('spinner')
    spinner.classList.replace('hidden', 'flex' )
    const data = await searchKeyword(keyword)

    if(data?.status === 400){
        spinner.classList.replace('flex', 'hidden' )        

    }else{
        if(data.status === 208) return spinner.classList.replace('flex', 'hidden' ) ; //limit reached

        spinner.classList.replace('flex', 'hidden' )  
        addIconsToUI(data) 
    }
  }
}

export const loadIconsInfinitely = (keyword)=> {
    resultsSection.onscroll = (e) => handleInfiniteLoading(keyword)
}
