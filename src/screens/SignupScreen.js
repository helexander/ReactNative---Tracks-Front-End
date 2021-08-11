import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <View style={styles.container}>
        <Spacer>
            <Text h3>Sign Up for Tracker</Text>
        </Spacer>
        <Input label="Email" value={email} onChangeText={(newEmail) => setEmail(newEmail)} autoCapitalize="none" autoCorrect={false} />
        <Spacer />
        <Input label="Password" value={password} onChangeText={(newPassword) => setPassword(newPassword)} autoCapitalize="none" autoCorrect={false} secureTextEntry={true} />
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}
        <Spacer>
            <Button title="Sign Up" onPress={() => signup({ email, password })} />
        </Spacer>

    </View>
};

// To hide header section
SignupScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
    errorMessage: {
        marginLeft: 10,
        fontSize: 16,
        color: 'red'
    }
});

export default SignupScreen;