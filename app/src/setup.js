import * as Expo from 'expo';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './index';
import store from './store';

class Setup extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }
    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ isReady: true });
    }
    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default Setup;