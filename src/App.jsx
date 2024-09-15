import Navbar from "./components/Navbar.jsx";
import Weather from "./components/Weather.jsx";

const App = () => {
    return (
        <div className="overflow-x-hidden text-neutral-400 antialiased selection:bg-cyan-300 selection:text-cyan-900">
            <div
                className="absolute top-0 z-[-2] h-screen w-screen bg-white
                bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"
            ></div>

            <div className="container mx-auto px-8">
                <Navbar/>
                <Weather />
            </div>
        </div>
    )
}

export default App