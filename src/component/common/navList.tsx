import { useRouter } from "next/router";
import styled from "@emotion/styled";

import HomeSelected from "../../assets/icons/bottombar/home.svg";
import HomeOutlined from "../../assets/icons/bottombar/home_outlined.svg";
import CreateSelected from "../../assets/icons/bottombar/create.svg";
import CreateOutlined from "../../assets/icons/bottombar/create_outlined.svg";
import ProfileSelected from "../../assets/icons/bottombar/profile.svg";
import ProfileOutlined from "../../assets/icons/bottombar/profile_outlined.svg";
import SearchSelected from "../../assets/icons/bottombar/search.svg";
import SearchOutlined from "../../assets/icons/bottombar/search_outlined.svg";
interface NavListProps {
  title: string;
  href: string;
}
interface BottomIconProps {
  href: string;
  selected: boolean;
}

const Container = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 8px;
  transition: all 0.1s;
  cursor: pointer;
  &:hover {
    background-color: #dddddd;
  }
`;
const TitleText = styled.div`
  font-size: 12px;
`;

const icons: any = {
  "/": {
    selected: HomeSelected,
    outlined: HomeOutlined,
  },
  "/create": {
    selected: CreateSelected,
    outlined: CreateOutlined,
  },
  "/profile": {
    selected: ProfileSelected,
    outlined: ProfileOutlined,
  },
  "/search": {
    selected: SearchSelected,
    outlined: SearchOutlined,
  },
};

const BottomIcon = ({ href, selected }: BottomIconProps) => {
  const IconComponent = selected ? icons[href].selected : icons[href].outlined;

  return <IconComponent />;
};

const NavList = ({ title, href }: NavListProps) => {
  const router = useRouter();
  const selected = router.pathname === href;

  return (
    <Container
      onClick={() => {
        router.push(href);
      }}
    >
      <BottomIcon href={href} selected={selected} />
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default NavList;
