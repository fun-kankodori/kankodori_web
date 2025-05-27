//観光スポットの検索や画像の取得、追加を行うためのAPIフック

import axios from "axios";
import { TouristSpot, SuggestedImage } from "@/types";
import { MAX_RESULTS } from "@/constants";

export const useApi = (url: string) => {
  const submitSearch = async (
    file: File | null,
    text: string,
    range: number
  ): Promise<TouristSpot[]> => {
    const formData = new FormData();
    formData.append(
      "file",
      file ? file : new Blob(),
      file ? file.name : "null"
    );
    formData.append("text", text ? text : "null");
    formData.append("range", range.toString());

    const response = await axios.post(`${url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "true",
      },
    });

    const imagePromises = response.data["result"]
      .slice(0, MAX_RESULTS)
      .map(async (item: any) => {
        const imageResponse = await axios.get(item.image_url, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          responseType: "blob",
        });
        return {
          ...item,
          image_url: URL.createObjectURL(imageResponse.data),
        };
      });

    return await Promise.all(imagePromises);
  };

  const getSuggestedImages = async (): Promise<SuggestedImage[]> => {
    const response = await axios.get(`${url}/api/query_image`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    const imagePromises = response.data["images"].map(
      async (image: string) => {
        const imageResponse = await axios.get(
          `${url}/api/query_image/${image}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
            responseType: "blob",
          }
        );
        return {
          name: image,
          url: URL.createObjectURL(imageResponse.data),
        };
      }
    );

    return await Promise.all(imagePromises);
  };

  const getImageBlob = async (imageName: string): Promise<File> => {
    const response = await axios.get(`${url}/api/query_image/${imageName}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      responseType: "blob",
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch image. Status code: ${response.status}`);
    }

    return new File([response.data], imageName, {
      type: response.data.type,
    });
  };

  const addPlace = async (
    file: File,
    name: string,
    location: string,
    description: string,
    tags: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("tags", tags);

    const response = await axios.post(`${url}/add_place`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "ngrok-skip-browser-warning": "true",
      },
    });

    return response.data["message"];
  };

  return {
    submitSearch,
    getSuggestedImages,
    getImageBlob,
    addPlace,
  };
};