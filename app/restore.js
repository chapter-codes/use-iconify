

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