import {applyMiddleware, compose, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const middleware = [
    thunkMiddleware,
    createLogger()
];

const appStore = createStore(
    reducers,
    compose(applyMiddleware(...middleware))
);

export default appStore;