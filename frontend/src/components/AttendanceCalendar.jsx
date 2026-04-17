import { useState } from "react";

const AttendanceCalendar = ({
  attendanceData = {},
  onDateClick,
  currentMonth,
  onMonthChange,
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const calendarDays = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="p-2 border bg-gray-50"></div>,
      );
    }

    // Actual days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const status = attendanceData[dateStr];

      let bgColor = "bg-white";
      if (status === "present") bgColor = "bg-green-100";
      if (status === "absent") bgColor = "bg-red-100";
      if (status === "late") bgColor = "bg-yellow-100";

      calendarDays.push(
        <div
          key={day}
          onClick={() => onDateClick && onDateClick(day)}
          className={`p-2 border text-center cursor-pointer hover:bg-gray-50 ${bgColor}`}
        >
          <span className="text-sm">{day}</span>
          {status && (
            <div className="text-xs mt-1">
              {status === "present" && "✓"}
              {status === "absent" && "✗"}
              {status === "late" && "⏰"}
            </div>
          )}
        </div>,
      );
    }

    return calendarDays;
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + offset);
    onMonthChange(newDate);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/40 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <button
          onClick={() => changeMonth(-1)}
          className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
        >
          Previous
        </button>
        <h3 className="text-lg font-semibold text-slate-900">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-sm p-2 text-slate-500"
          >
            {day}
          </div>
        ))}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
