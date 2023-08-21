/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

function App() {
  const [animals, setanimals] = useState([]);

  useEffect(() => {
    const lq = localStorage.getItem("lastQuery");
    search(lq);
  }, []);

  const search = async (q) => {
    const ans = await fetch(
      "http://localhost:8080?" + new URLSearchParams({ q })
    );
    const data = await ans.json();
    setanimals(data);
    localStorage.setItem("lastQuery", q);
  };
  return (
    <div>
      <h1>Animal Farm</h1>
      <input
        type="text"
        placeholder="animal-name"
        onChange={(e) => search(e.target.value)}
      />
      <ul>
        {animals.map((animal) => (
          <Animal_Render key={animal.id} {...animal} />
        ))}
        {animals.lenght === 0 && "No Animals Found"}
      </ul>
    </div>
  );
}

const Animal_Render = ({ type, age, name }) => {
  return (
    <li>
      <strong>Animal Type:</strong>
      {type} <strong>Animal Age:</strong>
      {age} <strong>Animal Name:</strong>
      {name}
    </li>
  );
};
export default App;
