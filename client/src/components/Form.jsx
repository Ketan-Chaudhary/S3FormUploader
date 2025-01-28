// import { useState } from "react";

// const Form = () => {
//   const [name, setName] = useState("");
//   const [rollNo, setRollNo] = useState("");
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("rollNo", rollNo);
//     formData.append("image", image);

//     try {
//       const response = await fetch("http://13.235.48.219:5000/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setMessage("Data and image uploaded successfully!");
//       } else {
//         setMessage("Error uploading data!");
//       }
//     } catch (error) {
//       setMessage("Error uploading data!");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Roll Number"
//           value={rollNo}
//           onChange={(e) => setRollNo(e.target.value)}
//         />
//         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         <button type="submit">Submit</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Form;

// src/components/Form.jsx
import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("rollNo", rollNo);
    formData.append("image", image);

    try {
      const response = await fetch("http://13.235.48.219:5000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Data and image uploaded successfully!");
      } else {
        setMessage("Error uploading data!");
      }
    } catch (error) {
      setMessage("Error uploading data!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Form;
