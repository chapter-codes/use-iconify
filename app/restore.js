import { defaultState } from "./assets/js/appState.js"

export const storeSessionData = async ([key, value]) =>{
    // const obj ={}
    // obj[key] = value
    // await chrome.storage.session.set(obj)

    localStorage.setItem(key, JSON.stringify(value))

}

export const fetchKey = async (key)=>{
//    const data = await chrome.storage.session.get(key) || null 
//    return data[key] || null

    return JSON.parse(localStorage.getItem(key))
}
// export const reloadState =()=>{
//     const keyword = fetchKey('keyword')
//     return keyword
// }

export const restoreState = async () => {
    // const restoredState = {...defaultState}; // Start with default values
    // const keys = Object.keys(defaultState);
    
    // // Use Promise.all to wait for all storage operations
    // await Promise.all(keys.map(async (key) => {
    //     try {
    //         const value = await fetchKey(key);
    //         if (value !== null) {
    //             restoredState[key] = value;
    //         }
    //     } catch(error) {
    //         console.error(`Error restoring ${key}:`, error);
    //     }
    // }));


    const restoredState = {...defaultState}; // Start with default values
    const keys = Object.keys(defaultState);
    //  Use Promise.all to wait for all storage operations
    await Promise.all(keys.map(async (key) => {
        try {
            const value = await fetchKey(key);
            if (value !== null) {
                restoredState[key] = value;
            }
        } catch(error) {
            console.error(`Error restoring ${key}:`, error);
        }
    }));
    
    return restoredState;
}