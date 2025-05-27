//useAppState.tsを作成し、アプリケーションの状態を管理するためのカスタムフックを定義

import { useState } from "react";
import { TouristSpot, SuggestedImage } from "@/types";
import { DEFAULT_URLS, DEFAULT_RANGE } from "@/constants";

export const useAppState = () => {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState<number>(DEFAULT_RANGE);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TouristSpot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(DEFAULT_URLS[0]);
  const [customUrl, setCustomUrl] = useState<string>("");
  const [isUrlChanged, setIsUrlChanged] = useState(false);
  const [suggestedImages, setSuggestedImages] = useState<SuggestedImage[]>([]);

  // Dialog states
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState<boolean>(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);
  const [isAddPlaceDialogOpen, setIsAddPlaceDialogOpen] = useState<boolean>(false);

  // New place states
  const [newPlaceName, setNewPlaceName] = useState<string>("");
  const [newPlaceLocation, setNewPlaceLocation] = useState<string>("");
  const [newPlaceFile, setNewPlaceFile] = useState<File | null>(null);
  const [newPlacePreview, setNewPlacePreview] = useState<string | null>(null);
  const [newPlaceDescription, setNewPlaceDescription] = useState<string>("");
  const [newPlaceTags, setNewPlaceTags] = useState<string>("");

  return {
    // Search related
    text, setText,
    file, setFile,
    range, setRange,
    preview, setPreview,
    error, setError,
    data, setData,
    isLoading, setIsLoading,
    url, setUrl,
    customUrl, setCustomUrl,
    isUrlChanged, setIsUrlChanged,
    suggestedImages, setSuggestedImages,

    // Dialog states
    isRuleDialogOpen, setIsRuleDialogOpen,
    isImageDialogOpen, setIsImageDialogOpen,
    isAddPlaceDialogOpen, setIsAddPlaceDialogOpen,

    // New place states
    newPlaceName, setNewPlaceName,
    newPlaceLocation, setNewPlaceLocation,
    newPlaceFile, setNewPlaceFile,
    newPlacePreview, setNewPlacePreview,
    newPlaceDescription, setNewPlaceDescription,
    newPlaceTags, setNewPlaceTags,
  };
};