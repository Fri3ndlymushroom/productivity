import { StyleSheet } from 'react-native';

export const p = {
    bg1: "#191B2A",
    bg2: "#1C2033",

    hl: "#5755D3",

    text__main: "#c9c9c9",
    text__dim: "#444866",

    br: 10
}



export const headerStyle = {

    backgroundColor: p.bg2,
}

const shadow = {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: p.bg1,
        color: p.text__main,
        height: "100%",
        display: "flex",
        alignItems: 'center',
    },
    projectCard: {
        backgroundColor: p.bg2,
        width: "100%",
        margin: 5,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: p.br,
        justifyContent: "space-between",
        alignSelf: "center",
        ...shadow
    },
    shadow: {
        ...shadow
    },
    dayTitle: {
        marginLeft: 5,
        color: p.text__main,
        fontSize: 16,
    },
    text: {
        color: p.text__main,
    },
    buttonText: {
        textAlign: "center"
    },
    textDim: {
        color: p.text__dim
    },
    input: {
        height: 40,
        width: "40%",
        margin: 12,
        padding: 10,
        color: p.text__main,
        backgroundColor: p.bg2,
        borderRadius: p.br
    },
    navbarTopMargin: {
        height: 100,
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: p.bg2,
        borderRadius: p.br,
    },
    logoWrapper: {
        height: 38,
        width: 38,
        borderRadius: p.br,
        backgroundColor: p.bg1,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles