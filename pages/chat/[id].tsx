import { useEffect } from "react";

const mockupData = [
  {
    img: "",
    readCheck: true,
    message: "안녕하세요",
    id: "me",
  },
  {
    img: "",
    readCheck: true,
    message: "신청합니다.",
    id: "me",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Gz1Gq9Lp3gtG9pm5qT9W8D2PxWMCmb2FLBeoyPo&s",
    nickName: "Habeeb",
    readCheck: false,
    message: "반갑습니다.",
  },
];

const ChatRoomPage = () => {
  // 헤더
  // 채팅 방 제목 설정(미정)
  // 나가기
  // 뒤로가기
  // 멤버 리스트 창 열기 버튼 (리스트에서 멤버 강퇴)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "2rem",
        height: "100vh",
      }}
    >
      <ul
        style={{
          padding: 0,
          margin: "0 auto",
          listStyle: "none",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {mockupData
          .slice(0)
          .reverse()
          .map((item) => {
            const { img, nickName, readCheck, message, id } = item;

            return (
              <li
                key={nickName}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: id === "me" ? "row-reverse" : "row",
                  margin: "1rem 0",
                }}
              >
                {img && (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "5%",
                    }}
                  >
                    <img width="30" height="30" src={img} alt="profile" />
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    backgroundColor: id === "me" ? "#f43b4b" : "#efebec",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          marginTop: 0,
                          marginBottom: id === "me" ? 0 : "10px",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {nickName}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: id === "me" ? "#fff" : "#000",
                        }}
                      >
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: id === "me" ? "0px" : "30px",
                    marginRight: id === "me" ? "30px" : "0px",
                    alignSelf: "flex-end",
                    color: "rosybrown",
                  }}
                >
                  {readCheck ? 1 : ""}
                </div>
              </li>
            );
          })}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "50px",
        }}
      >
        <input
          style={{
            width: "90%",
            paddingLeft: "20px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
          placeholder="message"
          type="text"
        />
        <button
          style={{
            border: "none",
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
};

ChatRoomPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};

export default ChatRoomPage;
