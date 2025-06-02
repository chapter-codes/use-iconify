'use strict'

export const typeWrite = (element)=>{
    const typedText= element.textContent.split('')
    element.textContent=''
    element.classList.toggle('hidden')
    console.log(typedText)

    let iterCount =0;
    const delay=100


    
    const typeText = ()=>{
        console.log(typedText.length);
        
        if( iterCount < typedText.length ){
            const span = document.createElement('span')
            span.className = 'animate-fade-in'
            span.innerText = typedText[iterCount]
            element.appendChild(span)
            
            iterCount++
        }else{
            clearInterval(typingInterval)
            console.log('interval cleared')
        }
    }

    const typingInterval = setInterval( typeText, delay)
}