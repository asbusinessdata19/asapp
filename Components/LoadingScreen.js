/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, ActivityIndicator, Text, Button} from 'react-native';
import {blue100} from 'react-native-paper/lib/typescript/styles/colors';
export default function LoadingScreen(props) {
  return (
    <View
      style={{
        display:
          props.loading != null && props.loading == true ? 'flex' : 'none',
        flexDirection: 'row',
        zIndex: 9999,
        backgroundColor: 'gray',
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        opacity: 0.8,
        // padding: 20,
      }}>
      <ActivityIndicator size="large" color="blue" Text="Loading" />
      <Text
        style={{
          textAlignVertical: 'center',
          color: 'blue',
        }}>
        {props.loadingMessage != null && props.loadingMessage != ''
          ? props.loadingMessage
          : 'Loading...please wait'}
      </Text>
    </View>
  );
}
