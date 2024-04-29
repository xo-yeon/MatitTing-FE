import styled from "@emotion/styled";
import TextInput from "@components/common/TextInput";
import KakaoMap from "@components/common/Map";
import { MapMarker } from "react-kakao-maps-sdk";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchBox from "./SearchBox";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { Marker } from "types/map";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
`;

const MapWrapper = styled.div`
  position: relative;
  height: 250px;
  text-align: center;
  background-color: #aaa;
`;

const MarkerText = styled.div`
  padding: 3px 5px;
`;

interface SearchMapProps {
  marker: Marker | null;
  resultList: kakao.maps.services.PlacesSearchResult | null;
  keyword: string;
  reset: () => void;
  handleChangeSearchBox: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClickPlace: (place: kakao.maps.services.PlacesSearchResultItem) => void;
}

const SearchMap = ({
  marker,
  keyword,
  resultList,
  reset,
  handleChangeSearchBox,
  handleClickPlace,
}: SearchMapProps) => (
  <>
    <SearchWrapper>
      <TextInput
        placeholder="장소 이름이나 주소를 검색해주세요."
        maxLength={20}
        value={keyword}
        name="search"
        onChange={handleChangeSearchBox}
      />
      <div onClick={reset}>
        <HighlightOffIcon style={{ fill: "#bbb", fontSize: "20px" }} />
      </div>
    </SearchWrapper>
    <MapWrapper>
      <SearchBox
        resultList={resultList}
        keyword={keyword}
        handleClickPlace={handleClickPlace}
      />
      {marker ? (
        <KakaoMap
          center={{
            lat: marker?.position.lat,
            lng: marker?.position.lng,
          }}
        >
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
          >
            <MarkerText>{marker.content}</MarkerText>
          </MapMarker>
        </KakaoMap>
      ) : (
        <KakaoMap
          center={{
            lng: 126.570667,
            lat: 33.450701,
          }}
        />
      )}
    </MapWrapper>
  </>
);

export default SearchMap;
