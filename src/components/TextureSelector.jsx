import { useEffect, useState } from 'react'
import useKeyboard from '../hooks/useKeyboard'
import useStore from '../hooks/useStore'
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../images'

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,

    wood: woodImg,
    log: logImg,
}

export default function TextureSelector() {
    const [visible, setVisible] = useState(false)
    const [activeTexture, setTexture] = useStore(state => [
        state.texture,
        state.setTexture,
    ])
    const { dirt, grass, glass, wood, log } = useKeyboard()

    useEffect(() => {
        const textures = {
            dirt,
            grass,
            glass,
            wood,
            log,
        }

        const pressedTexture = Object.entries(textures).find(([k, v]) => v)
        if (pressedTexture) setTexture(pressedTexture[0])
    }, [setTexture, dirt, grass, glass, wood, log])

    useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false)
        }, 2000)

        setVisible(true)

        return () => {
            clearTimeout(visibilityTimeout)
        }
    }, [activeTexture])

    if (!visible) return <></>

    return (
        <div className="texture-selector">
            {Object.entries(images).map(([key, src]) => (
                <img
                    {...{ src, key }}
                    alt={key}
                    className={key === activeTexture ? 'active' : 'inactive'}
                />
            ))}
        </div>
    )
}
