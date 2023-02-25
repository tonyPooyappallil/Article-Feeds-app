import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { articleCreate } from "../../utilities";
import Preferences from "../signup/Preferences";

const CreateArticle = () => {
  const localUSer = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (!localUSer) {
    navigate("/");
  }

  const [category, setCategory] = useState([]);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      axios
        .get("https://busy-plum-bee-cuff.cyclic.app/category")
        .then(function (data) {
          setCategory(data.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    dataFetch();
  }, []);

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
    console.log("article", article);

    const mappedArticle = {
      ...article,
      category: Object.keys(article.category),
      tags: article.tags.split(",").map((item) => item.trim()),
      author: localUSer.id,
    };
    console.log("mappedArticle", mappedArticle);
    await articleCreate(mappedArticle);
    navigate("/dashboard");
  };

  return (
    <div>
      <h1> Post New Article</h1>
      <div>
        <div>Title</div>
        <div>
          <textarea
            type="text"
            onChange={(e) => {
              articleOnChange({ title: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <div>Description</div>
        <div>
          <textarea
            type="text"
            onChange={(e) => {
              articleOnChange({ description: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <div>Img Link</div>
        <div>
          <input
            type="text"
            onChange={(e) => {
              articleOnChange({ img: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <Preferences
          category={category}
          catSelected={catSelected}
          selectedCategory={Object.keys(article.category || [])}
        ></Preferences>
      </div>
      <div>
        <div>Tags</div>
        <div>
          <textarea
            type="text"
            onChange={(e) => {
              articleOnChange({ tags: e.target.value });
            }}
          />
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            submitArticle();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateArticle;
