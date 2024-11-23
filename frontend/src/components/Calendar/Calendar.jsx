// components/Calendar.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Navbar from "../Navbar";
import Modal from "../Modal"; // Import the Modal component
import toast from "react-hot-toast"; // Ensure you have react-toastify installed
import { gapi } from "gapi-script"; // Import the Google API client
import Backdrop from "@mui/material/Backdrop"; // Import MUI Backdrop
import Button from "@mui/material/Button"; // Import MUI Button
import { CircularProgress } from "@mui/material"; // Import CircularProgress for loading indicator
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

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
  const [loading, setLoading] = useState(false); // Loading state for backdrop

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT; // Corrected to use Google OAuth Client ID
  const apiToken = import.meta.env.VITE_GOOGLE_API_TOKEN; // Google API token for Calendar API



  const [minDate, setMinDate] = useState("");

  // Fetch events from your server
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axiosInstance.get("/get/events");
      setEvents(response.data); // Fetch events from your backend server
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
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
    setLoading(true);

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
    await fetchGoogleCalendarEvents();
    setLoading(false);
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
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Link to="/dashboard">
          <div className="p-5 pl-28">
            <button className="inline-flex items-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700">
              <IoMdArrowRoundBack className="mr-2 ml-[-5px]" />Back
            </button>
          </div>
        </Link>
      <div className="flex container mx-auto p-4 pl-20 pr-20">
        <div className="w-1/3 p-4 border-r">
          <h1 className="text-xl font-bold mb-4">Add New Event</h1>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border p-1 mb-2 w-full"
            min={minDate}
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
          {/* <input
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
          <br /> */}

          <button
          className="bg-slate-800 hover:bg-slate-700 text-white  py-1.5 px-3 rounded-lg mt-2"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
          <br />

          {/* <Button
            onClick={handleGoogleAuth}
            variant="contained"
            color="secondary"
            className="mt-4"

          >
            Sync with Google Calendar
          </Button> */}
        </div>

        <div className="w-2/3 p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevMonth}
              className="bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-lg "
            >
              Prev
            </button>
            <h2 className="text-xl">
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={handleNextMonth}
              className="bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-lg"
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
                      className="p-1 my-1 rounded text-white cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={() => handleEventClick(event)}
                    >
                      {event.title}
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
                  .map((event, index) => (
                    <div
                      key={index}
                      className="p-1 my-1 rounded text-white cursor-pointer bg-blue-500"
                      onClick={() => handleEventClick(event)}
                    >
                      {event.summary}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal to display event details */}
      {selectedEvent && (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
          onDelete={() => handleDeleteEvent(selectedEvent._id)}
        />
      )}
    </div>
  );
};

export default Calendar;
