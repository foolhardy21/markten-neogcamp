import React, { useState } from 'react'
import styles from './App.module.css'

const App = () => {
  const [billAmt, setBillAmt] = useState('')
  const [givenAmt, setGivenAmt] = useState('')
  const [notes, setNotes] = useState([0,0,0,0,0,0,0]) 
  const [message, setMessage] = useState('')
  const denominations = [2000,500,100,20,10,5,1]

  const showNotification = text => {
    setMessage(text)
      setTimeout(() => {
        setMessage('')
      },2000)
  }
  const calculateNumberOfNotes = (returnAmt, newNotes) => {
    return denominations.map((denom, index) => {
      if(denom <= returnAmt) {
        const numberOfNotes = Math.floor(returnAmt/denom)
        returnAmt = returnAmt%denom 
        return numberOfNotes
      } else return newNotes[index]
    })
  }
  const getReturnArray = e => {
    e.preventDefault()
    let returnAmt = givenAmt - billAmt
    let newNotes = [0,0,0,0,0,0,0]
    if(returnAmt < 0) {
      showNotification('give more money')
    } else if(returnAmt > 0) {
      newNotes = calculateNumberOfNotes(returnAmt, newNotes)
    } else {
      showNotification('no change to be given')
    }     
    setNotes([...newNotes])
  }
  const updateBillAmount = e => {
    setBillAmt(e.target.value)
  }
  const updateGivenAmount = e => {
    setGivenAmt(e.target.value)
  }

  return (
    <div>
      <h3>cash register manager</h3>
      <p>enter the bill amount and cash given by the customer and know minimum number of notes to return</p>
      {
        message && `${message}`
      }
      <form className={styles.form_div} onSubmit={getReturnArray}>
        <label htmlFor='bill_amt'>bill amount</label>
        <input type='number' name='bill_amt' value={billAmt} onChange={updateBillAmount} />
        <label htmlFor='given_amt'>cash given</label>
        <input type='number' name='given_amt' value={givenAmt} onChange={updateGivenAmount}/>
        <input type='submit' value='check'/>
      </form>
      <div className={styles.denomination_div}>
      {
        denominations.map((value, index) => {
          return <div key={index}>{value} - {notes[index]}</div>
        })
      }
      </div>

    </div>
  );
}

export default App;
