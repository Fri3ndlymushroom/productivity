
import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput, } from 'react-native-gesture-handler'
import { auth } from "../js/firebase"
import g, { p } from "../styles/global"
import NavbarStack from '../components/NavbarStack'

export default function Signin({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signType, setSignType] = useState("Log In")


    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
            const user = userCredentials.user
        }).catch(error => alert(error.message))
    }
    const handleLogIn = () => {
        auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
            const user = userCredentials.user
        }).catch(error => alert(error.message))
    }


    
    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Sign Up"}></NavbarStack>
            <View syle={s.signinSection}>
                <View syle={s.signinSelection}>
                    <TouchableOpacity onPress={() => setSignType("Log In")}>
                        <Text>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSignType("Sign Up")}>
                        <Text>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={g.text}>{signType}</Text>
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
                    <TouchableOpacity onPress={() => (signType === "Log In") ? handleLogIn() : handleSignUp()}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

const s = StyleSheet.create({
    signinSection: {

    }
})
