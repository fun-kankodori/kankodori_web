//観光地を追加するダイアログコンポーネント

import { ChangeEvent, DragEvent, useRef } from "react";
import { FaImage } from "react-icons/fa";

interface AddPlaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newPlaceName: string;
  setNewPlaceName: (name: string) => void;
  newPlaceLocation: string;
  setNewPlaceLocation: (location: string) => void;
  newPlaceFile: File | null;
  newPlacePreview: string | null;
  newPlaceDescription: string;
  setNewPlaceDescription: (description: string) => void;
  newPlaceTags: string;
  setNewPlaceTags: (tags: string) => void;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDropAreaClick: () => void;
  onAddPlace: () => void;
}

export const AddPlaceDialog = ({
  isOpen,
  onClose,
  newPlaceName,
  setNewPlaceName,
  newPlaceLocation,
  setNewPlaceLocation,
  newPlaceFile,
  newPlacePreview,
  newPlaceDescription,
  setNewPlaceDescription,
  newPlaceTags,
  setNewPlaceTags,
  onFileChange,
  onDrop,
  onDragOver,
  onDropAreaClick,
  onAddPlace,
}: AddPlaceDialogProps) => {
  const newPlaceFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto mx-3">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          ✕
        </button>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pr-8">
          観光地を追加
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {/* File Upload */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300"
            onDrop={onDrop}
            onDragOver={onDragOver}
            onClick={onDropAreaClick}
          >
            {newPlacePreview ? (
              <img
                src={newPlacePreview}
                alt="Preview"
                className="max-w-full h-24 sm:h-32 object-cover rounded-lg mx-auto"
              />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FaImage className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                <p className="text-xs sm:text-sm text-gray-600">
                  画像をタップして選択
                </p>
              </div>
            )}
            <input
              type="file"
              onChange={onFileChange}
              className="hidden"
              ref={newPlaceFileInputRef}
              accept="image/*"
            />
          </div>

          {/* Form Fields */}
          <input
            type="text"
            value={newPlaceName}
            onChange={(e) => setNewPlaceName(e.target.value)}
            placeholder="観光地の名前 *"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
            required
          />

          <input
            type="text"
            value={newPlaceLocation}
            onChange={(e) => setNewPlaceLocation(e.target.value)}
            placeholder="観光地の場所（例: 八雲）"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
          />

          <textarea
            value={newPlaceDescription}
            onChange={(e) => setNewPlaceDescription(e.target.value)}
            placeholder="感想（100字以内  例: 海が綺麗だった）"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-20 sm:h-24 text-sm sm:text-base"
            maxLength={100}
          />

          <input
            type="text"
            value={newPlaceTags}
            onChange={(e) => setNewPlaceTags(e.target.value)}
            placeholder="タグ (例: 綺麗, 神社)"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
          />
        </div>

        <button
          onClick={onAddPlace}
          className="w-full mt-4 sm:mt-6 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm sm:text-base"
        >
          追加
        </button>
      </div>
    </div>
  );
};
