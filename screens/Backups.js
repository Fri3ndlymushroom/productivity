import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import g, { p } from "../styles/global"
import NavbarStack from '../components/NavbarStack'
import { auth } from "../js/firebase"
import { TextInput, } from 'react-native-gesture-handler'

export default function Backups({ navigation }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
    }




    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Backups"}></NavbarStack>

            <View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity onPress={() => handleSignUp()}>
                    <Text>Submit</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
