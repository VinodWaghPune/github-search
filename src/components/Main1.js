import React from "react";
import { useState, useEffect } from "react";
import User from "./User";

function Main1() {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const pageSize = 10;

 

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const getUsers = async () => {
    let encodedSearchTerm = encodeURIComponent(text);

    let URL = `https://api.github.com/search/users?q=${encodedSearchTerm}`;
    //const URL = `https://api.github.com/users`;

    const response = await fetch(URL, {
      headers: {
        Authorization: "token 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",
      },
    });
    const data = await response.json();
    console.log("data" + data);
    setUsers(data.items)
    
  };

  

  const handleClick = async () => {
    if (text === "") {
      alert("enter text");
      return;
    }
    getUsers();
    
  };

  const handleClear = () => {};

  const pageNavigation = (e) => {
    const startindex = (pageNo - 1) * pageSize;
    const endIndex = pageNo * 10;
    console.log("pageno before" + pageNo);
    if (e.target.value === "next") {
      endIndex < users.length ? setPageNo(pageNo + 1) : setPageNo(pageNo);
    } else {
      startindex > 0 ? setPageNo(pageNo - 1) : setPageNo(pageNo);
    }
    //handleClick();
  };

  const displaydata = users.slice((pageNo - 1) * pageSize,pageNo*10)

  return (
    <div className=" ">
        <h1>useState hook</h1>
      {/* inputcomponent */}
      <div className="  w-[50%] mx-auto mt-20">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
          value={text}
          onChange={(e) => handleChange(e)}
        />
        <button className="btn btn-primary ml-5" onClick={handleClick}>
          Search
        </button>
        <button className="btn btn-primary ml-5">Clear</button>
      </div>

      {/* search results */}
      <div className="w-screen grid grid-cols-4 gap-2 m-5">
        {/* {arr &&
          arr.map((each, key) => {
            return <User user={each} key={key} />;
          })} */}
          {displaydata &&
          displaydata.map((each, key) => {
            return <User user={each} key={key} />;
          })}
      </div>

      {users.length > 0 && (
        <div className="join grid grid-cols-2 w-[40%] mx-auto mb-10">
          <button
            className="join-item btn btn-outline"
            value="prev"
            onClick={pageNavigation}
          >
            Previous page
          </button>
          <button
            className="join-item btn btn-outline"
            value="next"
            onClick={pageNavigation}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Main1;
