import axios from 'axios';

const getAllAdmins = async ({ headers }) => {
  const res = await axios.get('/api/admins', {
    headers: headers,
  });

  const { data } = res.data;

  return data;
};

const createAdmin = async ({ username, password, role, headers }) => {
  const res = await axios.post(
    '/api/admin',
    {
      username,
      password,
      role,
    },
    {
      headers: headers,
    }
  );

  const { data } = res.data;
  return data;
};

const login = async ({ username, password }) => {
  const res = await axios.post('/api/login-admin', {
    username,
    password,
  });

  const { data, token } = res;
  return { data, token };
};

const verify = async ({ headers }) => {
  const res = await axios.get('/api/verify-admin', {
    headers: headers,
  });

  return res.data.data;
};

const createEvent = async ({ headers, formData }) => {
  try {
    const res = await axios.post('/api/events', formData, {
      headers: headers,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const fetchAllEvents = async () => {
  try {
    const res = await axios.get('/api/events');
    return res.data;
  } catch (err) {
    return err;
  }
};

export {
  getAllAdmins,
  createAdmin,
  login,
  verify,
  createEvent,
  fetchAllEvents,
};
