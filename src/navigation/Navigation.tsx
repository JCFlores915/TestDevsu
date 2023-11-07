
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Dimensions, StyleSheet } from 'react-native';

import HomeScreens from '../screens/HomeScreens';
import DeteailScreens from '../screens/DeteailScreens';
import FormScreens from '../screens/FormScreens';

const Stack = createStackNavigator();

const screenWidth = Dimensions.get('window').width;


export const Navigation = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white'
                },
                headerStyle: styles.headerStyle,
                headerTitleAlign: 'center',
                headerTitle: props => <Image source={require('../assets/logo.png')} style={styles.logo} />,
            }}
        >
            <Stack.Screen name="HomeScreens" component={HomeScreens} />
            <Stack.Screen name="FormScreens" component={FormScreens} />
            <Stack.Screen name="DeteailScreens" component={DeteailScreens} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        height: 100,
    },
    logo: { 
        width: screenWidth * 0.5, 
        height: 30 }
})

