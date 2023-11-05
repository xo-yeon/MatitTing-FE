import React from "react";
import styled from "@emotion/styled";
import LocationIcon from "@components/icons/profile/Location.icon";
import GenderIcon from "@components/icons/profile/Gender.icon";
import InfoIcon from "@components/icons/profile/Info.icon";
import { useRouter } from "next/router";
import { DefaultText } from "@components/common/DefaultText";
import { Color } from "styles/Color";

interface DescriptionDataType {
  partyTitle: string;
  partyContent: string;
  status: string;
  gender: string;
  age: string;
  deadline: string;
  partyTime: string;
  totalParticipate: number;
  participate: number;
  thumbnail: string;
  address: string;
}
//스키마 확정후 변경예정

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding-bottom: 20px;
  background-color: white;
`;

const PartyDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
  z-index: 99;
  background-color: white;
`;

const PartyTitle = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 99;
  gap: 10px;
`;

const PartyDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 20px;
  color: #919191;
`;
const PartyExplain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  font-size: 20px;
  color: #919191;
`;

const PartyInfo = (description: DescriptionDataType) => {
  const {
    partyTitle,
    partyContent,
    status,
    gender,
    age,
    deadline,
    partyTime,
    totalParticipate,
    participate,
    thumbnail,
    address,
  } = description;

  const router = useRouter();

  return (
    <Container>
      <PartyDetailContainer>
        <PartyTitle>
          <DefaultText text={partyTitle} size={24} />
          <DefaultText text={partyTime} size={16} />
        </PartyTitle>
        <PartyDetail>
          <LocationIcon />
          <DefaultText text={address} size={16} />
          <GenderIcon />
          <DefaultText text={gender} size={16} />
          <InfoIcon />
          <DefaultText text={age} size={16} />
        </PartyDetail>
        <PartyExplain>
          <DefaultText text={partyContent} size={16} color={Color.DarkGrey} />
        </PartyExplain>
      </PartyDetailContainer>
    </Container>
  );
};

export default PartyInfo;
