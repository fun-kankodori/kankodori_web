//ヘッダーコンポーネント

import { FaRegCircleQuestion } from "react-icons/fa6";

interface HeaderProps {
  onRuleDialogOpen: () => void;
  customUrl: string;
  setCustomUrl: (url: string) => void;
  onUrlChange: () => void;
  isUrlChanged: boolean;
}

export const Header = ({
  onRuleDialogOpen,
  customUrl,
  setCustomUrl,
  onUrlChange,
  isUrlChanged,
}: HeaderProps) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex flex-col space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          {/* Brand */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl">🏔️</span>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              観光地検索支援システム
            </h1>
            <button
              onClick={onRuleDialogOpen}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
            >
              <FaRegCircleQuestion className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* URL Config & Survey */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 lg:items-center">
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="カスタムURL"
                  className="flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={onUrlChange}
                  className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  変更
                </button>
              </div>
              {isUrlChanged && (
                <p className="text-green-600 text-xs sm:text-sm font-medium animate-fade-in text-center sm:text-left">
                  ✨ URLが更新されました
                </p>
              )}
            </div>

            <div className="flex items-center justify-center sm:justify-end space-x-2 lg:space-x-3">
              <a
                href="https://forms.gle/GcCZZ3fwnG8X3KSo6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-xs sm:text-sm font-medium"
              >
                📝 アンケート
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
