import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default axios.create({
    baseURL: 'http://a43e-203-121-223-250.ngrok.io'
});

