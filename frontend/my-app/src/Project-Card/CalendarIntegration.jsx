import React from "react";

const CalendarIntegration = ({ projectTitle, deadline }) => {
  const handleAddToCalendar = () => {
    if (!deadline) {
      alert("Please set a deadline first.");
      return;
    }

    alert(`Project "${projectTitle}" added to the calendar with deadline: ${deadline}`);
  };

  return (
    <div className="calendar-integration">
      <button onClick={handleAddToCalendar}>Add to Calendar</button>
    </div>
  );
};

export default CalendarIntegration;
