import React from 'react'


const TimeInput = (time, onChange) => {
  console.log(time.time)
  return (
    <input type="number"
           id={time.time}
           name={time.time}
           className="digits"
           value={time.time}
           onChange={onChange}/>
  )
}


export default TimeInput
