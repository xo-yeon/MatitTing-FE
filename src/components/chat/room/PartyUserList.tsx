import styled from "@emotion/styled";
import { ReactElement } from "react";
import Image from "next/image";
import { ChatUserListResponse } from "types/chat/chatRooms";

interface PartyUserListProps {
  isOpenUserList: boolean;
  userList: ChatUserListResponse[];
}

const Wrapper = styled.div<{ isOpenUserList: boolean }>`
  position: absolute;
  top: 50px;
  left: 0;
  transform: ${(props) =>
    props.isOpenUserList ? "translateX(0)" : "translateX(-100%)"};
  z-index: 99999;
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #fff;
`;

const Title = styled.h5`
  padding: 1rem 2rem;
  height: 50px;
`;

const List = styled.ul`
  padding: 0 2rem;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  background-color: skyblue;
`;

const NickName = styled.p``;

const Expulsion = styled.button``;

const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 8px;
  font-weight: bold;
  color: #fff;
  background-color: #6c6c6c;
`;

const PartyUserList = ({ userList, isOpenUserList }: PartyUserListProps) => {
  const handleClickUserExpulsion = () => {};
  console.log(isOpenUserList);

  return (
    <Wrapper isOpenUserList={isOpenUserList}>
      <Title>내 정보</Title>
      <List>
        <UserInfo>
          <ImageBox>
            {/* <Image
                    src={userProfileImg || ""}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={"host-image"}
                  /> */}
          </ImageBox>

          {/* 본인일경우 표시 */}
          {/* {chatUserId && <Label>나</Label>} */}
        </UserInfo>
      </List>
      <hr />
      <Title>파티원 리스트 입니다.</Title>
      <List>
        {userList?.map(
          ({ nickname, userProfileImg, role, leader, chatUserId }) => (
            <ListItem key={nickname}>
              <UserInfo>
                <ImageBox>
                  {/* <Image
                    src={userProfileImg || ""}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={"host-image"}
                  /> */}
                </ImageBox>
                {role === "HOST" && <Label>방장</Label>}
                {/* 본인일경우 표시 */}
                {/* {chatUserId && <Label>나</Label>} */}
                <NickName>{nickname}</NickName>
              </UserInfo>
              {{
                /* 사용자가 방장일 경우 표시 */
              } &&
                {
                  /* 본인일경우 제외 */
                } && (
                  <Expulsion onClick={handleClickUserExpulsion}>
                    강퇴하기
                  </Expulsion>
                )}
            </ListItem>
          )
        )}
      </List>
    </Wrapper>
  );
};

PartyUserList.getLayout = (page: ReactElement) => {
  return <>{page}</>;
};

export default PartyUserList;
