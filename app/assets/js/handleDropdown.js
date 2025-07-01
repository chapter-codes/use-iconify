'use strict'
import { state } from "./appState.js"



export const handlePropertiesDropdown = ()=>{
    const propertiesForm = document.getElementById('properties-form')
    const dropdownCaret = document.getElementById('dropdown-caret')
    dropdownCaret.classList.toggle('rotate-180')
    propertiesForm.classList.toggle('hide-dropdown')
    propertiesForm.classList.toggle('show-dropdown')
}

export const handlePropertiesForm = (e)=>{
    const {id, value} = e.target
    //id is string: color, height or width
    state[id]=value
    console.log(state);
    
}