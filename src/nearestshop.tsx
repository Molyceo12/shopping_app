import React from "react";
import { MapPin, Truck, Store } from "lucide-react";

const NearestStores: React.FC = () => {
  const stores = [
    {
      name: "Fresh Mart",
      location: "Ohio State, USA KN201 TN",
      image: "/assets/uganda.jpeg",
    },
    {
      name: "SuperShop",
      location: "California, USA CA409 XY",
      image: "/assets/nigeria.jpeg",
    },
    {
      name: "City Market",
      location: "Michigan, USA MI112 AB",
      image: "/assets/kenya.jpeg",
    },
    {
      name: "Tanzania Mart",
      location: "Texas, USA TX330 GH",
      image: "/assets/tanzania.jpeg",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Nearest Stores
      </h2>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {stores.map((store, idx) => (
          <div
            key={idx}
            className="min-w-[220px] bg-white rounded-3xl shadow-lg flex-shrink-0 transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group"
          >
            <div className="h-48 w-full overflow-hidden rounded-t-3xl relative">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition-opacity rounded-t-3xl"></div>
            </div>

            <div className="p-5 flex flex-col gap-2">
              <h3 className="text-lg font-bold text-gray-800">{store.name}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin size={16} />
                <span>{store.location}</span>
              </div>

              <div className="flex gap-3 mt-3">
                <Truck size={16} className="text-green-500" />
                <Store size={16} className="text-orange-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearestStores;
