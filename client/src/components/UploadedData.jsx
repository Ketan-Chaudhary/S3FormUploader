import { useEffect, useState } from "react";

const UploadedData = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://13.235.48.219:5000/data");
      const result = await response.json();

      if (result.message === "No data available.") {
        setMessage(result.message);
      } else {
        setData(result);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {message ? (
        <p>{message}</p> // Display message if no data is available
      ) : (
        <div>
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="uploaded-item">
                <h3>
                  {item.name} (Roll No: {item.rollno})
                </h3>
                <img
                  src={item.image_url}
                  alt={`Preview of ${item.name}`}
                  width="100"
                  height="100"
                />
              </div>
            ))
          ) : (
            <p>No data available yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadedData;
