import axios from 'axios';

const getAllAdmins = async () => {
  const res = await axios.get('/api/admins');

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

export { getAllAdmins, createAdmin, login, verify };
