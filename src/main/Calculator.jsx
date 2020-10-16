import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState={
    displayValue:'0' ,
    clearDisplay:false,
    operation:null,
    values:[0,0],
    current: 0, // indice de value
}

export default class Calculator extends Component{

    state={...initialState,memory:[],memoryDisplay:[]} // copia o initialState pra state (state=initialState)

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current===0){
            this.setState({operation,current:1,clearDisplay:true})
        }else{
            const equals=operation ==='='
            const currentOperation = this.state.operation
            const values=[...this.state.values] // copia dos values do state
            try{
                values[0]=eval(`${values[0]} ${currentOperation} ${values[1]}`) //dentro de eval ele vai interpretar js
            }catch(e){
                values[0]=this.state.values[0]
            }
            values[1]=0

            
            this.setState({
                displayValue:values[0],
                operation: equals ? null:operation,
                current: equals? 0: 1,
                clearDisplay:!equals,
                values
        })
        
        
        if (equals) {
            
            let memory = [...this.state.memory]
            
            memory.push(values[0])
            
            this.setState({ memory })
            console.log(this.state.memory)
           
        } 

        }
    }

    addDigit(n){
       if(n==='.' && this.state.displayValue.includes('.')){
           return
       }

       const clearDisplay=this.state.displayValue==='0' || 
                          this.state.clearDisplay

       const currentValue =clearDisplay ? '': this.state.displayValue
       const displayValue=currentValue + n
       this.setState({displayValue,clearDisplay:false})

        
        
       if(n !='.'){
           const i = this.state.current // indice do values
           const newValue=parseFloat(displayValue)
           const values=[...this.state.values] // duplicou o array values do state
           values[i]=newValue
           this.setState({values}) // substitui os values de state
           console.log(values)

       }

    }

    recoverValue(value) {
        // alert('entro')
        let values = [...this.state.values]
        let current = this.state.current
        if (current === 1) {
            values[1]=value
        } else {
            values[0]=value
        }
        this.setState({values,displayValue:value})
    }

    deleteValue(value) {
        let memory=this.state.memory
        let memoryDisplay=this.state.memoryDisplay
        let indice = memory.indexOf(`${value}`)
        let indice2 = memoryDisplay.indexOf(`${value}`)
        
        memory.splice(indice, 1)
        memoryDisplay.splice(indice2, 1)
        
        this.setState({memory,memoryDisplay})
    }

    isSave() {
        const save = this.state.save
        const memory = [...this.state.memory]

        if (save===false) {
            memory.pop()
            this.setState({memory})
        }
    }

    render() {
        // console.log(this.state)
        const {memoryDisplay, save}= this.state 
    
        const addDigit=n=>this.addDigit(n)
        const setOperation=op=>this.setOperation(op)
        return (
            <div className='content'>

            
            <div className="calculator"> 
                    <Display value={this.state.displayValue}/>
                    <Button label='MC' click={() => this.clearMemory()}  />
                    <Button label='M+' click={() => {
                        let {memory,current,values} = this.state
                        let len = memory.length
                        let displayValue = memory[len - 1]
                        // alert(displayValue)
                        if (current === 0) {
                            values[0] = memory[len - 1]
                            displayValue=memory[len-1]
                        } else {
                            displayValue=memory[len-1]
                            values[1]=memory[len-1]
                        }

                        this.setState({values,displayValue:displayValue})
                        
                    }}  />
                    <Button label='MS' click={e => {

                    const memory=[...this.state.memory]
                    let memoryDisplay = [...this.state.memoryDisplay]
                        
                    let len = memory.length
                    memoryDisplay.push(memory[len-1])     
                    this.setState({memoryDisplay})
                    // alert(memoryDisplay)
                      
                       
                        
                    }} />
                    <Button label='/' click={setOperation} operation/>
                    <Button label='7' click={addDigit}/>
                    <Button label='8' click={addDigit}/>
                    <Button label='9' click={addDigit}/>
                    <Button label='*' click={setOperation} operation/>
                    <Button label='4' click={addDigit}/>
                    <Button label='5' click={addDigit}/>
                    <Button label='6' click={addDigit}/>
                    <Button label='-' click={setOperation} operation/>
                    <Button label='1' click={addDigit}/>
                    <Button label='2' click={addDigit}/>
                    <Button label='3' click={addDigit}/>
                    <Button label='+' click={setOperation} operation/>
                    <Button label='0' click={addDigit} double/>
                    <Button label='.' click={addDigit}/>
                    <Button label='=' click={setOperation} operation/>

                </div>


                <div className='memory'>
            <h1>Memoria</h1>
                </div>
                <ul>
                {memoryDisplay.map(value => (
                    <li>

                        {value}
                        <button
                            className='button marg'
                            onClick={e=>this.recoverValue(value)}
                        >MC</button>

                        <button
                            className='button'
                            onClick={e=>this.deleteValue(value)}
                        >MR</button>
                    
                    </li>
                        ))}
               </ul>
                
                </div>
            
        )
    }

}