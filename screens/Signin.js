
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
            navigation.goBack()
        }).catch(error => alert(error.message))
    }
    const handleLogIn = () => {
        auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
            const user = userCredentials.user
            navigation.goBack()
        }).catch(error => alert(error.message))
    }



    return (
        <View style={g.body}>
            <NavbarStack navigation={navigation} loc={"Sign Up"}></NavbarStack>
            <View syle={s.signinSection}>
                <View style={s.modeSelection}>
                <TouchableOpacity style={[s.button]} onPress={() => setSignType("Log In")}>
                    <Text style={[signType==="Log In" ? g.text : g.textDim , g.buttonText]}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.button]} onPress={() => setSignType("Sign Up")}>
                    <Text style={[signType==="Sign Up" ? g.text : g.textDim, g.buttonText]}>Sign Up</Text>
                </TouchableOpacity>
                </View>

                <TextInput
                    style={s.formInput}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholderTextColor={p.text__dim} 
                />
                <TextInput
                    style={s.formInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholderTextColor={p.text__dim} 
                />
                <TouchableOpacity style={s.button} onPress={() => (signType === "Log In") ? handleLogIn() : handleSignUp()}>
                    <Text style={[g.text, g.buttonText]}>Submit</Text>
                </TouchableOpacity>

            </View>

        </View >
    )
}

const s = StyleSheet.create({
    signinSection: {
        backgroundColor: p.bg2,
    },
    formInput: {
        height: 40,
        width: 300,
        marginVertical: 5,
        padding: 10,
        color: p.text__main,
        backgroundColor: p.bg2,
        borderRadius: p.br,
    },
    modeSelection:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button:{
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: p.bg2,
        borderRadius: p.br,
    },
})
