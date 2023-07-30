import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>id : {id}</div>;
};

export default Home;
