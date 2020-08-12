import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { secondsToMinutes } from '../util'

export default function Clock(props) {
  return (
    <View style={styles.clock}>
      <Text style={{ fontSize: 50, lineHeight: 50, marginBottom: 20 }}>
        { props.isPrep ? 'PREPARE' : props.isPause ? 'PAUSE' : 'WORK' }
      </Text>
      <Text style={{ fontSize: 150, lineHeight: 150}}>
        {props.isPrep ? props.time : secondsToMinutes(props.time)}
      </Text>
      <Text style={{ fontSize: 50, lineHeight: 50 }}>
        ROUND {props.rounds}
      </Text>
    </View>    
  )
}

const styles = StyleSheet.create({
  clock: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
})