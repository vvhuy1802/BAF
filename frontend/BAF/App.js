import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';

import {getTodos} from './src/middlewares/Todos_api';
import {useDispatch} from 'react-redux';
import todo from './redux/todo';

const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getTodos().then(data => {
      console.log(data)
      dispatch(todo.actions.setDataTodos(data));
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
