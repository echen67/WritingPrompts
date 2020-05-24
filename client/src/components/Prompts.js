import React, { Fragment, useState, useEffect } from "react";

const Prompts = () => {
  // useState stuff
  const [prompts, setPrompts] = useState([]);
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("General");
  const [search, setSearch] = useState("");

  // Submit new prompt
  const OnSubmitPrompt = async e => {
    e.preventDefault();
    try {
      const body = { description, genre };
      const response = await fetch('http://localhost:5000/prompts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/";
    } catch(err) {
      console.error(err.message);
    }
  };

  // Get all prompts
  const getPrompts = async () => {
    try {
      const response = await fetch("http://localhost:5000/prompts");
      const jsonData = await response.json();
      setPrompts(jsonData);
    } catch(err) {
      console.error(err.message);
    }
  };

  // Get prompts of specific genre
  const getGenrePrompts = async (g) => {
    try {
      const response = await fetch(`http://localhost:5000/prompts/genre/${g}`);
      const jsonData = await response.json();
      setPrompts(jsonData);
    } catch(err) {
        console.error(err.message);
    }
  };

  // Search prompts?
  const searchPrompts = async (s) => {
    try {
      // what if search is empty string?
      console.log("searched for: ", s);
      const response = await fetch(`http://localhost:5000/prompts/search/${s}`);
      const jsonData = await response.json();
      setPrompts(jsonData);
    } catch(err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
      getPrompts()
  }, []);

  return (
    <Fragment>
      {/*Topbar*/}
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex justify-content-between fixed-top">
        <a className="navbar-brand" href="#">Prompts</a>

        {/*Search Bar*/}
        <form className="form-inline d-flex align-items-center">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn btn-success" type="submit">Search</button>
        </form>

        {/*Submit Prompt Button*/}
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
          Submit Prompt
        </button>

        {/*Modal*/}
        <div className="modal mt-5" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Submit Prompt</h4>
              </div>

              <div className="modal-body">
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                  <label className="btn btn-secondary active" onClick={e => setGenre("General")}>
                    <input type="radio" name="options" id="option1" autoComplete="off" checked readOnly/> General
                  </label>
                  <label className="btn btn-secondary" onClick={e => setGenre("Comedy")}>
                    <input type="radio" name="options" id="option2" autoComplete="off" /> Comedy
                  </label>
                  <label className="btn btn-secondary" onClick={e => setGenre("Horror")}>
                    <input type="radio" name="options" id="option3" autoComplete="off" /> Horror
                  </label>
                  <label className="btn btn-secondary" onClick={e => setGenre("Romance")}>
                    <input type="radio" name="options" id="option3" autoComplete="off" /> Romance
                  </label>
                  <label className="btn btn-secondary" onClick={e => setGenre("Sci-Fi")}>
                    <input type="radio" name="options" id="option3" autoComplete="off" /> Sci-Fi
                  </label>
                </div>

                <textarea className="form-control mt-2" rows="5" id="comment"
                  value={description}
                  onChange={e => setDescription(e.target.value)}>
                </textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={OnSubmitPrompt}>
                  Submit
                </button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/*Sidebar*/}
      <div className="vertical-nav bg-light">
        <div className="sidebar-header">
          <h5 className="text-center mt-3">Filters</h5>
        </div>
        <hr className="solid" />

        <div className="d-flex justify-content-center">
          <div>
            <h6 className="text-center">Genres</h6>

            <div className="d-flex flex-column">
            <button className="btn btn-primary" onClick={() => getPrompts()}>ALL</button>
            <button className="btn btn-warning" onClick={() => getGenrePrompts("Comedy")}>COMEDY</button>
            <button className="btn btn-success" onClick={() => getGenrePrompts("General")}>GENERAL</button>
            <button className="btn btn-dark" onClick={() => getGenrePrompts("Horror")}>HORROR</button>
            <button className="btn btn-danger" onClick={() => getGenrePrompts("Romance")}>ROMANCE</button>
            <button className="btn btn-info" onClick={() => getGenrePrompts("Sci-Fi")}>SCI-FI</button>
            </div>

            {/*
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Comedy" />
              <label className="custom-control-label" htmlFor="Comedy">Comedy</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="General" />
              <label className="custom-control-label" htmlFor="General">General</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Horror" />
              <label className="custom-control-label" htmlFor="Horror">Horror</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Romance" />
              <label className="custom-control-label" htmlFor="Romance">Romance</label>
            </div>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="Sci-Fi" />
              <label className="custom-control-label" htmlFor="Sci-Fi">Sci-Fi</label>
            </div>
            */}

          </div>
        </div>
      </div>

      {/*List of prompts*/}
      <div className="mainbody">
        <table className="table-responsive table-dark table-striped container">
          <thead>
            <tr>
              <th className="col-sm-4 text-center p-2">Prompt</th>
              <th className="col-sm-4 text-center p-2">Genre</th>
            </tr>
          </thead>
          <tbody className="">
            {prompts.map(prompt => (
              <tr key={prompt.prompt_id} className="">
                <td className="p-3">{prompt.description}</td>
                <td className="text-center">{prompt.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Prompts;
