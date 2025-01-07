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

const fetchEventById = async ({ id }) => {
  try {
    const res = await axios.get(`/api/events/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const createCategory = async ({ headers, eventCategoryData }) => {
  try {
    const res = await axios.post('/api/eventCategory', eventCategoryData, {
      headers: headers,
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

const deleteEvent = async ({ id }) => {
  try {
    const res = await axios.delete(`/api/events/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`/api/eventCategory/${id}`);
    return res.data;
  } catch (err) {
    return err;
  }
};

const createSchedule = async ({ data, headers }) => {
  try {
    const res = await axios.post('/api/matches', data, {
      headers: headers,
    });

    return res.data;
  } catch (err) {
    return err;
  }
};

const getSchedule = async (id) => {
  try {
    const res = await axios.get(`/api/matches/${id}`);
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
  fetchEventById,
  createCategory,
  deleteEvent,
  deleteCategory,
  createSchedule,
  getSchedule,
};
