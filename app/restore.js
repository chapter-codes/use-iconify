import { state } from "./assets/js/appState.js"

export const storeSessionData = async ([key, value]) =>{
    const obj ={}
    obj[key] = value
    await chrome.storage.session.set(obj)
    console.log('done')
}

export const fetchKey = async (key)=>{
   return  await chrome.storage.session.get(key) || null 
}
// export const reloadState =()=>{
//     const keyword = fetchKey('keyword')
//     return keyword
// }

export const restoreState = ()=>{
    const keys = Object.keys(state)
    console.log(typeof keys)
    keys.forEach(async (key)=>{
        try{
           const value = await fetchKey(key)
           state[key] = value
        }
        catch(error){
            console.error(error)
        }
    })

}