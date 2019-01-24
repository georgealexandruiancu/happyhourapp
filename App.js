/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from 'react-navigation';
import Formular from "./app/components/Formular";
import Main from "./app/components/Main";
import Register from "./app/components/Register";
import Detalii from "./app/components/Detalii";
import User from "./app/components/User";
import Istoric from "./app/components/Istoric";
import Cumpara_Abonament from "./app/components/Cumpara_Abonament";

const RouteStack = createStackNavigator({
  Formular: {
    screen: Formular, 
    navigationOptions: {
      header: null 
    }
  },

  Register: {
    screen: Register, 
    navigationOptions: {
      header: null 
    }
  },
  Main: { screen: Main, navigationOptions: { header: null } },
  Detalii: { screen: Detalii, navigationOptions: { header: null } },
  User: { screen: User, navigationOptions: { header: null } },
  Istoric: { screen: Istoric, navigationOptions: { header: null } },
  Cumpara_Abonament: { screen: Cumpara_Abonament, navigationOptions: { header: null } }
})

const App = createAppContainer(RouteStack);
export default App;