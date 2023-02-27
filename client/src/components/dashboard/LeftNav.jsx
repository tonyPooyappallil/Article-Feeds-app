import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useIsMobile } from "../../utilities";

const NavLogo = styled.div`
  img {
    height: ${(props) => (props.isMobile ? "18px" : "30px")};
    padding: 3px;
    border-radius: 7px;
    background-color: white;
    margin-top: 10px;
    cursor: pointer;
    z-index: 10000;
    :hover {
      height: 33px;
      padding: 4px;
    }
  }
`;

const NavBarSectionContainer = styled.div`
  padding: 5px;
  text-align: ${(props) => (props.isMobile ? "center" : "left")};
  margin-left: ${(props) => (props.isMobile ? "0px" : "28px")};
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  :hover {
    font-size: 20px;
  }
`;

const LeftNav = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div>
      <NavLogo
        isMobile={isMobile}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        {/* <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAf0AAABjCAMAAACmCSk9AAAAkFBMVEX///8Abrj5sjMAZrUAbLcAabYAZLQAYrMAZ7Uyf8DB1ekAX7Kjwd7Y5PHp8fesxuGgvd2DqdJ3pNBqmcv+9+zs8fj82qr5ryX5rBUWdbvj6/T/+fP7yHz5riD84bxun871+fzP3u5Fh8PF1+qzy+Rak8iLsNYqe76VttlPjMVAhcIAV68AW7F9p9IUc7r+8N76Xn6NAAAM9UlEQVR4nO2d65aquBaF4SQkaFS8nH16a/dpsMTr3mW//9u1aJWSzBWIlAKjZP6qMSomi3y5rty8/6G8ujSMNrO3rZ/puD2s48k4Xf6oLfX69Tfm9T/NWvQH6OeftSScrpVkAef8TN8//REEIRO/FrWk3oj++gl5/XezFv0HVAv9jWCBT0l+Z/p/mHn9/1ekn4qQk+w7+vWqCfozaWPf0a9XDdB/Y1b2Hf16VT/9dVgAv6P/MHGzgZUjCFM7/bEsgt/Rf5i4qRbQH6lC+B39h6mNdX9GT/Q6+g9XC+mXVf2O/sPUQvo7ash39vKFQcA7+g9UC+lvcaYfqm28Gw/Gu3irRKA6+g+SC/2fqCfSJxp+Obkt7CT99/03Xub5C/O6Yfr/RT3PIK8Pjh7Zf2JyLdOfmNdPrGku9OvVzhzxB3HDFn1ftY8+zPfksGGLvq/aR/9gWMR5wwZ9Y7WP/tykv2/YoG+s9tH3DYu6bv95qot+Mlz1T1qWx25aFG7uSWexSse7yWSy2Q1Sh8Scolxmlq+qOBlGy09rxmmlCKrJ2eJa6KfxXEnBTpJSvO2KR3FAf+eYyiiNt6f4WRiEmbLEwsNm9SXLl5uevFgupOxtlu6/TPqTA5NChB8SWQTv6dNdFZrF20nx5yP9BMJE256uLVTHFIJMP/81jLOdmbl+PFQ9agL//hGFaRCfa/FG9Hck457Skrn8lodCrovdBfavS3Zchprl8jgojOuWH3tJ7EzjAVOHQVL0w+G8Z8oMMoIgx2suoMWcqjz9OZ3XPsfUx8xYBWYTyEJhBAlml38s1gpX7LjsYasUh5dfYui8BJn9i5my7gL0AxHsCnJ8YJoefhTcjST4Mb/c9ZRsGLNaw5mcFjSvQ2UuuftmkBEEUZ/pkhaHKaSSSkte+2bU3Bubyy4B0jcddBf6SUywPyeixmYUccm67kWMoJ/MLKlcUwsFJHfVAEw/008DC0FVNgrdEQz0BNQ0sf14aG5sIejD3pcL/YGgd0RxuTajSIs2zumqTj9l9h1a8t2IojL9SJb/koutbQxE0h+92XeVhj0ru5OWvkPOhqGtBalMf7gVBRYbUdRAP1kX7Ms94TcGD1XpF6dyFVeWEQNFv7hABXMLupN2ytEaSwtSlX5xusFBj+Lp9ONhUIJT6eW/Gv1kXrgBVEvPbG1s9OO4pECZmXnTunhHYv5D6Dgq0ZfeQZSkphe2Z9Pnc/vA5zNI+HX6P6iRi02CrG9A3y8rticrplRMnrd3z1U/2D6MPvdLLVba1O/Z9E2PHaVQi6YK/cQlmZsEBQ3pO0iR8+i9czuUKYC5XFX6DrnAtd7q6fRdpJIv0u85/eYmSQz9K9H3gclJ0ztjCmEsXpW+g7RNEq2gz/IwKtCP705VoZ+xGn2G5Sgt240KIuahT6PP8+OMVtDn+a7vfvorKrt5IKSSSkly3MGPpuUV6XNmxpOQQ8WAZbZkB9GpWHCH4tPo+yrnY2oFfc2imWJnEXs62U15LxGV28zfnG93SIbRnpoEMXBS2+jzgImTLKfIceq5JgIGcto/f+IijalJJIeB//Pos9yMN/1ty2tm6iv0Mz+7zFYdwAV/SSvnhFym/bNgFB9G/ZvSW23ZYZpc5b3aiwNhlTbWsNLnTG3fB6vlchW9H8lKzY1J/5JoiOQsl1gSE9Rgy+IX6GfFNctsRrsaP33v55yx5TXL5/VZlenzUM0n6XLxY7GMYtLtF0JEd6w6om+Lm5vApjgNDs1ZP0Gfy+0gtxi37FFfZ6T1hlluerOJgQE3p32V6QcyiKMsr4fphi6v2Ok55XU1+jxkk3y3tiEqB7Vvx5X+GJNUsAI7wzJnVn6kH76Z8eyIDNf3HQzx6wSsrkUYjTSmjhXpB2qdj6hPDXqI1dun0efw8Sk1T4XEnOkf4QMZsZhJhDI6bPT1zTAaAr9ebXHMSpVsPKEYGLO+avTVzMijEdH6E0egnkWfHxKIhxjVK8whR/qQTT45B++jY8xobC1rfIb2hO35L8RuiDpxlBDg9Hyq5unFpPC7fYF7U55Fn6pAC6LhSyCUI/0NtOnU4i9uEtUnGp4rfeKEkciN2FYwwDAr9UVTKERCX33/wgqvriPYy3Cdv076BInq9PG0HxEXZbw29fFc6RMTuvyWs3f4r9mhX4QtlpFRD6OPtUM0TB9LvsR9bm70f0BdpCsbkVeGaY708YBZPh4oi8YS1lVmJOZxhYfRR3sZLnHXSh+H15XpY1NLN/xEE2jkpyN97LJzA4jEtSwSFUDviB5GH7vZpukTBzSr0sdD/rYDXzjW1AdajvSJrkZc/7eErA4tW8nQxyo0h8/D6HtQIJumj71eZfplTAusN8qJK32crd1SJJhatlJjFujl5HH0sXFsmD62RpXpg2uNch2cRXSAWm1zpQ9ni3PGEy2RZRshdiCB5nx8HH0YYjdNHz+9Mn3szam9EpmwtukjBFf66NC6tSFEb55YzIFyoufU4+ibp2G/E308uGEZZhENjn46yJU+tu7y6j7BXgEWgD8F+3D4W/7fj6O/bxt973GjvsL5lyYscvrakiv9PnSkN+cZ5LT92PncjEVvtB5HH0rkN6KP3aftkEVZT+tKf4n0ryM7HIUQC2oX4Uk1zfPc0S+3qAn66GG41X1E2tFHPY4++tWfTZ9wVlxHfdjyW+mjV7Cjf6dFp6GzGcra7//Afl9bmXce9UGBu83qYBGABxZriH5f293V0S+3iAilD51zIsb8mn/FlT7hNUo+/4djfmmxhjBc2wfQ0S+3qLQBzYmY72vZ4EqfWMa7/m9SUDIM4Xxf67I6+uUWUQuuggiVCftr3QvrSh+8J7nyVuZNvokYhWjeh45+uUVkbbNs/iTIaF5YV/o4zrx9IvoCiK0UZxEtUVr4/44+ERP6XW3rKrgepPfJjvQLl/GIsYXlrinCY6i1Ek3Tx+WJNtIn1sos+W2GM49QONInuv3cPjmYguA5jYuItcni7+rok1E5DvtKq6Ujfdy2mW9C1o77zIj1Cb2YdPTNMCR9HPbR1/YTAwS9i3Cjj2u42u4d3LVE5LVHDRD0QV/j9HHfbyvpR5iPFLUE6iw3puJO9Ik99NpobQE7acyTXhfBxMGcHDRMnwjTSvrU1njiKsT3kvm1I33ivRC9EOHVd8QWWmqXveESrpc+7JIgsLWSPuFfIzZ4EGcrzcbNgX5C3BJhhMKmiLME4sGzrOZNpPXSJ/YqgtHtpE+cnAvNREd4ng0Gh0jfPOfZ58Tha3OUQaQ0T4yIiEJk7gGqlz5xSAGKfjvpE32oz96SfIglcZgRzkwDff6mdcXpgToRCzu2qfPkvhbRaIvw4RBzvfRxGuvLfGOUROO20icqvx/IzTX0ck1c34C9Aw7XuRT76WYcRdFu2lP03WM4wSBuKOAqvvJfTChrYF5YL33q4D3r9S9GLaK1YmFb6XsxcSUAD9Q83ozHm3VI3riIF/fQtzdkz/8xFtKXThC3AJBHlM+n6meZNfFRUvcX4MU99dKnjsJmN1fww74nL7fNtJY+eXXLhVxo4YYXt1S7t4fatkcc8z1bkxlDX/9C3NlWL32qwTonervBub30qba/UNQVeVXo4zURJyX33ByZieMAu276uBXdVHvpe9F9+DlPMI4K9Klr/7zz7ep3RUOVoZrpl9efFtP3NvfcX8UFFdP99OF68U8t78KvqHu6a6Zv6a5yajN98jYgi3hALgTcTV/aL+gnbxC0WKPIHQB100cXtaFW0z81/o71LdzSb+LcSZ+roleiSi8m/1RA3KNyjqBm+t6gBH+76XvDo8vdyNYL8an5fkF54tKyaedDScGzDrlYxMHyPFPt9Mtaz5bT97xJycMs2RTWtz5Ohb6+g2+97V4eSp8siwoeJPlQaBk2ek3QP7WeRdnXevrZ009FT+FwFtif5SH9/IMjea+q8Isr/kXJhr4j+FOhfE+sP26AvjdaK5tXy+feWAld+MrF4LcZhDxSa4YSv5C+hDAOzxguJszymEr2AJztsy+mk2t8/bUS+Qj5KZ6DC/tMyfhUesj85KH0ix4I84a/jK+XcAHQyAwiflExrU1qv+3ZMIxP6ZjV7vycHfcW5t2tfXCXYhByUAOh+pgTLmEoraZHJTIXH/80PgiYlG/jksJjW+FN0tnx4w3J7F3HfVk8uoab3tkafrWGB6FQ27IHHRP8/ApBMi0hVOEHrDaH4FRe2OWDswt/j/tJWt/7oV/XqL+LD8dAqpME367fI4fH24vW95PFqp9GqcsDsqhkOZju51xcrJnvp+NVUiGaGpU9l5tGUdTvr4ZNP8dck1z383f6jurov7I6+q+sjv4rq6P/yurov7I6+q+sjv4rq6P/yurov7I6+q+sjv4rq6P/yurov7I6+q+sjv4rq6P/yhowrgsvMOj0bTXw57p820Gtl9S//kUe7hAbkjYAAAAASUVORK5CYII="
          alt=""
        /> */}
        <img src="/logoSmall.png" alt="" />
      </NavLogo>
      <NavBarSectionContainer
        isMobile={isMobile}
        onClick={() => {
          navigate("create-new-article");
        }}
      >
        Post New Article
      </NavBarSectionContainer>
      <NavBarSectionContainer
        isMobile={isMobile}
        onClick={() => {
          navigate("article-list-page");
        }}
      >
        My Articles
      </NavBarSectionContainer>
      <NavBarSectionContainer
        isMobile={isMobile}
        onClick={() => {
          navigate("settings");
        }}
      >
        Settings
      </NavBarSectionContainer>
    </div>
  );
};

export default LeftNav;

//${(props) => (props.isMobile ? "" : "177px")};
