import styled from "@emotion/styled";
import ProfileTab from "@components/profile/ProfileTab";
import SettingIcon from "@components/icons/common/Setting.icon";
import BackButton from "@components/common/BackButton";
import { DefaultHeader } from "@components/common/DefaultHeader";
import ProfileInfo from "@components/profile/ProfileInfo";
import Link from "next/link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 45px;
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 768px;
`;

const RightAreaContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
`;

const Profile = () => {
  const rightArea = () => {
    return (
      <Link href={"/setting"}>
        <RightAreaContainer>{SettingIcon()}</RightAreaContainer>
      </Link>
    );
  };

  return (
    <Container>
      <DefaultHeader leftArea={BackButton()} rightArea={rightArea()} />
      <ProfileInfo />
      <ProfileTab />
    </Container>
  );
};

export default Profile;
