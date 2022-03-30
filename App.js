import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import Main from './Components/Main';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
