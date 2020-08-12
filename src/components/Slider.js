import React from 'react'
import { Slider, Platform } from 'react-native'

export default function(props) {

  const onChange = evt => props.onSlidingComplete(evt.currentTarget.value)

  return Platform.OS === 'web' ? (
    <input 
      type="range" 
      disabled={props.disabled} 
      style={{ flex: 1, marginLeft: 20 }} 
      min={props.minimumValue}
      max={props.maximumValue}
      step={'0.1'}
      value={props.value} 
      onChange={onChange} 
      />
  ) : <Slider {...props} />
}