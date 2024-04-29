import { ChangeEvent, useCallback, useState } from "react";
import { Marker, Place } from "types/map";

const useSearchPlace = () => {
  const [marker, setMarker] = useState<Marker | null>(null);
  const [keyword, setKeyword] = useState("");
  const [resultList, setResultList] =
    useState<kakao.maps.services.PlacesSearchResult | null>(null);

  const reset = () => {
    setKeyword("");
    setMarker(null);
    setResultList(null);
  };

  const setPlace = useCallback(
    ({ lat, lng, placeName }: Place) =>
      setMarker({
        position: {
          lat: lat,
          lng: lng,
        },
        content: placeName,
      }),
    []
  );

  const handleClickPlace = useCallback(
    ({
      x: lng,
      y: lat,
      place_name: placeName,
    }: kakao.maps.services.PlacesSearchResultItem) => {
      setResultList(null);
      setKeyword(placeName);
      setPlace({ lat: Number(lat), lng: Number(lng), placeName });
    },
    [setPlace]
  );

  const handleChangeSearchBox = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const places = new kakao.maps.services.Places();

      setKeyword(e.target.value);

      places.keywordSearch(
        e.target.value,
        (data, status, _pagination) => {
          const resultStatus = kakao.maps.services.Status;
          if (status === resultStatus.ERROR) return;

          if (status === resultStatus.ZERO_RESULT) {
            return;
          }

          if (status === resultStatus.OK) {
            setResultList(data);
          }
        },
        {
          category_group_code: "FD6",
          size: 8,
        }
      );
    },
    []
  );

  return {
    marker,
    setMarker,
    resultList,
    setResultList,
    keyword,
    setKeyword,
    setPlace,
    reset,
    handleChangeSearchBox,
    handleClickPlace,
  };
};

export default useSearchPlace;
