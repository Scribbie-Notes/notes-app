// components/Calendar.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../Navbar";
import Modal from "../Modal"; // Import the Modal component
import toast from 'react-hot-toast';// Make sure you have react-toastify installed

const Calendar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "", color: "gray" });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axiosInstance.get("/get/events");
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {

    if (!newEvent.date || !newEvent.title) {
        toast.error("Please add date and title of event");
        return;
    }

    const response = await axiosInstance.post("/add/event", newEvent);
    setEvents([...events, response.data]);
    setNewEvent({ date: "", title: "", color: "gray" }); // Reset form
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(`/delete/event/${eventId}`); // Update this based on your API
      setEvents(events.filter(event => event._id !== eventId));
      toast.success("Event deleted successfully");
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      toast.error("Error deleting event");
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

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
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="border p-1 mb-2 w-full"
          />
          <input
            type="color"
            value={newEvent.color}
            onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
            className="mb-2"
          />
          <button onClick={handleAddEvent} className="bg-blue-500 text-white p-2 w-full">
            Add Event
          </button>
        </div>

        <div className="w-2/3 p-4">
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="bg-gray-300 p-2 rounded">
              Prev
            </button>
            <h2 className="text-xl">
              {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
            </h2>
            <button onClick={handleNextMonth} className="bg-gray-300 p-2 rounded">
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
                      new Date(event.date).getMonth() === currentMonth.getMonth()
                  )
                  .map((event) => (
                    <div
                      key={event._id}
                      className="p-1 text-center mb-1 cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={() => handleEventClick(event)} // Open modal on click
                    >
                      <h4 className="break-words">{event.title}</h4>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for event details */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};

export default Calendar;
