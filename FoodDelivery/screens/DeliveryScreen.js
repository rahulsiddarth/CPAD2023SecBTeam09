import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import MapView, { Marker } from 'react-native-maps';
import * as Icon from "react-native-feather";
import { emptyCart } from '../slices/cartSlice';
import { getDeliveryPartner } from '../constants';

export default function DeliveryScreen() {
    const restaurant = useSelector(state => selectRestaurant(state));
    const navigation = useNavigation();
    const dispatch = useDispatch(); 

    const cancelOrder = ()=> {
        navigation.navigate('Home');
        dispatch(emptyCart());
    }
    return (
        <View className="flex-1" >
            <View className="flex-1">
                <Image className="h-30 w-30" source={require('../assets/images/bikeGuy2.gif')} alt=""/>
            </View>
            <View className="rounded-t-3xl -mt-12 bg-white relative">
                <TouchableOpacity className="absolute right-4 top-2">

                </TouchableOpacity>
                <View className="flex-row justify-between px-5 pt-10">
                    <View>
                        <Text className="text-lg text-gray-700 font-semibold">Estimated Arrival</Text>
                        <Text className="text-3xl font-extrabold text-gray-700">20-30 Minutes</Text>
                        <Text className="mt-2 text-gray-700 font-semibold">Your Order is own its way</Text>
                    </View>
                    <Image className="h-24 w-24" source={require('../assets/images/bikeGuy.png')} />
                </View>
                <View
                    style={{ backgroundColor: themeColors.bgColor(0.8) }}
                    className="p-2 flex-row justify-between items-center rounded-full my-5 mx-2">
                    <View style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="p-1 rounded-full">
                        <Image style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="w-16 h-16 rounded-full" source={require('../assets/images/deliveryGuy.png')} />
                    </View>

                    <View className="flex-1 ml-3">
                        <Text className="text-lg font-bold text-white">{getDeliveryPartner()}</Text>
                        <Text className="text-white font-semibold">Your Delivery Partner</Text>
                    </View>
                    <View className="flex-row items-center space-x-3 mr-3">
                        <TouchableOpacity className="bg-white p-2 rounded-full">
                            <Icon.Phone fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} strokeWidth="1" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={cancelOrder} className="bg-white p-2 rounded-full">
                            <Icon.X stroke={'red'} strokeWidth="5" />
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </View>
    )
}