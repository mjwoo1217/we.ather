import map from "../assets/map.jpg"

const Weather = () => {
    return (
        <section className="max-w-7xl mx-auto border-b-2">
            <div className="flex flex-col items-center my-20">
                <img src={map} className="w-1/2 h-auto object-cover rounded-2xl p-2" />
            </div>
        </section>
    )
}

export default Weather