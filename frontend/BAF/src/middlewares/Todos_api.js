const API_URL = process.env.LOCAL_API_URL;

export const getTodos = async () => {
  try {
    console.log('API_URL: ', API_URL);
    const response = await fetch(`${API_URL}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async todo => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const getTodoSlug = async slug => {
  try {
    const response = await fetch(`${API_URL}/todos/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async slug => {
  try {
    const response = await fetch(`${API_URL}/todos/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return {status: 204, data};
  } catch (error) {
    console.error(error);
  }
};
