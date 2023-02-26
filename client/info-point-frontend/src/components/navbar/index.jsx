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
          <Container>
            <LeftNavContainer isMobile={isMobile}>
              <LeftNav></LeftNav>
            </LeftNavContainer>
            <ArticleWallDiv>
              <ProfileContainer>
                <UserNameContainer isMobile={isMobile}>
                  <span>Hey {user.firstName || localUSer.firstName} !</span>{" "}
                </UserNameContainer>
                <div>
                  <MyButton onClick={() => logout()}>logout</MyButton>{" "}
                </div>
              </ProfileContainer>

              <Outlet />
            </ArticleWallDiv>
          </Container>
        </div>
      </div>
    </div>
  );
}

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  margin: "auto",
  color: "white",
});

const LeftNavContainer = styled.div`
  width: ${(props) => (props.isMobile ? "10%" : "15%")};
  min-width: 100px;
  background-color: #1e579c;
  position: sticky;
  top: 0;
  height: 200px;
  color: white;
`;

const ArticleWallDiv = styled.div({
  width: "85%",
  img: {
    width: "100%",
  },
});

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 5px;
  position: sticky;
  top: 0;
  background-color: #1e579c;
  color: white;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
`;

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 26px;
  padding: ${(props) => (props.isMobile ? "5px" : "15px")};
`;

//${(props) => (props.isMobile ? "" : "177px")};
