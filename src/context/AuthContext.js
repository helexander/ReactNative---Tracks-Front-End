import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'signup':
            // Resets error message once user signs up and would proceed to resetting the state
            return { errorMessage: '', token: action.payload };
        default:
            return state;
    }
};

const signup = (dispatch) => {
    return async ({ email, password }) => {
        try {
            const response = await trackerApi.post('/signup', { email, password });
            await AsyncStorage.setItem('token', response.data.token);
            dispatch({ type: 'signup', payload: response.data.token });

            navigate('TrackList');
        } catch (err) {
            dispatch({ type: 'add_error', payload: 'Something went wrong with signing up' })
        }
    }
}

const signin = (dispatch) => {
    return ({ email, password }) => {

    }
}

const signout = (dispatch) => {
    return () => {

    }
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup },
    // By default the user is not logged in because there is no token
    // As soon as there is a token present, it would signal that the user is logged in 
    { token: null, errorMessage: '' }
);