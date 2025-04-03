import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    mobileNumber: "",
    emailId: "",
    dateOfBirth: "",
    dateOfAnniversary: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});
  const [showDatePicker, setShowDatePicker] = useState({
    dateOfBirth: false,
    dateOfAnniversary: false,
  });
  const [dateErrors, setDateErrors] = useState({
    dateOfBirth: "",
    dateOfAnniversary: "",
  });

  useEffect(() => {
    fetchUserData();

    // Add beforeunload event listener to check validation when leaving the page
    const handleBeforeUnload = (e) => {
      const validationResult = validateForm();
      if (!validationResult) {
        // Show browser's default confirmation dialog
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Close date pickers when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest(".date-picker-container")) {
        setShowDatePicker({
          dateOfBirth: false,
          dateOfAnniversary: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Mark field as touched
    setIsTouched({ ...isTouched, [name]: true });

    // Validate field as user types
    validateField(name, value);
  };

  // Parse and validate date input
  const parseDateInput = (value, fieldName) => {
    // Accept formats like MM/DD/YYYY, MM-DD-YYYY, or text month formats
    if (!value) return "";

    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        setDateErrors((prev) => ({
          ...prev,
          [fieldName]: "Invalid date format",
        }));
        return formData[fieldName]; // Return existing value if invalid
      }

      setDateErrors((prev) => ({ ...prev, [fieldName]: "" }));
      return date.toISOString().split("T")[0]; // Return YYYY-MM-DD format
    } catch (e) {
      setDateErrors((prev) => ({
        ...prev,
        [fieldName]: "Invalid date format",
      }));
      return formData[fieldName]; // Return existing value if invalid
    }
  };

  // Handle direct text input on date fields
  const handleDateInputChange = (e) => {
    const { name, value } = e.target;
    const dateValue = parseDateInput(value, name);

    if (dateValue || value === "") {
      setFormData({ ...formData, [name]: value === "" ? "" : dateValue });
    }
  };

  const handleBlur = (fieldName) => {
    setIsTouched({ ...isTouched, [fieldName]: true });
    validateField(fieldName, formData[fieldName]);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        error = !value.trim() ? "First Name is required" : "";
        break;
      case "lastName":
        error = !value.trim() ? "Last Name is required" : "";
        break;
      case "mobileNumber":
        error = !value.trim() ? "Mobile Number is required" : "";
        break;
      case "emailId":
        error = !value.trim()
          ? "Email Id is required"
          : /\S+@\S+\.\S+/.test(value)
          ? ""
          : "Invalid email format";
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return !error;
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "mobileNumber", "emailId"];
    const newErrors = {};
    let isValid = true;

    // Mark all required fields as touched
    const newTouched = { ...isTouched };

    requiredFields.forEach((field) => {
      newTouched[field] = true;
      const fieldValue = formData[field];
      const fieldIsValid = validateField(field, fieldValue);
      if (!fieldIsValid) {
        newErrors[field] = `${
          field === "emailId"
            ? "Email Id"
            : field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        isValid = false;
      }
    });

    setIsTouched(newTouched);
    setErrors((prev) => ({ ...prev, ...newErrors }));

    // Also check if we have any date errors
    if (dateErrors.dateOfBirth || dateErrors.dateOfAnniversary) {
      isValid = false;
    }

    return isValid;
  };

  const handleSaveChanges = async (e) => {
    if (e) e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector(".border-red-500");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorField.focus();
      }
      return;
    }

    setIsLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      const method = userId ? "PUT" : "POST";
      const url = userId ? `http://localhost:4000/profile/${userId}` : "http://localhost:4000/profile";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save profile");

      const data = await response.json();
      if (!userId) localStorage.setItem("userId", data._id);
      setMessage("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Error saving profile. Please try again.");
    }

    setIsLoading(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDiscardChanges = () => {
    fetchUserData();
    setErrors({});
    setIsTouched({});
    setDateErrors({
      dateOfBirth: "",
      dateOfAnniversary: "",
    });
    setMessage("Changes discarded");
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setIsLoading(false);
  };

  // Handle navigation away from the page
  const handleNavigation = (path) => {
    if (!validateForm()) {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (confirmLeave) {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  // Toggle date picker visibility
  const toggleDatePicker = (field, e) => {
    e.stopPropagation();
    setShowDatePicker((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle date selection
  const handleDateSelect = (field, dateStr) => {
    setFormData((prev) => ({
      ...prev,
      [field]: dateStr,
    }));
    setDateErrors((prev) => ({ ...prev, [field]: "" }));
    setShowDatePicker((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // Generate calendar for date picker
  const generateCalendar = (field) => {
    const today = new Date();
    const currentMonth = new Date(
      formData[field] ? new Date(formData[field]) : today
    );

    // Set to first day of month
    currentMonth.setDate(1);

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get day of week for first day of month (0 = Sunday)
    const firstDayOfMonth = currentMonth.getDay();

    // Create calendar grid
    const calendar = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Navigate to previous month
    const prevMonth = () => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(newDate.getMonth() - 1);
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      setFormData((prev) => ({
        ...prev,
        [field]: "",
      }));
      setShowDatePicker((prev) => ({ ...prev }));
    };

    // Navigate to next month
    const nextMonth = () => {
      const newDate = new Date(currentMonth);
      newDate.setMonth(newDate.getMonth() + 1);
      currentMonth.setMonth(currentMonth.getMonth() + 1);
      setFormData((prev) => ({
        ...prev,
        [field]: "",
      }));
      setShowDatePicker((prev) => ({ ...prev }));
    };

    // Calendar header with month navigation
    calendar.push(
      <div key="header" className="flex justify-between items-center mb-2">
        <button
          type="button"
          onClick={prevMonth}
          className="px-2 py-1 text-gray-400 hover:text-teal-400"
        >
          &lt;
        </button>
        <div className="font-medium">{`${monthNames[month]} ${year}`}</div>
        <button
          type="button"
          onClick={nextMonth}
          className="px-2 py-1 text-gray-400 hover:text-teal-400"
        >
          &gt;
        </button>
      </div>
    );

    // Day names
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    calendar.push(
      <div key="days" className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs text-gray-400">
            {day}
          </div>
        ))}
      </div>
    );

    // Calendar days
    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 text-center text-gray-600"></div>
      );
    }

    // Actual days of the month
    const selectedDate = formData[field] ? new Date(formData[field]) : null;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD

      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      days.push(
        <div
          key={`day-${day}`}
          className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-sm
            ${
              isSelected
                ? "bg-teal-500 text-white"
                : "text-white hover:bg-gray-700"
            }`}
          onClick={() => handleDateSelect(field, dateStr)}
        >
          {day}
        </div>
      );
    }

    calendar.push(
      <div key="calendar-grid" className="grid grid-cols-7 gap-1">
        {days}
      </div>
    );

    return calendar;
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen bg-black mt-13">
      {/* Fixed position breadcrumb navigation at top left */}
      <div className="fixed top-0 left-0 w-full bg-black z-10 p-4 mt-22">
        <div className="max-w-6xl mx-auto text-sm text-gray-400 flex items-center">
          <Link to="/my-account" className="hover:text-teal-400">
            My Account
          </Link>
          <span className="mx-2">&gt;</span>
          <Link to="/my-account/profile" className="hover:text-teal-400">
            My Profile
          </Link>
          {/* <span className="mx-2">&gt;</span>
          <span className="text-teal-400 font-medium">Manage Profile</span> */}
        </div>
      </div>

      {/* Main content centered with proper spacing from top */}
      <div className="w-full max-w-4xl mx-auto pt-16 px-4">
        <div className="bg-black rounded-lg p-6 md:p-8 mt-6">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            My Profile Page
          </h1>

          {message && (
            <div className="bg-teal-900 border border-teal-700 text-teal-300 px-4 py-3 rounded mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleSaveChanges} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Title
                </label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={isLoading}
                >
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("firstName")}
                  className={`w-full bg-white border ${
                    isTouched.firstName && errors.firstName
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Enter First Name"
                  disabled={isLoading}
                  aria-required="true"
                  aria-invalid={!!errors.firstName}
                />
                {isTouched.firstName && errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-700 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter Middle Name"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={() => handleBlur("lastName")}
                  className={`w-full bg-white border ${
                    isTouched.lastName && errors.lastName
                      ? "border-red-500"
                      : "border-gray-700"
                  } rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Enter Last Name"
                  disabled={isLoading}
                  aria-required="true"
                  aria-invalid={!!errors.lastName}
                />
                {isTouched.lastName && errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Gender
              </label>
              <div className="flex flex-wrap gap-6">
                <div
                  className={`flex items-center cursor-pointer ${
                    formData.gender === "Female"
                      ? "text-teal-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleGenderChange("Female")}
                >
                  <div
                    className={`w-5 h-5 rounded-full border ${
                      formData.gender === "Female"
                        ? "border-teal-400"
                        : "border-gray-600"
                    } flex items-center justify-center mr-2`}
                  >
                    {formData.gender === "Female" && (
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    )}
                  </div>
                  <span>Female</span>
                </div>

                <div
                  className={`flex items-center cursor-pointer ${
                    formData.gender === "Male"
                      ? "text-teal-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleGenderChange("Male")}
                >
                  <div
                    className={`w-5 h-5 rounded-full border ${
                      formData.gender === "Male"
                        ? "border-teal-400"
                        : "border-gray-600"
                    } flex items-center justify-center mr-2`}
                  >
                    {formData.gender === "Male" && (
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    )}
                  </div>
                  <span>Male</span>
                </div>

                <div
                  className={`flex items-center cursor-pointer ${
                    formData.gender === "Transgender"
                      ? "text-teal-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleGenderChange("Transgender")}
                >
                  <div
                    className={`w-5 h-5 rounded-full border ${
                      formData.gender === "Transgender"
                        ? "border-teal-400"
                        : "border-gray-600"
                    } flex items-center justify-center mr-2`}
                  >
                    {formData.gender === "Transgender" && (
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    )}
                  </div>
                  <span>Transgender</span>
                </div>

                <div
                  className={`flex items-center cursor-pointer ${
                    formData.gender === "Rather not say"
                      ? "text-teal-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleGenderChange("Rather not say")}
                >
                  <div
                    className={`w-5 h-5 rounded-full border ${
                      formData.gender === "Rather not say"
                        ? "border-teal-400"
                        : "border-gray-600"
                    } flex items-center justify-center mr-2`}
                  >
                    {formData.gender === "Rather not say" && (
                      <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    )}
                  </div>
                  <span>I'd rather not say</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-0 top-0 inline-flex items-center px-3 py-2 bg-white-800 border border-r-0 border-gray-700 rounded-l-md text-black">
                    +91
                  </span>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("mobileNumber")}
                    className={`w-full bg-white border ${
                      isTouched.mobileNumber && errors.mobileNumber
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-md pl-14 pr-10 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Mobile Number"
                    disabled={isLoading}
                    aria-required="true"
                    aria-invalid={!!errors.mobileNumber}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-teal-400"
                    disabled={isLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
                {isTouched.mobileNumber && errors.mobileNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email Id <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("emailId")}
                    className={`w-full bg-white border ${
                      isTouched.emailId && errors.emailId
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-md px-3 pr-10 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Email Address"
                    disabled={isLoading}
                    aria-required="true"
                    aria-invalid={!!errors.emailId}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-teal-400"
                    disabled={isLoading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
                {isTouched.emailId && errors.emailId && (
                  <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="relative date-picker-container">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={
                      formData.dateOfBirth
                        ? formatDate(formData.dateOfBirth)
                        : ""
                    }
                    onChange={handleDateInputChange}
                    className={`w-full bg-white border ${
                      dateErrors.dateOfBirth
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-md px-3 pr-10 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="MM/DD/YYYY"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400"
                    onClick={(e) => toggleDatePicker("dateOfBirth", e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                {dateErrors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {dateErrors.dateOfBirth}
                  </p>
                )}

                {showDatePicker.dateOfBirth && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md p-3 shadow-lg">
                    {generateCalendar("dateOfBirth")}
                  </div>
                )}
              </div>

              <div className="relative date-picker-container">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Date of Anniversary
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="dateOfAnniversary"
                    value={
                      formData.dateOfAnniversary
                        ? formatDate(formData.dateOfAnniversary)
                        : ""
                    }
                    onChange={handleDateInputChange}
                    className={`w-full bg-white border ${
                      dateErrors.dateOfAnniversary
                        ? "border-red-500"
                        : "border-gray-700"
                    } rounded-md px-3 pr-10 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="MM/DD/YYYY"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400"
                    onClick={(e) => toggleDatePicker("dateOfAnniversary", e)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>

                {dateErrors.dateOfAnniversary && (
                  <p className="text-red-500 text-xs mt-1">
                    {dateErrors.dateOfAnniversary}
                  </p>
                )}

                {showDatePicker.dateOfAnniversary && (
                  <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md p-3 shadow-lg">
                    {generateCalendar("dateOfAnniversary")}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 font-medium transition-colors duration-200"
                onClick={handleDiscardChanges}
                disabled={isLoading}
              >
                DISCARD CHANGES
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 font-medium transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
