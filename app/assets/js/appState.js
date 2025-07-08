import { restoreState } from "../../restore.js"

export const  defaultState  = {
    prevLimit:0,
    limit:0,
    currentKeyword: '',
    enteredKeyword : '',
    defaultLimit : 64,
    restoredLimit : 0,
    useJsx :true,
    color: null,
    height: null,
    width:null,
    scroll:0,
    resultsCount: 0,
    darkMode: true,
}


export const state = await restoreState()

// <Icon icon=line-md:car-light color={" "} />