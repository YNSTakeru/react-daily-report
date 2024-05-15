import React, { useEffect, useState } from "react";
import "./index.css";

export default function Form({ logo }) {
  const [tomorrowTask, setTomorrowTask] = useState("");
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [yesterdayTasks, setYesterdayTasks] = useState(
    localStorage.getItem("yesterday")
      ? JSON.parse(localStorage.getItem("yesterday"))
      : []
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost/api/articles");
      const data = await response.json();
      console.log(data);
    };

    fetchData();
  }, []);

  const handleTomorrowTaskChange = (event) => {
    setTomorrowTask(event.target.value);
  };

  const handleTomorrowTaskForm = (event) => {
    event.preventDefault();

    setTomorrowTasks((prev) => [...prev, tomorrowTask]);
    setTomorrowTask("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("yesterday", JSON.stringify(tomorrowTasks));
    setYesterdayTasks(tomorrowTasks);
  };

  return (
    <div className="App">
      <header className="">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>にっぽーくん</h1>
      </header>
      <main>
        {yesterdayTasks.length !== 0 && (
          <div>
            次の目標
            <ul>
              {yesterdayTasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleTomorrowTaskForm}>
          <div className="">明日やること</div>
          <ul>
            {tomorrowTasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <input
            type="text"
            value={tomorrowTask}
            onChange={handleTomorrowTaskChange}
          />
        </form>

        <form onSubmit={handleSubmit}>
          <input type="submit" value="送信" />
        </form>
      </main>
    </div>
  );
}
