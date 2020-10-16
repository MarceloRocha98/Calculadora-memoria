import React from 'react'
import './Button.css'


export default props=>
<button 

onClick={e=>props.click && props.click(props.label)} // só chama a função se props.click for diferente de 0, isto é, se existir a propriedade função click no arquivo calculator.jsx
className={`
    
    button  
    ${props.operation? 'operation':''}
    ${props.double?'double':''}
    ${props.triple?'triple':''}
    
`}>
    
    {props.label}
    
    </button>
