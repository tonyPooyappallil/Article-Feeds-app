import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context";
import { useIsMobile } from "../../utilities";
import { MyButton } from "../customStyledCompnents";
import LeftNav from "../dashboard/LeftNav";

export default function Navbar() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const localUSer = JSON.parse(localStorage.getItem("user"));
  if (!localUSer) {
    navigate("/");
  }
  const { user } = useContext(UserContext);
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <div>
        <div>
          <ProfileContainer>
            <NavLogo
              isMobile={isMobile}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <img src="/logoSmall.png" alt="" />
            </NavLogo>
            <div>
              <UserNameContainer isMobile={isMobile}>
                <span>Hey {user.firstName || localUSer.firstName} !</span>{" "}
              </UserNameContainer>
              <div>
                <MyButton onClick={() => logout()}>logout</MyButton>{" "}
              </div>
            </div>
          </ProfileContainer>
          <Container>
            <LeftNavContainer isMobile={isMobile}>
              <LeftNav></LeftNav>
            </LeftNavContainer>
            <ArticleWallDiv isMobile={isMobile}>
              <Outlet />
            </ArticleWallDiv>
          </Container>
        </div>
      </div>
    </div>
  );
}

const NavLogo = styled.div`
  img {
    height: 30px;
    padding: 3px;
    margin-left: ${(props) => (props.isMobile ? "10px" : "58px")};
    border-radius: 7px;
    background-color: white;
    margin-top: 10px;
    cursor: pointer;
    :hover {
      height: 33px;
      padding: 4px;
    }
  }
  position: sticky;
  top: 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: auto;
  color: white;
`;

const LeftNavContainer = styled.div`
  width: ${(props) => (props.isMobile ? "100%" : "15%")};
  min-width: 100px;
  background-color: #1e579c;
  position: ${(props) => (props.isMobile ? "fixed" : "sticky")};
  top: ${(props) => (props.isMobile ? "" : "80px")};
  bottom: ${(props) => (props.isMobile ? "0px" : "")};
  height: ${(props) => (props.isMobile ? "" : "200px")};
  color: white;
  //padding: 25px 50px 75px 100px;
  padding: ${(props) => (props.isMobile ? "0px 10px 0px 10px" : " ")};
`;

const ArticleWallDiv = styled.div`
  width: ${(props) => (props.isMobile ? "100%" : "85%")};
  img {
    width: 100%;
  }
`;

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  font-size: ${(props) => (props.isMobile ? "20px" : "26px")};
  padding: ${(props) => (props.isMobile ? "5px" : "15px")};
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  position: sticky;
  top: 0;
  background-color: #1e579c;
  color: white;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
  > :nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    padding: 5px;
  }
`;
//${(props) => (props.isMobile ? "" : "177px")};
