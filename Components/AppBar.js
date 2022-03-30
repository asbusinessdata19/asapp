/* eslint-disable prettier/prettier */
import {Appbar} from 'react-native-paper';
import React from 'react';
import {useNavigationState} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUnAuthenticated} from '../store/slicers/UserSessionSlicer';

export default function AppBar({navigation, back}) {
  let dispatch = useDispatch();

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content
        title="As Apps"
        subtitle={useNavigationState(
          state => state.routes[state.routes.length - 1].name,
        )}
      />
      {useNavigationState(
        state => state.routes[state.routes.length - 1].name,
      ) == 'Home' && (
        <Appbar.Action
          icon="logout"
          onPress={() => {
            dispatch(setUnAuthenticated());
          }}
        />
      )}
      {useNavigationState(
        state => state.routes[state.routes.length - 1].name,
      ) == 'Payments' && (
        <Appbar.Action
          icon="plus-box"
          onPress={() => {
            navigation.navigate('PaymentForm');
          }}
        />
      )}
      {useNavigationState(
        state => state.routes[state.routes.length - 1].name,
      ) == 'Payments' && <Appbar.Action icon="refresh" onPress={() => {}} />}

    </Appbar.Header>
  );
}
