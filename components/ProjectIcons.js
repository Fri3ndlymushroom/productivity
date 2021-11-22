
import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Path } from "react-native-svg"

export default function ProjectIcons({ figure }) {
    return (
        <>
            {
                (figure === "cube") && <Cube />
            }{
                (figure === "add") && <Add />
            }{
                figure === "back" && <Back />
            }
        </>
    )
}


function Cube() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={23}
            height={23}
            fill="none"
        >
            <Path
                stroke="#fff"
                d="M11.63 21.981L1.04 17.48a.1.1 0 01-.061-.092V5.529a.1.1 0 01.139-.092l10.474 4.452a.1.1 0 00.078 0l10.613-4.512M11.63 21.981v-9.056m0 9.056l10.591-4.502a.1.1 0 00.06-.092V5.377m0 0L11.669.865a.1.1 0 00-.075 0L4.021 3.867"
            />
        </Svg>
    )
}


function Add() {
    return (
        <Svg
            width={14}
            height={14}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <Path
                d="M5.688 4.688V1a1 1 0 011-1h.625a1 1 0 011 1v3.688a1 1 0 001 1H13a1 1 0 011 1v.625a1 1 0 01-1 1H9.312a1 1 0 00-1 1V13a1 1 0 01-1 1h-.625a1 1 0 01-1-1V9.312a1 1 0 00-1-1H1a1 1 0 01-1-1v-.625a1 1 0 011-1h3.688a1 1 0 001-1z"
                fill="#fff"
            />
        </Svg>
    )
}

function Back() {
    return (
        <Svg
            viewBox="0 0 7 11"
            width={10}
            height={15}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M.407 5.87l4.74 4.31a.5.5 0 00.69-.017l.288-.288a.5.5 0 00-.021-.727L2.42 5.874a.5.5 0 010-.748l3.684-3.274a.5.5 0 00.021-.727L5.837.837a.5.5 0 00-.69-.016L.407 5.13a.5.5 0 000 .74z"
                fill="#fff"
            />
        </Svg>
    )
}