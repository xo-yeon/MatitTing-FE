import { useEffect } from "react";

const CreatePage = () => {
  // 식당 위치 정하기 (미정)
  // 파티 제목 (미정)
  // 이미지 첨부
  // 모집 기간 (선택)
  // 식사 시간 (필수)
  // 파티 상태

  return (
    <form style={{ padding: "2rem" }}>
      <h3>식당 위치(필수)</h3>
      <div
        style={{
          textAlign: "center",
          padding: "5%",
          backgroundColor: "#aaa",
        }}
      >
        파티 생성시 식당 위치를 적용
      </div>
      <h3>대표이미지(선택)</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "30px 0",
          position: "relative",
        }}
      >
        <label
          style={{
            width: "300px",
            height: "150px",
            backgroundColor: "#aaa",
          }}
          htmlFor="input-file"
        >
          <img src="" alt="" />
        </label>
        <input id="input-file" style={{ display: "none" }} type="file" />
      </div>
      <h3>파티 제목(필수)</h3>
      <div
        style={{
          position: "relative",
        }}
      >
        <input
          style={{
            width: "100%",
            height: "60px",
            paddingLeft: "30px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
          placeholder="파티 이름(미정)"
          type="text"
        />
      </div>
      <h3>모집 기간(선택)</h3>
      <div style={{}}>
        <input type="date" />
      </div>
      <h3>식사 시간(필수)</h3>
      <div style={{}}>
        <input type="time" />
      </div>
      <h3>파티 상태</h3>
      <div style={{ display: "flex", gap: "30px" }}>
        <button type="button">모집중</button>
        <button type="button">모집완료</button>
      </div>

      <button type="submit" style={{ margin: "30px 0" }}>
        생성
      </button>
    </form>
  );
};

CreatePage.getLayout = (page: React.ReactElement) => {
  return <>{page}</>;
};

export default CreatePage;
