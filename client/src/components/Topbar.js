// import React, { Fragment, useState } from "react";
//
// // Topbar contains logo, search bar(?), and submit prompt button
// const Topbar = () => {
//   // useState stuff
//   const [description, setDescription] = useState("");
//   const [genre, setGenre] = useState("General");
//
//   const OnSubmitPrompt = async e => {
//     e.preventDefault();
//     try {
//       const body = { description, genre };
//       const response = await fetch('http://localhost:5000/prompts', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body)
//       });
//       window.location = "/";
//     } catch(err) {
//       console.error(err.message);
//     }
//   };
//
//   return (
//     <Fragment>
//       <nav className="navbar navbar-expand-sm bg-dark navbar-dark d-flex justify-content-between fixed-top">
//         <a className="navbar-brand" href="#">Prompts</a>
//
//         {/*Search Bar*/}
//         <form className="form-inline d-flex align-items-center">
//           <input className="form-control mr-sm-2" type="text" placeholder="Search" />
//           <button className="btn btn-success" type="submit">Search</button>
//         </form>
//
//         {/*Submit Prompt Button*/}
//         <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
//           Submit Prompt
//         </button>
//
//         {/*Modal*/}
//         <div className="modal mt-5" id="myModal">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">Submit Prompt</h4>
//               </div>
//
//               <div className="modal-body">
//                 <div className="btn-group btn-group-toggle" data-toggle="buttons">
//                   <label className="btn btn-secondary active" onClick={e => setGenre("General")}>
//                     <input type="radio" name="options" id="option1" autoComplete="off" checked readOnly/> General
//                   </label>
//                   <label className="btn btn-secondary" onClick={e => setGenre("Comedy")}>
//                     <input type="radio" name="options" id="option2" autoComplete="off" /> Comedy
//                   </label>
//                   <label className="btn btn-secondary" onClick={e => setGenre("Horror")}>
//                     <input type="radio" name="options" id="option3" autoComplete="off" /> Horror
//                   </label>
//                   <label className="btn btn-secondary" onClick={e => setGenre("Romance")}>
//                     <input type="radio" name="options" id="option3" autoComplete="off" /> Romance
//                   </label>
//                   <label className="btn btn-secondary" onClick={e => setGenre("Sci-Fi")}>
//                     <input type="radio" name="options" id="option3" autoComplete="off" /> Sci-Fi
//                   </label>
//                 </div>
//
//                 <textarea className="form-control mt-2" rows="5" id="comment"
//                   value={description}
//                   onChange={e => setDescription(e.target.value)}>
//                 </textarea>
//               </div>
//
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-success" data-dismiss="modal" onClick={OnSubmitPrompt}>
//                   Submit
//                 </button>
//                 <button type="button" className="btn btn-danger" data-dismiss="modal">
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </Fragment>
//   );
// };
//
// export default Topbar;
