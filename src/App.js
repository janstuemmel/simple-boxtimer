import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Platform, Switch } from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { useKeepAwake } from 'expo-keep-awake'
import { FontAwesome5 } from '@expo/vector-icons'
import { Audio } from 'expo-av'

import Timer from './timer'
import { useInterval } from './util'
import SettingsModal, { SettingsModalItem, SettingsModalHeader, SettingsModalTouchable } from './components/SettingsModal'
import Slider from './components/Slider'
import Clock from './components/Clock'
import KeepAwake from './components/KeepAwake'
import beepSound from './beep.mp3'

const sound = new Audio.Sound()

const DEFAULT_TIMERS = [
  { label: '3min / 1min', trainingTime: 180, pauseTime: 60 },
  { label: '2min / 1min', trainingTime: 120, pauseTime: 60 },
  { label: '1min / 1min', trainingTime: 60, pauseTime: 60 },
  { label: '50sec', trainingTime: 50, pauseTime: 50 },
  { label: '40sec', trainingTime: 40, pauseTime: 40 },
  { label: '30sec', trainingTime: 30, pauseTime: 30 },
  { label: '20sec', trainingTime: 20, pauseTime: 20 },
  { label: '10sec', trainingTime: 10, pauseTime: 10 },
]

export default function App() {

  const [ modalVisible, setModalVisible ] = useState(false)
  
  const [ timer, setTimer ] = useState(new Timer(180, 60))
  const [ time, setTime ] = useState(timer.trainingTime)
  const [ rounds, setRounds ] = useState(1)
  const [ stopped, setStopped ] = useState(true)
  const [ isPause, setIsPause ] = useState(false)
  const [ isIdle, setIsIdle ] = useState(true)
  const [ isPrep, setIsPrep ] = useState(false)
  const [ isUnmute, setIsUnmute ] = useState(true)
  const [ soundVolume, setSoundVolume ] = useState(0.5) 

  
  async function playSound() {
  
    // unload the sound after playing
    sound.setOnPlaybackStatusUpdate(status => status.didJustFinish ? sound.unloadAsync() : null)
  
    // play sound
    await sound.loadAsync(beepSound)
    await sound.setVolumeAsync(soundVolume)
    await sound.replayAsync()
  }
  // keep display on
  useKeepAwake()

  // clock tick
  const tick = () => {

    timer.tick()
    
    if (timer.isTurn && isUnmute) {
      playSound()
    }
    
    setIsPrep(timer.isPrep)
    setIsIdle(false)
    setTime(timer.time)
    setIsPause(timer.isPause)
    setRounds(timer.rounds)
  }

  // the timer's interval
  useInterval(tick, stopped ? null : 1000)

  // reset clock
  const _reset = (trainingTime) => {
    setIsPrep(false)
    setIsIdle(true)
    setTime(trainingTime)
    setIsPause(false)
    setRounds(1)
    setStopped(true)
  }

  const resetTimer = () => {
    
    // set the old timer as a new one
    setTimer(new Timer(timer.trainingTime, timer.pauseTime))

    // reset
    _reset(timer.trainingTime)
  }

  const selectTimer = (trainingTime, pauseTime) => () => {
    
    // set a new timer
    setTimer(new Timer(trainingTime, pauseTime))

    // reset
    _reset(trainingTime)
    
    // close select modal
    setModalVisible(false)
  }

  const startTimer = () => {

    // tick one time at start, to prevent sucking a second
    if (stopped) tick()

    // set stopped false to start interval
    setStopped(!stopped)
  }

  // backgroundcolor for background and status bar
  const backgroundColor = isPrep ? 'yellow' : isIdle ? 'white' : isPause ? 'lightcoral' : 'lightgreen'

  // set the status bar color for progressive web apps
  if (Platform.OS === 'web') {
    document.querySelector('meta[name="theme-color"]').setAttribute('content', backgroundColor)
  }


  const BottomBarButton = props => (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={props.onPress}>
      <FontAwesome5 name={props.icon} size={36} color="black" />
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <KeepAwake />
      <StatusBar backgroundColor={backgroundColor} />

      <SettingsModal transparent={true} animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        
        <SettingsModalHeader label="TIMERS" />
        
        { DEFAULT_TIMERS.map((t, i) => 
          <SettingsModalTouchable key={`timer_${i}`} onPress={selectTimer(t.trainingTime, t.pauseTime)}>
            <FontAwesome5 style={{ width: 28 }} name="hourglass-start" size={18} color="black" />
            <Text style={{ fontSize: 18, flex: 1 }}>{t.label}</Text>
          </SettingsModalTouchable>
        )}

        <SettingsModalHeader label="SETTINGS" />
        
        <SettingsModalItem>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <FontAwesome5 style={{ width: 28 }} name={ isUnmute ? 'bell' : 'bell-slash' } size={18} color="black" />
            <Text style={{ fontSize: 18, flex: 1 }}>Play Sound</Text>
          </View>
          <Switch value={isUnmute} onValueChange={() => setIsUnmute(!isUnmute)} />
        </SettingsModalItem>
        <SettingsModalItem>
          <FontAwesome5 style={{ width: 28 }} name={ soundVolume >= 0.5 ? 'volume-up' : soundVolume > 0.25 ? 'volume-down' : 'volume-off' } size={18} color="black" />
          <Text style={{ fontSize: 18 }}>Volume</Text>
          <Slider style={{ flex: 1 }} disabled={!isUnmute} minimumValue={0} maximumValue={1} step={0.01} value={soundVolume} onSlidingComplete={val => setSoundVolume(val)} />
        </SettingsModalItem>
      </SettingsModal>

      <Clock isPause={isPause} isPrep={isPrep} rounds={rounds} time={time} />
      
      <View style={{ height: 70, flexDirection: 'row' }}>
        <BottomBarButton icon={stopped ? 'play' : 'pause'} onPress={startTimer} />
        <BottomBarButton icon="redo" onPress={resetTimer} />
        <BottomBarButton icon="cog" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  )
}
