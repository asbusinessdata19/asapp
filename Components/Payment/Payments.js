/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView} from 'react-native';
import {sendGetRequest} from '../../utils/AjaxUtil';
import {Avatar, Button, Card} from 'react-native-paper';
import {connect} from 'react-redux';

const LeftContent = props => (
  <Avatar.Icon {...props} icon="credit-card-marker" />
);
class Payments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {paymentList: []};
  }
  componentDidMount() {
    sendGetRequest(
      'payment/all',
      {},
      res => {
        this.setState(state => (state.paymentList = res.data));
      },
      error => {
        alert(error.toString());
      },
      this.props.dispatch,
      false,
      null,
    );
  }
  render() {
    return (
      <ScrollView>
        {this.state.paymentList.map(payment => (
          <Card margin={5} key={payment.id}>
            <Card.Title
              title={payment.paymentName}
              subtitle={
                payment.paymentAmount + ' Last Paid @' + payment.lastPaymentDate
              }
              left={LeftContent}
            />
            <Card.Actions>
              <Button
                onPress={() => {
                  alert(payment.id);
                }}>
                Set Paid
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  dispatch: dispatch,
});

const mapStateToProps = (state, props) => ({
  appState: state,
  compProps: props,
});
export default connect(mapStateToProps, mapDispatchToProps)(Payments);
