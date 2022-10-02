import create from 'zustand'
import { nanoid } from 'nanoid'

const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) =>
    window.localStorage.setItem(key, JSON.stringify(value))

const useStore = create(set => ({
    texture: 'dirt',
    cubes: getLocalStorage('cubes') || [],
    addCube: (x, y, z) => {
        set(prev => ({
            cubes: [
                ...prev.cubes,
                { key: nanoid(), position: [x, y, z], texture: prev.texture },
            ],
        }))
    },
    removeCube: (x, y, z) => {
        set(prev => ({
            cubes: prev.cubes.filter(cube => {
                const [cubeX, cubeY, cubeZ] = cube.position
                return cubeX !== x || cubeY !== y || cubeZ !== z
            }),
        }))
    },
    setTexture: texture => {
        set(() => ({ texture }))
    },
    saveWorld: () => {
        set(prev => {
            setLocalStorage('cubes', prev.cubes)
            return {}
        })
    },
    resetWorld: () => {
        set(() => ({
            cubes: [],
        }))
    },
}))

export default useStore
