
import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput, } from 'react-native-gesture-handler'
import auth from "@react-native-firebase/auth"
import g, { p } from "../styles/global"
import NavbarStack from '../components/NavbarStack'
import { Spacer } from '../components/Components'

export default function Signin({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signType, setSignType] = useState("Log In")
    const [errorMessage, setErrorMessage] = useState("")


    const handleSignUp = () => {
        auth().createUserWithEmailAndPassword(email === "" ? "a" : email, password === "" ? "a" : password).then(userCredentials => {
            navigation.goBack()
        }).catch(error => setErrorMessage(error.message))
    }


    const handleLogIn = () => {
        auth().signInWithEmailAndPassword(email === "" ? "a" : email, password === "" ? "a" : password).then(userCredentials => {
            navigation.goBack()
        }).catch(error => setErrorMessage(error.message))
    }


    const resetPassowrd = () => {
        auth().sendPasswordResetEmail(email)
            .then(() => {
                setErrorMessage("Password reset email sent!")
            })
            .catch((error) => {
                setErrorMessage(error.message)
            });
    }



    return (
        <>
            {
                !auth().currentUser &&

                <View style={g.bodyWrapper}>
                    <View style={g.body}>
                        <NavbarStack navigation={navigation} loc={"Sign Up"}></NavbarStack>
                        <Spacer height={100} />
                        <Text style={s.signinInfo}>You need to log in to use the backup system so we can backup your data across all devices.</Text>
                        <View syle={s.signinSection}>

                            <View style={s.modeSelection}>
                                <TouchableOpacity style={[s.button]} onPress={() => setSignType("Log In")}>
                                    <Text style={[signType === "Log In" ? g.text : g.textDim, g.buttonText]}>Log In</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[s.button]} onPress={() => setSignType("Sign Up")}>
                                    <Text style={[signType === "Sign Up" ? g.text : g.textDim, g.buttonText]}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <Spacer height={40} />
                            <TextInput
                                style={s.formInput}
                                placeholder="Email"
                                value={email}
                                onChangeText={text => setEmail(text)}
                                placeholderTextColor={p.text__dim}
                            />
                            <View style={s.passwordSubmitWrapper}>
                                <TextInput
                                    style={[s.formInput, { width: 200 }]}
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    placeholderTextColor={p.text__dim}
                                    secureTextEntry={true}
                                />
                                <TouchableOpacity
                                    style={[{ height: 40, width: 90, marginVertical: 5, backgroundColor: p.bg2, borderRadius: p.br, display: "flex", justifyContent: "center", alignItems: "center" }]}
                                    onPress={() => (signType === "Log In") ? handleLogIn() : handleSignUp()}
                                >
                                    <Text style={[g.text, g.buttonText]}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={resetPassowrd}
                            >
                                <Text style={{ color: p.text__dim }}>Forgot Password?</Text>
                            </TouchableOpacity>
                            <Text style={{ textAlign: "center", marginTop: 10, color: "#eb4034", maxWidth: "80%" }}>{errorMessage}</Text>

                            <Spacer height={200} />


                        </View>

                    </View >
                </View>
            }
            {
                auth().currentUser &&
                <View style={g.bodyWrapper}>
                    <View style={g.body}>
                        <NavbarStack navigation={navigation} loc={"Sign Up"}></NavbarStack>
                        <Spacer height={100} />
                        <Text style={s.signinInfo}>You need to be logged in to use the backup system so we can backup your data across all devices.</Text>
                        <TouchableOpacity onPress={() => { auth().signOut(); navigation.goBack() }} style={s.button}>
                            <Text style={g.text}>Log Out</Text>
                        </TouchableOpacity>
                    </View >
                </View>
            }

        </>
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
    modeSelection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: p.bg2,
        borderRadius: p.br,
    },
    signinInfo: {
        marginHorizontal: "10%",
        marginVertical: 20,
        color: p.text__main,
        textAlign: "center"
    },
    passwordSubmitWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})
