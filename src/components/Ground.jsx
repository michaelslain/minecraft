import { usePlane } from '@react-three/cannon'
import { groundTexture } from '../images/textures'
import useStore from '../hooks/useStore'

export default function Ground() {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.5, 0],
    }))
    const [addCube] = useStore(state => [state.addCube])

    const handleClick = e => {
        if (
            !(
                ('which' in e && e.which === 3) ||
                ('button' in e && e.button === 2)
            )
        )
            return

        e.stopPropagation()
        const point = Object.values(e.point).map(v => Math.ceil(v))
        addCube(...point)
    }

    return (
        <mesh {...{ ref }} onClick={handleClick}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    )
}
