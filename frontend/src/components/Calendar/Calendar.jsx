// components/Calendar.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../Navbar";
import Modal from "../Modal"; // Import the Modal component
import toast from "react-hot-toast"; // Ensure you have react-toastify installed
import { gapi } from "gapi-script"; // Import the Google API client

const Calendar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [events, setEvents] = useState([]); // Local events from your server
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    color: "gray",
    description: "",
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null); // State to hold the selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [googleCalendarEvents, setGoogleCalendarEvents] = useState([]); // State for Google Calendar events

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT; // Corrected to use Google OAuth Client ID
  const apiToken = import.meta.env.VITE_GOOGLE_API_TOKEN; // Google API token for Calendar API

  // Fetch events from your server
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axiosInstance.get("/get/events");
      setEvents(response.data); // Fetch events from your backend server
    };
    fetchEvents();
  }, []);

  // Initialize the Google API client
  useEffect(() => {
    const initializeGapi = () => {
      gapi.load("client:auth2", async () => {
        await gapi.auth2.init({
          client_id: clientId,
          scope: "https://www.googleapis.com/auth/calendar", // Request full access to Calendar
        });
      });
    };
    initializeGapi();
  }, [clientId]);

  // Google authentication and event syncing
  const handleGoogleAuth = async () => {
    const authInstance = gapi.auth2.getAuthInstance();

    // If the user is not signed in or doesn't have the correct scope, sign them out and prompt for reauthorization
    if (!authInstance.isSignedIn.get()) {
      await authInstance.signIn({
        scope: "https://www.googleapis.com/auth/calendar", // Full access to Google Calendar
      });
    } else {
      // If already signed in, check if the token has the correct scope
      const currentUser = authInstance.currentUser.get();
      const grantedScopes = currentUser.getGrantedScopes();

      // If the token doesn't have the required scope, sign out and reauthorize
      if (!grantedScopes.includes("https://www.googleapis.com/auth/calendar")) {
        await authInstance.signOut();
        await authInstance.signIn({
          scope: "https://www.googleapis.com/auth/calendar", // Full access
        });
      }
    }

    // After successful sign-in with the required scope, fetch Google Calendar events
    fetchGoogleCalendarEvents();
  };

  // Fetch Google Calendar events
  const fetchGoogleCalendarEvents = async () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance.isSignedIn.get()) {
      const accessToken = authInstance.currentUser
        .get()
        .getAuthResponse().access_token;
      gapi.client.setApiKey(apiToken); // Use the correct API token for requests
      await gapi.client.load(
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
      );

      const response = await gapi.client.calendar.events.list({
        calendarId: "primary", // Use primary calendar
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      });

      setGoogleCalendarEvents(response.result.items); // Store Google Calendar events
    }
  };

  // Add new event
  const handleAddEvent = async () => {
    if (!newEvent.date || !newEvent.title) {
      toast.error("Please add date and title of event");
      return;
    }

    const response = await axiosInstance.post("/add/event", newEvent);
    setEvents([...events, response.data]);
    setNewEvent({ date: "", title: "", color: "gray", description: "" }); // Reset form
  };

  // Handle event click (open modal)
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Handle event deletion
  const handleDeleteEvent = async (eventId) => {
    try {
      await axiosInstance.delete(`/delete/event/${eventId}`); // Update this based on your API
      setEvents(events.filter((event) => event._id !== eventId));
      toast.success("Event deleted successfully");
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      toast.error("Error deleting event");
    }
  };

  // Navigate to the previous month
  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
    );
  };

  // Navigate to the next month
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
            min={new Date().toISOString().split("T")[0]} // Set minimum date to today
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
            type="text"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
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
          <br />
          <button
            onClick={handleAddEvent}
            className="bg-blue-600 text-white p-2"
          >
            Add Event
          </button>
          <br />
          <button
            onClick={handleGoogleAuth}
            className="bg-green-800 text-white p-2 mt-4"
          >
            Sync with Google Calendar
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
                {/* Render your regular events */}
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
                      className="p-1 text-center mb-1 cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={() => handleEventClick(event)} // Open modal on click
                    >
                      <h4 className="break-words">{event.title}</h4>
                    </div>
                  ))}
                {/* Render Google Calendar events */}
                {googleCalendarEvents
                  .filter(
                    (event) =>
                      new Date(
                        event.start.dateTime || event.start.date
                      ).getDate() ===
                        i + 1 &&
                      new Date(
                        event.start.dateTime || event.start.date
                      ).getMonth() === currentMonth.getMonth()
                  )
                  .map((event, idx) => (
                    <div
                      key={idx}
                      className="p-1 text-center mb-1 cursor-pointer"
                      style={{ backgroundColor: "#FF4081" }}
                      onClick={() => alert(`Google Event: ${event.summary}`)}
                    >
                      <h4 className="break-words">{event.summary}</h4>
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
