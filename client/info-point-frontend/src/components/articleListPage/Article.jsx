import React, { useState } from "react";

const Article = ({ article = [] }) => {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div>
      <div>
        <div>
          <img src={article.img} alt="" />
        </div>
        <div>
          <div>
            <h2> {article.title}</h2>
          </div>
        </div>
        <div>
          <div>{article.description}</div>
        </div>
        <div>
          <div>
            <div>likes :{article.likes.length}</div>
          </div>
          <div>
            <div>dislikes : {article.dislikes.length}</div>
          </div>
          <div>
            <div>Block count : {article.blockList.length}</div>
          </div>
        </div>
        <div>
          Tags :
          {article.tags.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
        <div>
          <div>
            <button
              onClick={() => {
                setShowWarning(true);
              }}
            >
              Delete this Article
            </button>
          </div>
          {showWarning && (
            <div>
              <div>
                This cannot be undone, are you sure about deleting this Article?
              </div>
              <button>Yes</button>
              <button
                onClick={() => {
                  setShowWarning(false);
                }}
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
