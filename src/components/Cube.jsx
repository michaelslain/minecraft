import { useBox } from '@react-three/cannon'
import * as textures from '../images/textures'
import useStore from '../hooks/useStore'
import { useState } from 'react'

export default function Cube({ position, texture }) {
    const [hover, setHover] = useState(false)

    const [ref] = useBox(() => ({ type: 'Static', position }))
    const activeTexture = textures[texture + 'Texture']
    const [addCube, removeCube] = useStore(state => [
        state.addCube,
        state.removeCube,
    ])

    const handleClick = e => {
        e.stopPropagation()
        const clickedFace = Math.floor(e.faceIndex / 2)
        const { x, y, z } = ref.current.position

        if (
            !(
                ('which' in e && e.which === 3) ||
                ('button' in e && e.button === 2)
            )
        ) {
            removeCube(x, y, z)
            return
        }

        switch (clickedFace) {
            case 0:
                addCube(x + 1, y, z)
                return
            case 1:
                addCube(x - 1, y, z)
                return
            case 2:
                addCube(x, y + 1, z)
                return
            case 3:
                addCube(x, y - 1, z)
                return
            case 4:
                addCube(x, y, z + 1)
                return
            case 5:
                addCube(x, y, z - 1)
                return
        }
    }

    const handleMouseOver = e => {
        e.stopPropagation()
        setHover(true)
    }

    const handleMouseOut = e => {
        e.stopPropagation()
        setHover(false)
    }

    const color = hover ? 'lightgrey' : 'white'

    return (
        <mesh
            {...{ ref }}
            onPointerMove={handleMouseOver}
            onPointerOut={handleMouseOut}
            onClick={handleClick}
        >
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial
                {...{ color }}
                map={activeTexture}
                transparent={true}
                opacity={texture === 'glass' ? 0.4 : 1}
                attach="material"
            />
        </mesh>
    )
}
