
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Dimensions, StyleSheet } from 'react-native';

import HomeScreens from '../screens/HomeScreens';
import DeteailScreens from '../screens/DeteailScreens';
import FormScreens from '../screens/FormScreens';
import { Products } from '../interfaces/productInterface';

export type RootStackParams = {
    HomeScreens: undefined;
    DeteailScreens: Products;
    FormScreens: { id: string, name: string };
};

const Stack = createStackNavigator<RootStackParams>();

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
                headerTitle: props => <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain"/>,
            }}>
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
    },
    logo: { 
        width: screenWidth * 0.5, 
        height: 30 
    }
})

