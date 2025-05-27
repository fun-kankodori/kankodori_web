//検索結果コンポーネント

import { FaMapMarkerAlt } from "react-icons/fa";
import { TouristSpot } from "@/types";

interface SearchResultsProps {
  data: TouristSpot[];
}

export const SearchResults = ({ data }: SearchResultsProps) => {
  if (data.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        🎯 検索結果
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 sm:hover:-translate-y-2"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-1">
                <FaMapMarkerAlt className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                <span className="truncate">{item.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
