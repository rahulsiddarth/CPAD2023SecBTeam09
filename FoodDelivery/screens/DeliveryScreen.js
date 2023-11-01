import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import featured from '../constants'
import { useNavigation } from '@react-navigation/native';

export default function DeliveryScreen() {
    const restaurant = featured.restaurants[0];
    const navigation = useNavigation();
    return (
        <View>
            <Text>Delivery Screen</Text>
        </View>
    )
}