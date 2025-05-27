//機能の説明ダイアログ

interface RuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleDialog = ({ isOpen, onClose }: RuleDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full p-4 sm:p-6 relative mx-3">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          ✕
        </button>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 pr-8">
          システムの説明
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
          テキスト・画像を入力して観光地を検索するためのシステムです。
        </p>
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-600">
            • テキストもしくは画像のどちらか一方は必ず入力してください
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            • バーはテキストと画像の検索結果への反映割合を示しています
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};
