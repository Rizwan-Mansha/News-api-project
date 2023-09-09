import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Fetching.css";

const Fetching = () => {
  const [news, setNews] = useState([]);

  const getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=bitcoin&apiKey=a7fd6d5c0d3148169483313253b58724"
      )
      .then((response) => {
        const data = response.data;
        setNews(data.articles);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getNews();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const removeNews = (title) => {
   const signleNews = news.filter((totalHeadlines) => title !== totalHeadlines.title);
   setNews(signleNews)
  };

  return (
    <div className="topHeadlines">
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "90%",
          margin: "auto",
        }}
      >
        <h1>Headlines: {news.length}</h1>
      </div>
      <main className="news">
        {news.map((newsHeadlines) => {
          return (
            <div className="headlines">
              <img src={newsHeadlines.urlToImage} alt={newsHeadlines.author} />
              <h4>{newsHeadlines.title}</h4>
              <p>{newsHeadlines.description.substring(0, 100)}</p>
              <a href={newsHeadlines.url} target="_blank">
                Read More
              </a>
              <footer style={{ justifyContent: "space-between" }}>
                <h5>{newsHeadlines.author}</h5>
                <h5>{newsHeadlines.publishedAt}</h5>
              </footer>
              <button
                className="buttonBtn"
                onClick={() => removeNews(newsHeadlines.title)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Fetching;
