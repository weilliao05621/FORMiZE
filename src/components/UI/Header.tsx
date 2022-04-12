import { FC } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Logo from "./Logo";
import firebase from "../../utils/firebase";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid #c8c8c8;
`;

const Button = styled.button`
  padding: 0.4rem 1rem;
  width: 10rem;
  height: 3.2rem;
  font-size: 1.6rem;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const Header: FC = () => {
  const router = useRouter();
  const logoutHandler = (): void => {
    firebase.nativeSignOut();
    window.alert("登出成功，將回首頁");
    router.push("/");
  };
  return (
    <HeaderWrapper>
      <Logo />
      <Button type="button" onClick={logoutHandler}>
        登出
      </Button>
    </HeaderWrapper>
  );
};

export default Header;