import axios from "axios";
import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preferences from "../signup/Preferences";
import styled from "styled-components";
import { MyInput, SubmitButton } from "../customStyledCompnents";
import { useIsMobile } from "../../utilities";

const ArticleForm = ({ dataPoster = () => {}, existingArticle = [] }) => {
  const localUSer = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [img, setImg] = useState();
  const [dim, setDim] = useState("");

  if (!localUSer) {
    navigate("/");
  }
  const [category, setCategory] = useState([]);
  const [article, setArticle] = useState({ ...existingArticle });

  useEffect(() => {
    const dataFetch = async () => {
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/category")
        .then(function (data) {
          setCategory(data.data.data);

          const stateUpdater = {};
          (existingArticle.category || []).forEach((id) => {
            stateUpdater[id] = 1;
          });
          setArticle((curr) => {
            return {
              ...curr,
              category: { ...stateUpdater },
              tags: isArray(curr.tags)
                ? (curr.tags || []).join(",")
                : curr.tags,
            };
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    dataFetch();
    setArticle(existingArticle);
  }, [existingArticle]);

  const catSelected = (id) => {
    if (article?.category && article.category[id]) {
      let data = { ...article.category };
      delete data[id];
      setArticle((curr) => {
        return { ...curr, category: { ...data } };
      });
      return;
    }

    setArticle((curr) => {
      return { ...curr, category: { ...(article.category || {}), [id]: 1 } };
    });
  };

  const articleOnChange = (value) => {
    setArticle((data) => {
      return { ...data, ...value };
    });
  };

  const submitArticle = async () => {
    const mappedArticle = {
      ...article,
      category: Object.keys(article.category),
      tags: article.tags.split(",").map((item) => item.trim()),
      author: localUSer.id,
    };
    await dataPoster(mappedArticle);
    navigate("/dashboard");
  };
  const handleChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("customFile", img);

    const mappedArticle = {
      ...article,
      category: Object.keys(article.category),
      tags: article.tags.split(",").map((item) => item.trim()),
      author: localUSer.id,
    };
    Object.keys(mappedArticle).forEach((key) =>
      formData.append(key, mappedArticle[key])
    );

    const data = await dataPoster(formData);
    setDim(data);

    // axios
    //   .post("http://localhost:3000/article", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then(function (data) {
    //     let actualData = data.data;
    //     return actualData;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert(
    //       "Uh oh, the data you provided is incorrect. If you dont have an account yet, please Sign up"
    //     );
    //   });
    // return data
  };

  return (
    <div encType="multipart/form-data">
      <h1>
        {!!Object.keys(existingArticle).length ? (
          <>Edit Article Details</>
        ) : (
          <> Post New Article</>
        )}
      </h1>

      {/* <InputMainContainer>
        <div>Img Link</div>
        <div>
          <MyInput
            isMobile={isMobile}
            placeholder="Link to the image you want to post."
            type="text"
            value={article.img}
            onChange={(e) => {
              articleOnChange({ img: e.target.value.trim() });
            }}
          />
          <MyInput
            type="file"
            onChange={(e) => {
              articleOnChange({ img: e.target.files[0] });
            }}
          />
        </div>
      </InputMainContainer> */}
      {/* 
      <InputMainContainer>
        <SubmitButton
          onClick={() => {
            submitArticle();
          }}
        >
          Submit
        </SubmitButton>
      </InputMainContainer> */}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <InputMainContainer>
          <div>Title</div>
          <div>
            <textarea
              type="text"
              value={article.title}
              onChange={(e) => {
                articleOnChange({ title: e.target.value });
              }}
            />
          </div>
        </InputMainContainer>

        <InputMainContainer>
          <div>Description</div>
          <div>
            <textarea
              style={{ height: "100px" }}
              type="text"
              value={article.description}
              onChange={(e) => {
                articleOnChange({ description: e.target.value });
              }}
            />
          </div>
        </InputMainContainer>
        <div>
          <Preferences
            category={category}
            catSelected={catSelected}
            selectedCategory={Object.keys(article.category || [])}
          ></Preferences>
        </div>

        <InputMainContainer>
          <div>Tags</div>
          <div>
            <textarea
              type="text"
              value={article.tags}
              placeholder="Enter tags seperated by comma ex:( mytag,yourtag,theirtag )"
              onChange={(e) => {
                articleOnChange({ tags: e.target.value.trim() });
              }}
            />
          </div>
        </InputMainContainer>
        <input type="file" name="photo" onChange={handleChange} />
        <input type="submit" />
      </form>
      <img src={dim} alt="ssssss" />
    </div>
  );
};

export default ArticleForm;

const InputMainContainer = styled.div`
  padding: 2px;
  padding-left: 6%;
  padding-right: 6%;
  div {
    padding: 2px;
  }
  textarea {
    width: 100%;
    font-size: 14px;
    :focus {
      outline-style: outset;
      outline-color: grey;
    }
  }
`;
