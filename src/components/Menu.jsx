import useStore from '../hooks/useStore'

export default function Menu() {
    const [saveWorld, resetWorld] = useStore(state => [
        state.saveWorld,
        state.resetWorld,
    ])

    return (
        <div className="menu">
            <a className="button" onClick={() => saveWorld()}>
                Save
            </a>
            <a className="button" onClick={() => resetWorld()}>
                Reset
            </a>
        </div>
    )
}
