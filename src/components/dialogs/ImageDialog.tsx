//画像の提案ダイアログコンポーネント

import { SuggestedImage } from "@/types";

interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedImages: SuggestedImage[];
  onImageClick: (imageName: string) => void;
}

export const ImageDialog = ({
  isOpen,
  onClose,
  suggestedImages,
  onImageClick,
}: ImageDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-2xl lg:max-w-4xl w-full p-4 sm:p-6 relative max-h-[85vh] overflow-y-auto mx-3">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
        >
          ✕
        </button>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 pr-8">
          画像の提案
        </h2>
        {suggestedImages && suggestedImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {suggestedImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Suggested ${index}`}
                className="w-full h-24 sm:h-32 object-cover rounded-lg cursor-pointer hover:ring-4 hover:ring-blue-300 transition-all duration-200 hover:scale-105"
                onClick={() => onImageClick(image.name)}
              />
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-sm sm:text-base"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};
