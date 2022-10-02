import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSphere } from '@react-three/cannon'
import { Vector3 } from 'three'
import useKeyboard from '../hooks/useKeyboard'

const JUMP_FORCE = 4
const SPEED = 4

export default function Player() {
    const { moveBackward, moveForward, moveRight, moveLeft, jump } =
        useKeyboard()

    const { camera } = useThree()
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0],
    }))

    const position = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe(newPosition => (position.current = newPosition))
    }, [api.position])

    const velocity = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe(newVelocity => (velocity.current = newVelocity))
    }, [api.velocity])

    useFrame(() => {
        camera.position.copy(new Vector3(...position.current))

        const direction = new Vector3()
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        )
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(direction.x, velocity.current[1], direction.z)

        if (jump && Math.abs(velocity.current[1] < 0.05))
            api.velocity.set(
                velocity.current[0],
                JUMP_FORCE,
                velocity.current[2]
            )
    })

    return <mesh {...{ ref }}></mesh>
}
