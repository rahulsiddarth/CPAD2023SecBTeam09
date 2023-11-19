import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme'
import Categories from '../components/categories';
import { featured } from '../constants';
import FeaturedRow from '../components/featuredRow';
import { auth } from '../firbase';
import { useNavigation } from '@react-navigation/native';
import { getFeaturedRestaurants } from '../api';

export default function HomeScreen() {

    const [featuredRestaurants, setFeaturedRestaurants] = useState([])
    const navigation = useNavigation();
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }
    useLayoutEffect(() => {
        navigation.setOptions({headerShown: false})
    }, [])

    useEffect(()=>{
        getFeaturedRestaurants().then(data=>{
            // console.log("rahul", data)
            setFeaturedRestaurants(data);
        })
    },[])

    return (
        <SafeAreaView className="bg-white">
            <StatusBar barStyle="dark-content" />
            {/* Search Bar */}
            <View className="flex-row items-center space-x-2 px-4 pb-2 ">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <Icon.Search height="25" width="25" stroke="gray" />
                    <TextInput placeholder='Restaurants' className="ml-2 flex-1" keyboardType='default' />
                    <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                        <Icon.MapPin height="20" width="20" stroke="gray" />
                        <Text className="text-gray-600">SAP Labs, BLR</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 rounded-full">
                    <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
                </View>
                <View>
                <View>
                    <TouchableOpacity onPress={handleSignOut} style={{ backgroundColor: '#14b8a6' }} className="p-3 rounded-full">
                        <Icon.LogOut height={20} width={20} strokeWidth="2.5" stroke="white" />
                    </TouchableOpacity>
                </View>
                </View>
            </View>

            {/* main view*/}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50
                }}
            >

                {/* categories */}
                <Categories />

                {/* featured */}
                <View className="mt-5">
                    {
                        featuredRestaurants.map((item, index) => {
                            return (
                                <FeaturedRow
                                    key={index}
                                    title={item.name}
                                    description={item.description}
                                    restaurants={item?.restaurants}
                                    featuredCategory={item.type}
                                />
                            )
                        })
                    }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}