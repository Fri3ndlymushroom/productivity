import { StyleSheet } from 'react-native';

export const p = {
    bg1: "#FFFFFF",
    bg2: "#FFFFFF",
    bg3: "#2d2f41",

    text__main: "#000000",
    text__dim: "#a6a7ab",

    br: 10
}



export const headerStyle = {

    backgroundColor: p.bg2,
}




const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: p.bg1,
        color: p.text__main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectCard: {
        backgroundColor: p.bg2,
        width: 300,
        margin: 5,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        borderRadius: p.br,
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    dayTitle: {
        marginLeft: 5,
        color: p.text__main
    },
    text: {
        color: p.text__main
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default styles