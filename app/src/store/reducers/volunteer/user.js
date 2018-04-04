const initialState = {
    _id: undefined,
    email: undefined,
    phoneNo: undefined,
    firstName: undefined,
    lastName: undefined,
    password: undefined,
    verified: false,
    role: undefined,
    jwt: undefined
};

const user = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default user;
