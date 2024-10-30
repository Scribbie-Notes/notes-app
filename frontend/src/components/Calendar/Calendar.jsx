// components/Calendar.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../Navbar";
// import axios from './axiosInstance'; // Adjust the import based on your structure

const Calendar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "", color: "" });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axiosInstance.get("/events");
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    console.log(newEvent);
    const response = await axiosInstance.post("/events", newEvent);
    setEvents([...events, response.data]);
    setNewEvent({ date: "", title: "", color: "" }); // Reset form
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
    );
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  return (
    <div>
      <Navbar userInfo={user} />
      <div className="flex container mx-auto p-4">
        <div className="w-1/3 p-4 border-r">
          <h1 className="text-xl font-bold mb-4">Add New Event</h1>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border p-1 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="border p-1 mb-2 w-full"
          />
          <input
            type="color"
            value={newEvent.color}
            onChange={(e) =>
              setNewEvent({ ...newEvent, color: e.target.value })
            }
            className="mb-2"
          />

          <button
            onClick={handleAddEvent}
            className="bg-blue-500 text-white p-2 w-full"
          >
            Add Event
          </button>
        </div>

        <div className="w-2/3 p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className="bg-gray-300 p-2 rounded"
            >
              Prev
            </button>
            <h2 className="text-xl">
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={handleNextMonth}
              className="bg-gray-300 p-2 rounded"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Render Calendar Days */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="border p-2"></div> // Empty cells for days before the first
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => (
              <div key={i} className="border p-2 ">
                <h3>{i + 1}</h3>
                {events
                  .filter(
                    (event) =>
                      new Date(event.date).getDate() === i + 1 &&
                      new Date(event.date).getMonth() ===
                        currentMonth.getMonth()
                  )
                  .map((event) => (
                    <div
                      key={event._id}
                      className="p-1 text-center mb-1"
                      style={{ backgroundColor: event.color }}
                    >
                      <h4>{event.title}</h4>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
