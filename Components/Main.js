/* eslint-disable prettier/prettier */
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import Payments from './Payment/Payments';
import PaymentForm from './Payment/PaymentForm';
import AppBar from './AppBar';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import Login from './Login';
import LoadingScreen from './LoadingScreen';

const Stack = createStackNavigator();

export class Main extends React.Component {
  render() {
    let userSessionState = this.props.userSessionState;
    let loadingState = this.props.loadingState;
    return (
      <PaperProvider>
        <LoadingScreen
          loading={loadingState.loading}
          loadingMessage={loadingState.loadingMessage}
        />
        {userSessionState.authenticated === false ||
        userSessionState.expired === true ? (
          <Login />
        ) : (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                header: props => <AppBar {...props} />,
              }}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Payments" component={Payments} />
              <Stack.Screen name="PaymentForm" component={PaymentForm} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </PaperProvider>
    );
  }
}

const mapStateToProps = state => ({
  userSessionState: state.UserSession.value,
  loadingState: state.LoadingSlicer.value,
  appState: state,
});
export default connect(mapStateToProps)(Main);
