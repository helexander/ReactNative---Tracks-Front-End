import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(Context);
    return (
        <View style={styles.container}>
            <NavigationEvents
                // onWillFocus={() => {}} //Will be called any time it navigates to this screen
                // onDidFocus = {() => {}} // Will be called anytime when it successfully navigates to this screen
                // onWillBlur = {() => {}} // Will be called when we are about to navigate away from the screen
                // onDidBlur = {() => {}} // Will be called as soon as the navigation transition completes
                onWillFocus={clearErrorMessage}

            />
            <AuthForm headerText="Sign in to Your Account"
                errorMessage={state.errorMessage}
                onSubmit={({ email, password }) => { signin({ email, password }) }}
                submitButtonText="Sign In"
            />
            <NavLink
                text="Dont have an account? Sign up instead."
                routeName="Signup"

            />
        </View>
    )
};

SigninScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
});

export default SigninScreen;