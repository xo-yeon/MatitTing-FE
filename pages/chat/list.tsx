import { useEffect } from "react";

const mockupData = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Gz1Gq9Lp3gtG9pm5qT9W8D2PxWMCmb2FLBeoyPo&s",
    nickName: "gafar Usman",
    time: "12:34 AM",
    message: "안녕하세요",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Gz1Gq9Lp3gtG9pm5qT9W8D2PxWMCmb2FLBeoyPo&s",
    nickName: "HOD",
    time: "12:34 AM",
    message: "신청합니다.",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Gz1Gq9Lp3gtG9pm5qT9W8D2PxWMCmb2FLBeoyPo&s",
    nickName: "Habeeb",
    time: "12:34 AM",
    message: "반갑습니다.",
  },
];

const ChatListPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          position: "relative",
        }}
      >
        <input
          style={{
            width: "100%",
            height: "60px",
            paddingLeft: "3.5rem",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
          placeholder="Search for contanct"
          type="text"
        />
        <button
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
            transform: "translateY(-50%)",
            border: "none",
          }}
        >
          <img
            width="25"
            height="25"
            src="https://cdn-icons-png.flaticon.com/512/158/158740.png"
            alt="검색 버튼"
          />
        </button>
      </div>

      <ul
        style={{
          padding: 0,
          margin: "0 auto",
          listStyle: "none",
        }}
      >
        {mockupData.map((item) => {
          const { img, nickName, time, message } = item;

          return (
            <li
              key={nickName}
              style={{
                display: "flex",
                margin: "1rem 0",
                padding: "1rem 0",
              }}
            >
              {/* 프로필 */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "5%",
                }}
              >
                <img width="70" height="70" src={img} alt="profile" />
              </div>
              <div
                style={{
                  width: "calc(100% - 60px)",
                  display: "flex",
                  justifyContent: "space-between",
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
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {nickName}
                  </p>
                  <p
                    style={{
                      margin: 0,
                    }}
                  >
                    {message}
                  </p>
                </div>
                <div>{time}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ChatListPage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};

export default ChatListPage;
