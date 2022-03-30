/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  setAuthenticated,
  setUnAuthenticated,
  setUsername,
  setPassword,
} from '../store/slicers/UserSessionSlicer';
import {sendGetRequest} from '../utils/AjaxUtil';
import {TextInput} from 'react-native-paper';
import {View} from 'react-native';
import {Title} from 'react-native-paper';

export default function Login() {
  const [username, setLoginUsername] = useState('');
  const [password, setLoginpassword] = useState('');
  const dispatch = useDispatch();
  return (
    <View
      style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 20,
      }}>
      <Title alignContent="center">As App</Title>
      <TextInput
        mode="outlined"
        label="Username"
        style={{margin: 5}}
        placeholder="username"
        value={username}
        onChangeText={setLoginUsername}
        left={<TextInput.Icon icon="account-circle" />}
        // right={<TextInput.Affix text="/100" />}
      />
      <TextInput
        mode="outlined"
        label="Password"
        style={{margin: 5}}
        placeholder="password"
        value={password}
        onChangeText={setLoginpassword}
        left={<TextInput.Icon icon="key" />}
        // right={<TextInput.Affix text="/100" />}
      />
      <Button
        onPress={() => {
          alert(username);
          // sendGetRequest(
          //   'authenticate',
          //   {},
          //   (res, other) => {
          //     if (res.data != '') {
          //       dispatch(setAuthenticated(res.data));

          //       alert('authenticated');
          //     } else {
          //       dispatch(
          //         setUnAuthenticated(
          //           "Cann't retrieve user information, contact your administrator",
          //         ),
          //       );
          //       alert('unauthenticated1');
          //     }
          //   },
          //   (err, other) => {
          //     alert(err.toString());
          //   },
          //   dispatch,
          //   false,
          //   null,
          // );
        }}>
        Sign in
      </Button>
    </View>
  );
}
