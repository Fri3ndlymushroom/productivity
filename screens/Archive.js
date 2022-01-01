import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Button, Text, View } from "react-native"
import g, { p } from '../styles/global'
import { copyObject } from '../js/functions';
import NavbarStack from '../components/NavbarStack'

export default function Archive({ navigation, screenProps }) {


    let archived = screenProps.data.projects.filter((project) => project.archived)

    const restoreProject = (pid) => {
        let copy = copyObject(screenProps.data)
        let index = copy.projects.findIndex((project) => project.pid === pid)
        copy.projects[index].archived = false

        copy.all_logs.forEach((log, i) => {
            if (log.pid === pid) {
                copy.all_logs[i].archived = false
            }
        })
        screenProps.setData(copy)
    }



    return (
        <View syle={g.bodyWrapper}>
            <View style={g.body}>
                <NavbarStack navigation={navigation} loc={"Archive"}></NavbarStack>
                {
                    archived.map((project) => {
                        return (
                            <View style={g.projectCard}>
                                <Text>{project.name}</Text>
                                <TouchableOpacity onPress={() => { restoreProject(project.pid) }}>
                                    <Text>Restore</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    );
}

