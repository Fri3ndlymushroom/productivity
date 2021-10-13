import { StyleSheet } from 'react-native';

export const p = {
    bg1: "#1b1b27",
    bg2: "#202231",
    bg3: "#2d2f41",

    text__main: "#fff",
    text__dim: "#a6a7ab",
}


export const headerStyle = {

    backgroundColor: p.bg2,
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: p.bg1,
        color: p.text__main,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text:{
        color: p.text__dim
    }
});

export default styles