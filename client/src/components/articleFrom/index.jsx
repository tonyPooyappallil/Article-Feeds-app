import axios from "axios";
import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preferences from "../signup/Preferences";
import styled from "styled-components";

const ArticleForm = ({ dataPoster = () => {}, existingArticle = [] }) => {
  const localUSer = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [img, setImg] = useState();

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
      tags: article.tags?.split(",").map((item) => item.trim()),
      author: localUSer.id,
    };
    Object.keys(mappedArticle).forEach((key) =>
      formData.append(key, mappedArticle[key])
    );

    await dataPoster(formData);
    navigate("/dashboard");
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
          <div style={{ marginTop: "10px" }}>
            Select the category which this Article belongs to
          </div>{" "}
          <Preferences
            category={category}
            catSelected={catSelected}
            selectedCategory={Object.keys(article.category || [])}
          ></Preferences>
        </div>

        <InputMainContainer>
          <div>Upload image</div>
          <div>
            <FileInput type="file" name="photo" onChange={handleChange} />
          </div>
        </InputMainContainer>

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

        <SubmitInput type="submit" />
      </form>
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

const SubmitInput = styled.input`
  font-weight: 800;
  font-size: 16px;
  background-color: #4d8fff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :hover {
    padding: 11px;
    font-size: 15px;
  }
`;

const FileInput = styled.input`
  font-weight: 800;
  font-size: 16px;
  background-color: #4d8fff;
  color: white;
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  :hover {
    padding: 11px;
    font-size: 15px;
  }
  input {
    background-color: black;
  }
`;
