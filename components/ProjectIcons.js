
import React from 'react'
import { View, Text } from 'react-native'
import Svg, { Path, Circle } from "react-native-svg"
import g, { p } from "../styles/global"

export default function ProjectIcons({ figure }) {
    return (
        <>
            {
                (figure === "cube") && <Cube />
            }{
                (figure === "add") && <Add />
            }{
                figure === "back" && <Back />
            }{
                figure === "up" && <Up />
            }{
                figure === "down" && <Down />
            }{
                figure === "dots" && <Dots />
            }
        </>
    )
}

// https://react-svgr.com/playground/?expandProps=none&native=true

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
            width={14}
            height={20}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewbox="0 0 14 20">
            <Path
                scale={2}
                d="M.407 5.87l4.74 4.31a.5.5 0 00.69-.017l.288-.288a.5.5 0 00-.021-.727L2.42 5.874a.5.5 0 010-.748l3.684-3.274a.5.5 0 00.021-.727L5.837.837a.5.5 0 00-.69-.016L.407 5.13a.5.5 0 000 .74z"
                fill="#fff"
            />
        </Svg>
    )
}
function Up() {
    return (
        <Svg
            width={20}
            height={14}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewbox="0 0 20 14">
            <Path
                scale={2}
                d="M4.63.407.32 5.147a.5.5 0 0 0 .017.69l.288.288a.5.5 0 0 0 .727-.021L4.626 2.42a.5.5 0 0 1 .748 0l3.274 3.684a.5.5 0 0 0 .727.021l.288-.288a.5.5 0 0 0 .016-.69L5.37.407a.5.5 0 0 0-.74 0Z"
                fill={p.text__dim}
            />
        </Svg>
    )
}

const Down = () => (
    <Svg
        width={20}
        height={14}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewbox="0 0 20 14"
    >
        <Path
            scale={2}
            d="m5.37 6.093 4.31-4.74a.5.5 0 0 0-.017-.69L9.375.375a.5.5 0 0 0-.727.021L5.374 4.08a.5.5 0 0 1-.748 0L1.352.396A.5.5 0 0 0 .625.375L.337.663a.5.5 0 0 0-.016.69l4.309 4.74a.5.5 0 0 0 .74 0Z"
            fill={p.text__dim}
        />
    </Svg>
)


const Dots = () => {
    const scale = 1.3
    return (
        < Svg width={4 * scale}
            height={14 * scale}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewbox="0 0 20 14"
        >
            <Circle scale={scale} cx={2} cy={2} r={2} fill="#ffffff" />
            <Circle scale={scale} cx={2} cy={7} r={2} fill="#ffffff" />
            <Circle scale={scale} cx={2} cy={12} r={2} fill="#ffffff" />
        </Svg>
    )
}

