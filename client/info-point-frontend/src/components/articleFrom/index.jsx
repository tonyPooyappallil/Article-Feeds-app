import axios from "axios";
import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preferences from "../signup/Preferences";

const ArticleForm = ({ dataPoster = () => {}, existingArticle = [] }) => {
  const localUSer = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (!localUSer) {
    navigate("/");
  }
  const [category, setCategory] = useState([]);
  const [article, setArticle] = useState({ ...existingArticle });
  console.log("article", article);

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

  return (
    <div>
      <h1>
        {" "}
        {!!Object.keys(existingArticle).length ? (
          <>Edit Article Details</>
        ) : (
          <> Post New Article</>
        )}
      </h1>
      <div>
        <div>Title</div>
        <div>
          <textarea
            type="text"
            value={article.title}
            onChange={(e) => {
              articleOnChange({ title: e.target.value.trim() });
            }}
          />
        </div>
      </div>
      <div>
        <div>Description</div>
        <div>
          <textarea
            type="text"
            value={article.description}
            onChange={(e) => {
              articleOnChange({ description: e.target.value.trim() });
            }}
          />
        </div>
      </div>
      <div>
        <div>Img Link</div>
        <div>
          <input
            type="text"
            value={article.img}
            onChange={(e) => {
              articleOnChange({ img: e.target.value.trim() });
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
            value={article.tags}
            onChange={(e) => {
              articleOnChange({ tags: e.target.value.trim() });
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

export default ArticleForm;
