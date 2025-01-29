import { useEffect, useState } from "react";

const UploadedData = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://35.154.22.60:5000/upload/data");
        const result = await response.json();

        if (result.message === "No data available.") {
          setMessage(result.message);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Uploaded Data</h2>
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
                <a
                  href={item.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Image
                </a>
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
