import React, { useState, useReducer,useEffect ,useRef} from "react";
import User from "./User";
import axios from "axios";

function Main2() {
  //const [text, setText] = useState("");
//  const [users, setUsers] = useState([]);



  const pageSize = 10;
  const searchInputRef = useRef(null);
  const prevSearchRef = useRef('')



  const initialState = {text:'',users:[],pageNo:1}

  useEffect(() => {
    const inputRef = searchInputRef.current;

    // Set focus and update placeholder
    inputRef.focus();
    inputRef.placeholder = "Type here";
  
    // Cleanup function to remove focus on component unmount
    return () => {
      inputRef.blur();
    };

  },[] )
  


  const reducer = (state, action) => {
    switch (action.type) {
      case "next":
        return {...state,pageNo:state.pageNo+1}

      case "prev":
        return {...state,pageNo:state.pageNo-1}

        case "text":
        return {...state,text:action.payload}

        case "GETUSERS":
        return {...state,users:action.payload}



      default:
        return state;
    }
  };
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    //setText(e.target.value);

    dispatch({type:'text',payload:e.target.value})
  };


  const getUsers = async () => {
    let encodedSearchTerm = encodeURIComponent(state.text);



    let URL = `https://api.github.com/search/users?q=${encodedSearchTerm}`;
    //const URL = `https://api.github.com/users`;

    // const response = await fetch(URL, {
    //   headers: {
    //     Authorization: "token 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",
    //   },
    // });
    // const data = await response.json();

   
    try {
        const response = await axios.get(URL,{
            headers: {
              Authorization: "token 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",
            },
          })
          dispatch({type:'GETUSERS',payload:response.data.items})
        
    } catch (error) {

        console.log('error')
        
    }
    



    
    //setUsers(data.items)
    //return data.items;
  };

  

  const handleNext = () => {

    dispatch({type:'next'})

  };

  const handlePrev = () => {
    dispatch({type:'prev'})
  };

  const handleSearch = () => {

    if (state.text === "") {
        alert("enter text");
        return;
      }

      console.log(state.text)
      prevSearchRef.current = state.text;

      getUsers();
      //showUsers();

  };    

  //    setDisplayUsers(users.slice((state.pageNo - 1) * pageSize, state.pageNo*pageSize));

  let displaydata = state.users.slice((state.pageNo - 1) * pageSize,state.pageNo*10)

  return (
    <div className=" ">
        <h1>useReducer hook</h1>
      {/* inputcomponent */}
      <div className="  w-[50%] mx-auto mt-20">
        <p>you previously searched for {prevSearchRef.current}</p>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
          value={state.text}
          ref={searchInputRef}
          onChange={(e) => handleChange(e)}
        />
        <button className="btn btn-primary ml-5" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-primary ml-5" onClick={()=>{
            dispatch({ type: 'text', payload: '' });
            dispatch({ type: 'GETUSERS', payload: [] });
            dispatch({ type: 'prev' }); // Reset page number to 1
        }}>Clear</button>
      </div>

      {/* search results */}
      <div className="w-screen grid grid-cols-4 gap-2 m-5">
        {displaydata &&
          displaydata.map((each, key) => {
            return <User user={each} key={key} />;
          })}
      </div>

      {state.users.length > 0 && (
        <div className="join grid grid-cols-2 w-[40%] mx-auto mb-10">
          <button
            className="join-item btn btn-outline"
            value="prev"
            onClick={handlePrev}
          >
            Previous page
          </button>
          <button
            className="join-item btn btn-outline"
            value="next"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Main2;
