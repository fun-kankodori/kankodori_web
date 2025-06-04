//検索部分のコンポーネント

import { ChangeEvent, DragEvent, useRef } from "react";
import { FaImage, FaSearch, FaPlus } from "react-icons/fa";

interface SearchCardProps {
  text: string;
  setText: (text: string) => void;
  file: File | null;
  preview: string | null;
  error: string | null;
  range: number;
  setRange: (range: number) => void;
  isLoading: boolean;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDropAreaClick: () => void;
  onResetPreview: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelectImage: () => void;
  onSubmit: () => void;
  onAddPlaceDialogOpen: () => void;
}

export const SearchCard = ({
  text,
  setText,
  file,
  preview,
  error,
  range,
  setRange,
  isLoading,
  onFileChange,
  onDrop,
  onDragOver,
  onDropAreaClick,
  onResetPreview,
  onSelectImage,
  onSubmit,
  onAddPlaceDialogOpen,
}: SearchCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
      {/* Upload Section */}
      <div className="mb-6 sm:mb-8">
        <div
          className={`border-2 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 text-center cursor-pointer transition-all duration-300 ${
            preview
              ? "border-blue-300 bg-blue-50/50"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/30"
          }`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={onDropAreaClick}
        >
          {preview ? (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-40 sm:max-h-48 lg:max-h-64 object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={onResetPreview}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center text-xs sm:text-sm font-bold"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <FaImage className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400" />
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                  画像をタップして選択
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  JPG, PNG, GIF対応
                </p>
              </div>
            </div>
          )}
          <input
            type="file"
            onChange={onFileChange}
            className="hidden"
            ref={fileInputRef}
            accept="image/*"
          />
        </div>

        <div className="flex justify-center mt-3 sm:mt-4">
          <button
            onClick={onSelectImage}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            <FaImage className="w-3 h-3 sm:w-4 sm:h-4" />
            画像の提案
          </button>
        </div>

        {error && (
          <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-xs sm:text-sm font-medium">
              ⚠️ {error}
            </p>
          </div>
        )}
      </div>

      {/* Text Input */}
      <div className="mb-6 sm:mb-8">
        <div className="relative">
          <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="どんな観光地をお探しですか？"
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base lg:text-lg bg-white/50 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Range Slider */}
      <div className="mb-6 sm:mb-8">
        <div className="text-center mb-4 sm:mb-6">
          <label className="text-sm sm:text-base lg:text-lg font-semibold text-gray-700">
            検索の重み付け
          </label>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            テキスト重視 ← → 画像重視
          </p>
        </div>

        <div className="max-w-sm mx-auto">
          {/* スライダー本体 */}
          <div className="relative px-3">
            <input
              type="range"
              min="0"
              max="100"
              step="20"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full appearance-none cursor-pointer slider-modern"
              style={{
                background: `linear-gradient(to right, #3b82f6 100%, #3b82f6 ${range}%, #8b5cf6 ${range}%, #8b5cf6 100%)`,
              }}
            />

            {/* カスタムスライダーのスタイル */}
            <style jsx>{`
              .slider-modern::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: white;
                border: 3px solid #6366f1;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
              }
              .slider-modern::-webkit-slider-thumb:hover {
                transform: scale(1.1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
              }
              .slider-modern::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: white;
                border: 3px solid #6366f1;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
              }
            `}</style>

            {/* 段階表示 */}
            <div className="flex justify-between mt-3 px-1">
              {[0, 20, 40, 60, 80, 100].map((value) => (
                <button
                  key={value}
                  onClick={() => setRange(value)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    range === value
                      ? "bg-indigo-500 scale-150"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* 現在の値表示 */}
          <div className="mt-4 bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">テキスト</span>
                <span className="text-gray-600 font-mono">{100 - range}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-mono">{range}%</span>
                <span className="font-medium">画像</span>
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 justify-center sm:space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="lg:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              検索中...
            </>
          ) : (
            <>
              <FaSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              検索
            </>
          )}
        </button>

        <button
          onClick={onAddPlaceDialogOpen}
          className="lg:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
          観光地を追加
        </button>
      </div>
    </div>
  );
};
