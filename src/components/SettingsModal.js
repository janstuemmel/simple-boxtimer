import React from 'react'
import { View, Modal, Platform, ScrollView, TouchableOpacity, StyleSheet, Text, TouchableHighlight } from 'react-native'

export function SettingsModalItem(props) {
  return (
    <View style={styles.item}>
      {props.children}
    </View>
  )
}

export function SettingsModalTouchable(props) {
  return (
    <TouchableHighlight {...props} activeOpacity={0.6} underlayColor="#e0e0e0" onPress={props.onPress} >
      <View style={styles.item}>
        {props.children}
      </View>
    </TouchableHighlight>
  )
}

export function SettingsModalHeader(props) {
  return (
    <Text style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, borderBottomWidth: 1, borderColor: '#f9f9f9' }}>{props.label}</Text>
  )
}

function Wrapper(props) {

  return Platform.OS === 'web' ? (
    <View style={[styles.modal, { display: props.visible ? 'flex' : 'none' }]}>
      {props.children}
    </View>
  ) : (
    <Modal {...props} transparent={true} onRequestClose={props.onRequestClose} >
      {props.children}
    </Modal>  
  )
}

export default function SettingsModal(props) {

  return (
    <Wrapper {...props}>
        <TouchableOpacity activeOpacity={100} onPress={props.onRequestClose} style={styles.overlay} />
        <View intensity={20} style={[ styles.content, styles.elevation ]}>
          <ScrollView bounces={true} fadingEdgeLength={100}>            
            {props.children}
          </ScrollView>
        </View>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  elevation: Platform.OS === 'web' ? {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
  } : { 
    elevation: 24 
  },
  modal: Platform.OS === 'web' ? {
    flexDirection: 'column',
    position: 'absolute',
    width: '100%', 
    height: '100%', 
    zIndex: 1,
  } : {},
  overlay: {
    flex: 1,
  },
  content: {
    flex: 0.78, 
    backgroundColor: 'white',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    paddingTop: 15, 
  },
  item: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 15, 
    paddingBottom: 15, 
    paddingLeft: 20, 
    paddingRight: 20
  }
})