"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LatLngTuple } from "leaflet";

// Dynamically import the Map component with no SSR
const DynamicMap = dynamic(() => import("../app/components/Map"), {
  ssr: false,
});

const Page = () => {
  const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(
    null
  );
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleLocationSelect = async (location: LatLngTuple) => {
    setSelectedLocation(location);
    console.log("Selected location in parent component:", location);
    fetchWeatherData(location);
  };

  const fetchWeatherData = async ([lat, lon]: LatLngTuple) => {
    const apiKey = "4f2efac6ed38e62570e03ee96c4476a1";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex-1">
        <DynamicMap onLocationSelect={handleLocationSelect} />
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {weatherData ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Weather at {weatherData.name}
            </h2>
            <p className="text-lg">Temperature: {weatherData.main.temp}°C</p>
            <p className="text-lg">
              Weather: {weatherData.weather[0].description}
            </p>
          </div>
        ) : (
          <p className="text-lg">
            Click on the map to see the weather information.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;

// "use client";
// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import { LatLngTuple } from "leaflet";

// // Dynamically import the Map component with no SSR
// const DynamicMap = dynamic(() => import("../app/components/Map"), {
//   ssr: false,
// });

// const Page = () => {
//   const [selectedLocation, setSelectedLocation] = useState<LatLngTuple | null>(
//     null
//   );

//   const handleLocationSelect = (location: LatLngTuple) => {
//     setSelectedLocation(location);
//     console.log("Selected location in parent component:", location);
//   };

//   return (
//     <div>
//       <h1>Map Example</h1>
//       <DynamicMap onLocationSelect={handleLocationSelect} />
//       {selectedLocation && (
//         <div>
//           <h2>Selected Location:</h2>
//           <p>Latitude: {selectedLocation[0]}</p>
//           <p>Longitude: {selectedLocation[1]}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;
