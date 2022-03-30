/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {setLoading, setUnLoading} from '../store/slicers/LoadingSlicer';
import {useDispatch} from 'react-redux';
import {Card, Button} from 'react-native-paper';
import {useState} from 'react';

export default function Home({navigation}) {
  let dispatch = useDispatch();

  return (
    <View>
      <Card margin={5}>
        <Card.Title
          title="My Payments"
          subtitle="Access your payments"
          // left={LeftContent}
        />
        <Card.Actions style={{alignContent: 'flex-end'}}>
          <Button onPress={() => navigation.navigate('Payments')}>Open</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
