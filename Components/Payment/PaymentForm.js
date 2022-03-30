/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {sendPostRequest} from '../../utils/AjaxUtil';
import {useDispatch} from 'react-redux';

export default function PaymentForm() {
  const [paymentName, setPaymentName] = React.useState('');
  const [paymentType, setPaymentType] = React.useState('');
  const [paymentAmount, setPaymentAmount] = React.useState(0);
  const [paymentIntervalType, setPaymentIntervalType] = React.useState('MONTH');
  const [paymentIntervalValue, setPaymentIntervalValue] = React.useState(0);
  let dispatch = useDispatch();
  return (
    <ScrollView
      style={{
        padding: 20,
      }}>
      <Button
        icon="content-save"
        onPress={() => {
          // validate then construct Object
          let obj = {
            id: null,
            paymentName,
            paymentType,
            paymentIntervalType,
            paymentIntervalValue,
            paymentAmount,
          };
          sendPostRequest(
            'payment/save',
            obj,
            res => {
              alert(res.data.id);
            },
            err => {
              alert(err.toString());
            },
            dispatch,
            false,
            null,
          );
        }}>
        Save
      </Button>
      <TextInput
        onChangeText={setPaymentName}
        value={paymentName}
        style={{margin: 5}}
        label="Payment Name"
        placeholder="Payment Name"
      />
      <TextInput
        onChangeText={setPaymentType}
        style={{margin: 5}}
        value={paymentType}
        placeholder="Payment Type"
        label="Payment Type"
      />
      <TextInput
        onChangeText={setPaymentIntervalType}
        style={{margin: 5}}
        value={paymentIntervalType}
        placeholder="Interval Type"
        label="Interval Type"
      />
      <TextInput
        onChangeText={setPaymentAmount}
        style={{margin: 5}}
        value={paymentAmount}
        keyboardType="numeric"
        placeholder="Amount (LE)"
        label="Amount (LE)"
      />
      <TextInput
        onChangeText={setPaymentIntervalValue}
        style={{margin: 5}}
        value={paymentIntervalValue}
        keyboardType="number-pad"
        placeholder="Interval Value"
        label="Interval Value"
      />
    </ScrollView>
  );
}
