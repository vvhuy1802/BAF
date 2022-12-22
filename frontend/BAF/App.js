import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
const API_URL = 'http://192.168.0.109:3000';
const App = () => {
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json().then(data => {
        setTodos(data);
        console.log(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createTodo = async () => {
    try {
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Create a new todos2',
          isComplete: false,
          color: 'red',
          slug: 'create-a-new-todos2',
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.status === 201) {
        setTodos([...todos, json.todo]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTodoSlug = async slug => {
    try {
      const response = await fetch(`${API_URL}/todos/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json().then(data => {
        setTodo(data);
        console.log(data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openTodo = todo => {
    getTodoSlug(todo.slug);
    setModalVisible(true);
  };

  const deleteTodo = async slug => {
    try {
      const response = await fetch(`${API_URL}/todos/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
      getTodos();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  const formatCreatedAt = date => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState({});
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={() => {
          createTodo();
        }}
        style={{
          backgroundColor: 'purple',
          width: '90%',
          height: 70,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{color: 'white'}}>Create a new todo</Text>
      </TouchableOpacity>
      <ScrollView
        style={{
          width: '100%',
        }}>
        {todos.map((todo, index) => {
          return (
            <View
              key={index}
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  openTodo(todo);
                }}
                style={{
                  backgroundColor:
                    todo.color === 'success'
                      ? 'green'
                      : todo.color === 'danger'
                      ? 'red'
                      : todo.color === 'warning'
                      ? 'yellow'
                      : todo.color === 'info'
                      ? 'blue'
                      : todo.color === 'primary'
                      ? 'purple'
                      : todo.color === 'secondary'
                      ? 'gray'
                      : todo.color,
                  width: '90%',
                  height: 70,
                  borderRadius: 10,
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>{todo.name}</Text>
                    <Text style={{color: 'white', padding: 5}}>
                      {formatCreatedAt(todo.createdAt)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      deleteTodo(todo.slug);
                    }}
                    style={{
                      color: 'white',
                      position: 'absolute',
                      right: 20,
                    }}>
                    <Text style={{color: 'white'}}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
      {todo && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: '50%',
                backgroundColor: 'red',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>{todo.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default App;
