// This module provides a function to search for icons using the Iconify API.
'use strict';
import { state } from './assets/js/appState.js';
import { storeSessionData } from "./restore.js";


// export const state = {
//     prevLimit:0,
//     limit:0,
//     currentKeyword: '',
//     enteredKeyword : '',
//     defaultLimit : 64,
//     restoredLimit : 0
// }

// get the user input
export const getKeyword = (form) => {
    const searchInput = Object.entries(form)[0][1];
    const keyword = searchInput.value.trim();
    state.enteredKeyword = keyword.toLowerCase()
    return keyword? keyword : null;
}


//create limit search params for infinite scrolling
const getLimitParams = (keyword)=>{
    console.log('limit: ', state.limit, 'static: ', state.restoredLimit)

    if(state.restoredLimit !== 0){
        state.limit = state.restoredLimit
    }
    else if(state.currentKeyword !== keyword.toLowerCase()){  // reset to default limit when keyword changes.
        state.limit = state.defaultLimit
        state.prevLimit = 0 
    }
    else if(state.limit + state.defaultLimit > 999){
        state.limit = 999
    }
    else{
        state.limit += state.defaultLimit
    }

    return state.limit
}

//search for icons with the keyword from iconify API
export const searchKeyword = async (keyword)=>{
    const baseUrl = 'https://api.iconify.design/search'
    const limit = getLimitParams(keyword)
    console.log('used', limit)

    if (!keyword ) return { message: 'please insert keyword',  status:400 };
    if (limit == state.prevLimit) return  { message: 'max limit reached',  status:208 }; // max limit reached
    
    const start = state.restoredLimit  !== 0 ? 0 : limit- state.defaultLimit

    try {
        const json = await fetch(baseUrl + `?query=${encodeURIComponent(keyword)}&start=${start}&limit=${limit}`)
        const data = await json.json()
        state.prevLimit = limit
        state.restoredLimit = 0
        storeSessionData(['limit', limit])

        return data.icons.length === 0 ?  { message: 'max limit reached',  status:208 } : data
    }catch (error) {
        console.error('Error fetching search results:', error);
        return { message: error.message,  status:400 };
    }
}
