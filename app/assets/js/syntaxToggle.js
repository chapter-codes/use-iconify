'use strict'
import { state } from "./appState.js"


const syntaxToggle = document.getElementById('syntax-toggle')
export const handleSyntaxToggle = ()=>{
    syntaxToggle.classList.toggle('no-slide')
    syntaxToggle.classList.toggle('slide')
    state.useJsx = !state.useJsx
}