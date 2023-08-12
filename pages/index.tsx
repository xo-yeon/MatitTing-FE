import type { NextPage } from "next";
import PartyList from "../components/common/partyList";

export default function Home() {
  return (
    <div>
      {partyList.map((e, i) => {
        return <PartyList title={e.title} id={e.id} key={i} />;
      })}
    </div>
  );
}

const partyList = [
  {
    title: "1",
    id: "1",
  },
  {
    title: "2",
    id: "2",
  },
  {
    title: "3",
    id: "3",
  },
];
