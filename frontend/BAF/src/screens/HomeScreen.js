import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getTodos,
  createTodo,
  getTodoSlug,
  deleteTodo,
} from '../middlewares/Todos_api';
import todo from '../../redux/todo';
import {useDispatch, useSelector} from 'react-redux';
const height = Dimensions.get('window').height;
const HomeScreen = () => {
  const dispatch = useDispatch();
  const {dataTodos} = useSelector(state => state.todo);
  const [modalVisible, setModalVisible] = useState(false);
  const [todoSingle, setTodo] = useState({});

  const openTodo = slug => {
    const todo = dataTodos.find(todo => todo.slug === slug);
    console.log(todo);
    setTodo(todo);
    setModalVisible(true);
  };

  const onCreateTodo = () => {
    const temp = Math.random().toString(36).substring(7);
    const color = [
      'red',
      'green',
      'blue',
      'yellow',
      'orange',
      'purple',
      'pink',
      'brown',
      'black',
      'gray',
      'cyan',
      'magenta',
      'teal',
      'maroon',
      'olive',
      'navy',
      'lime',
      'aqua',
      'fuchsia',
      'silver',
      'gold',
    ];
    const datanew = {
      name: 'Create a new todos ' + temp,
      isComplete: false,
      color: color[Math.floor(Math.random() * color.length)],
      slug: 'create-a-new-todos' + temp,
    };
    createTodo(datanew).then(res => {
      if (res.status === 201) {
        const newarr = [...dataTodos, res.todo];
        dispatch(todo.actions.setDataTodos(newarr));
      }
    });
  };

  const onDeleteTodo = slug => {
    deleteTodo(slug).then(res => {
      if (res.status === 204) {
        const newarr = dataTodos.filter(todo => todo.slug !== slug);
        dispatch(todo.actions.setDataTodos(newarr));
      }
    });
  };

  const formatCreatedAt = date => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
  };

  const formatName = name => {
    //regex if name is > 7 words then return name.slice(0, 7) + '...'
    if (name) {
      const regex = /\s+/gi;
      const words = name.split(regex);
      if (words.length > 7) {
        return words.slice(0, 7).join(' ') + '...';
      }
      return name;
    }
    return null;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          padding: 20,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          Your Todos
        </Text>
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: '100%',
              height: height - 230,
              marginTop: 20,
            }}>
            {dataTodos.map((todo, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '100%',
                    marginBottom: 10,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      height: 70,
                    }}>
                    <View
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
                        width: 10,
                        height: '100%',
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      }}
                    />
                    <View
                      style={{
                        padding: 10,
                        width: '100%',
                        height: '100%',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          openTodo(todo.slug);
                        }}
                        style={{
                          width: '80%',
                          height: '100%',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                          }}>
                          {formatName(todo.name)}
                        </Text>
                        <Text>{formatCreatedAt(todo.createdAt)}</Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          width: '20%',
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            onDeleteTodo(todo.slug);
                          }}>
                          <Text>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          onCreateTodo();
        }}
        style={{
          position: 'absolute',
          bottom: 50,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#e0e0e0',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 30,
            color: '#5f5f5f',
          }}>
          +
        </Text>
      </TouchableOpacity>
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
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: '90%',
              height: '20%',
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: '100%', height: '100%'}}>
              <View
                style={{
                  backgroundColor:
                    todoSingle.color === 'success'
                      ? 'green'
                      : todoSingle.color === 'danger'
                      ? 'red'
                      : todoSingle.color === 'warning'
                      ? 'yellow'
                      : todoSingle.color === 'info'
                      ? 'blue'
                      : todoSingle.color === 'primary'
                      ? 'purple'
                      : todoSingle.color === 'secondary'
                      ? 'gray'
                      : todoSingle.color,
                  width: '100%',
                  height: 10,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              />
              <View
                style={{
                  padding: 10,
                  width: '100%',
                  height: '100%',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    height: '85%',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Name:{' '}
                    <Text style={{color: 'gray'}}>
                      {formatName(todoSingle.name)}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Time:{' '}
                    <Text style={{color: 'gray'}}>
                      {formatCreatedAt(todoSingle.createdAt)}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Status:{' '}
                    <Text style={{color: 'gray'}}>
                      {' '}
                      {todoSingle.isComplete ? 'Completed' : 'Not Completed'}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default HomeScreen;
