import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import NavbarStack from '../components/NavbarStack'
import { auth } from '../js/firebase'



export default function Backups({ navigation }) {
    auth.signOut()
    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Edit Log"}></NavbarStack>
            <Text>Hello World</Text>
        </View>
    )
}
