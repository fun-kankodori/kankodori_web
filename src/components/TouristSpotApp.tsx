//検索部分のコンポーネント、観光地の検索と追加

"use client";

import { ChangeEvent, DragEvent } from "react";
import { useAppState } from "@/hooks/useAppState";
import { useApi } from "@/hooks/useApi";
import { MAX_DESCRIPTION_LENGTH } from "@/constants";
import { Header } from "./Header";
import { SearchCard } from "./SearchCard";
import { SearchResults } from "./SearchResults";
import { RuleDialog } from "./dialogs/RuleDialog";
import { ImageDialog } from "./dialogs/ImageDialog";
import { AddPlaceDialog } from "./dialogs/AddPlaceDialog";

export const TouristSpotApp = () => {
  const state = useAppState();
  const api = useApi(state.url);

  // ファイル処理
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].type.startsWith("image/")
    ) {
      const file = e.target.files[0];
      state.setFile(file);
      state.setPreview(URL.createObjectURL(file));
      state.setError(null);
    } else {
      state.setError("画像ファイルのみをアップロードしてください");
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type.startsWith("image/")
    ) {
      const file = e.dataTransfer.files[0];
      state.setFile(file);
      state.setPreview(URL.createObjectURL(file));
      state.setError(null);
    } else {
      state.setError("画像ファイルのみをアップロードしてください");
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropAreaClick = () => {
    // SearchCardコンポーネント内でrefを管理
  };

  const handleResetPreview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    state.setFile(null);
    state.setPreview(null);
    state.setError(null);
  };

  // 検索処理
  const handleSubmit = async () => {
    if (!state.file && !state.text) {
      alert("テキストまたは画像のどちらかを入力してください");
      return;
    }

    state.setIsLoading(true);

    try {
      const results = await api.submitSearch(
        state.file,
        state.text,
        state.range
      );
      state.setData(results);
    } catch (error) {
      console.error(error);
      state.setData([]);
    } finally {
      state.setIsLoading(false);
    }
  };

  // 画像提案
  const handleSelectImage = async () => {
    try {
      const images = await api.getSuggestedImages();
      state.setSuggestedImages(images);
      state.setIsImageDialogOpen(true);
    } catch (error) {
      console.error(error);
      alert("画像選択肢の取得に失敗しました");
    }
  };

  const handleSuggestedImageClick = async (imageName: string) => {
    try {
      const file = await api.getImageBlob(imageName);
      state.setFile(file);
      state.setPreview(URL.createObjectURL(file));
      state.setError(null);
      state.setIsImageDialogOpen(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      alert(imageName + "の取得に失敗しました");
    }
  };

  // URL変更
  const handleUrlChange = () => {
    if (state.customUrl) {
      state.setUrl(state.customUrl);
      state.setIsUrlChanged(true);
      setTimeout(() => state.setIsUrlChanged(false), 3000);
    }
  };

  // 観光地追加
  const handleNewPlaceFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      e.target.files[0] &&
      e.target.files[0].type.startsWith("image/")
    ) {
      const file = e.target.files[0];
      state.setNewPlaceFile(file);
      state.setNewPlacePreview(URL.createObjectURL(file));
    } else {
      alert("画像ファイルのみをアップロードしてください");
    }
  };

  const handleNewPlaceDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      e.dataTransfer.files[0].type.startsWith("image/")
    ) {
      const file = e.dataTransfer.files[0];
      state.setNewPlaceFile(file);
      state.setNewPlacePreview(URL.createObjectURL(file));
    } else {
      alert("画像ファイルのみをアップロードしてください");
    }
  };

  const handleNewPlaceDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleNewPlaceDropAreaClick = () => {
    // AddPlaceDialogコンポーネント内でrefを管理
  };

  const handleAddPlace = async () => {
    if (!state.newPlaceFile || !state.newPlaceName) {
      alert("画像と名前は必須です");
      return;
    }

    if (state.newPlaceDescription.length > MAX_DESCRIPTION_LENGTH) {
      alert("感想は100字以内にしてください");
      return;
    }

    try {
      const message = await api.addPlace(
        state.newPlaceFile,
        state.newPlaceName,
        state.newPlaceLocation,
        state.newPlaceDescription,
        state.newPlaceTags
      );
      alert(message);

      // フォームリセット
      state.setNewPlaceFile(null);
      state.setNewPlacePreview(null);
      state.setNewPlaceName("");
      state.setNewPlaceLocation("");
      state.setNewPlaceDescription("");
      state.setNewPlaceTags("");
      state.setIsAddPlaceDialogOpen(false);
    } catch (error) {
      console.error(error);
      alert("観光地の追加に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header
        onRuleDialogOpen={() => state.setIsRuleDialogOpen(true)}
        customUrl={state.customUrl}
        setCustomUrl={state.setCustomUrl}
        onUrlChange={handleUrlChange}
        isUrlChanged={state.isUrlChanged}
      />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <SearchCard
          text={state.text}
          setText={state.setText}
          file={state.file}
          preview={state.preview}
          error={state.error}
          range={state.range}
          setRange={state.setRange}
          isLoading={state.isLoading}
          onFileChange={handleFileChange}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDropAreaClick={handleDropAreaClick}
          onResetPreview={handleResetPreview}
          onSelectImage={handleSelectImage}
          onSubmit={handleSubmit}
          onAddPlaceDialogOpen={() => state.setIsAddPlaceDialogOpen(true)}
        />

        <SearchResults data={state.data} />
      </main>

      <RuleDialog
        isOpen={state.isRuleDialogOpen}
        onClose={() => state.setIsRuleDialogOpen(false)}
      />

      <ImageDialog
        isOpen={state.isImageDialogOpen}
        onClose={() => state.setIsImageDialogOpen(false)}
        suggestedImages={state.suggestedImages}
        onImageClick={handleSuggestedImageClick}
      />

      <AddPlaceDialog
        isOpen={state.isAddPlaceDialogOpen}
        onClose={() => state.setIsAddPlaceDialogOpen(false)}
        newPlaceName={state.newPlaceName}
        setNewPlaceName={state.setNewPlaceName}
        newPlaceLocation={state.newPlaceLocation}
        setNewPlaceLocation={state.setNewPlaceLocation}
        newPlaceFile={state.newPlaceFile}
        newPlacePreview={state.newPlacePreview}
        newPlaceDescription={state.newPlaceDescription}
        setNewPlaceDescription={state.setNewPlaceDescription}
        newPlaceTags={state.newPlaceTags}
        setNewPlaceTags={state.setNewPlaceTags}
        onFileChange={handleNewPlaceFileChange}
        onDrop={handleNewPlaceDrop}
        onDragOver={handleNewPlaceDragOver}
        onDropAreaClick={handleNewPlaceDropAreaClick}
        onAddPlace={handleAddPlace}
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        @media (min-width: 640px) {
          .slider::-webkit-slider-thumb {
            height: 20px;
            width: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
