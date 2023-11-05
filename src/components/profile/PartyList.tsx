import React from "react";
import styled from "@emotion/styled";
import { ColorToken } from "styles/Color";
import { DefaultText } from "@components/common/DefaultText";
import Image from "next/image";
import { PartyData } from "types/party";
import { useRouter } from "next/router";

interface PartyListProps {
  partydata: PartyData;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 16px;
  background-color: ${ColorToken.grey4};
  cursor: pointer;
`;

const PartyDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.div`
  display: flex;
  flex-direction: row;
`;
const Detail1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
const Detail2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const PartyList = ({ partydata }: PartyListProps) => {
  const router = useRouter();
  //데이터 구조 추후 변경
  const {
    categoryId = "",
    thumbnailUrl = "",
    partyTitle = "",
    region = "",
    partyTime = "",
    genderLimit = "",
    agePreference = "",
    partyMessage = "",
    totalRecruitment = "",
  } = partydata;

  return (
    <Container
      onClick={() => {
        router.push(`/partydetail/${categoryId}`);
      }}
    >
      <Image
        src="/images/profile/profile.png"
        alt="프로필사진"
        width={160}
        height={120}
        objectFit="cover"
      />
      <PartyDetail>
        <Title>
          <DefaultText text={partyTitle} size={16}></DefaultText>
        </Title>
        <Detail1>
          <DefaultText text={region} size={16} />
          <DefaultText text={partyTime} size={16} />
        </Detail1>
        <Detail2>
          <DefaultText text={totalRecruitment} size={16} />•
          <DefaultText text={genderLimit} size={16} />•
          <DefaultText text={agePreference} size={16} />
        </Detail2>
      </PartyDetail>
    </Container>
  );
};

export default PartyList;
