// This module provides a function to search for icons using the Iconify API.
'use strict';

import { storeSessionData } from "./restore.js";


export const staticVariables = {
    prevLimit:0,
    limit:0,
    currentKeyword: '',
    enteredKeyword : '',
    defaultLimit : 64,
    restoredLimit : 0
}

// get the user input
export const getKeyword = (form) => {
    const searchInput = Object.entries(form)[0][1];
    const keyword = searchInput.value.trim();
    staticVariables.enteredKeyword = keyword.toLowerCase()
    return keyword? keyword : null;
}


//create limit search params for infinite scrolling
const getLimitParams = (keyword)=>{
    console.log('limit: ', staticVariables.limit, 'static: ', staticVariables.restoredLimit)

    if(staticVariables.restoredLimit !== 0){
        staticVariables.limit = staticVariables.restoredLimit
    }
    else if(staticVariables.currentKeyword !== keyword.toLowerCase()){  // reset to default limit when keyword changes.
        staticVariables.limit = staticVariables.defaultLimit
        staticVariables.prevLimit = 0 
    }
    else if(staticVariables.limit + staticVariables.defaultLimit > 999){
        staticVariables.limit = 999
    }
    else{
        staticVariables.limit += staticVariables.defaultLimit
    }

    return staticVariables.limit
}

//search for icons with the keyword from iconify API
export const searchKeyword = async (keyword)=>{
    const baseUrl = 'https://api.iconify.design/search'
    const limit = getLimitParams(keyword)
    console.log('used', limit)

    if (!keyword ) return { message: 'please insert keyword',  status:400 };
    if (limit == staticVariables.prevLimit) return  { message: 'max limit reached',  status:208 }; // max limit reached
    
    const start = staticVariables.restoredLimit  !== 0 ? 0 : limit- staticVariables.defaultLimit

    try {
        const json = await fetch(baseUrl + `?query=${encodeURIComponent(keyword)}&start=${start}&limit=${limit}`)
        const data = await json.json()
        staticVariables.prevLimit = limit
        staticVariables.restoredLimit = 0
        storeSessionData(['limit', limit])

        return data.icons.length === 0 ?  { message: 'max limit reached',  status:208 } : data
    }catch (error) {
        console.error('Error fetching search results:', error);
        return { message: error.message,  status:400 };
    }
}
