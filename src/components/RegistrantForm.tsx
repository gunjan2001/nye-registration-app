import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRegistrant } from "../store/registrantSlice";
import type { AppDispatch } from "../store/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegistrantForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const defaultFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    attending: "Yes",
    adults: 0,
    kids: 0,
    kidAges: [] as number[],
    message: "",
  };
  const [form, setForm] = useState(defaultFormFields);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!image) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(image);
  }, [image]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "Please enter First name";
    if (!form.lastName.trim()) newErrors.lastName = "Please enter Last name";

    if (!form.lastName.trim()) newErrors.email = "Please enter E-mail address";
    else if (!form.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter a valid email";

    if (!form.phone.match(/^[6-9]\d{9}$/))
      newErrors.phone = "Enter a valid 10-digit phone number";

    return newErrors;
  };

  const handleBlur = (field: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    const {
      firstName,
      lastName,
      email,
      phone,
      attending,
      adults,
      kids,
      kidAges,
      message,
    } = form;

    dispatch(
      addRegistrant({
        id: crypto.randomUUID(),
        image: preview || undefined,
        firstName,
        lastName,
        email,
        phone,
        attending,
        adults,
        kids,
        kidAges,
        message,
        createdAt: new Date().toISOString(),
      })
    );

    toast.success("Registration successful!");
    setForm(defaultFormFields);
    setImage(null);
    setPreview(null);
    navigate("/list");
  };

  const handleChange = (field: string, value: string | number[]) => {
    if (field === "kids") {
      const kidsCount = Number(value);
      setForm((prev) => ({
        ...prev,
        kids: kidsCount,
        kidAges: Array(kidsCount).fill(0),
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl p-8 rounded-2xl space-y-6 border border-gray-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Event Registration
        </h3>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              className="w-28 h-28 rounded-full shadow-md object-cover mb-3 transition-all duration-300"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-3">
              No Image
            </div>
          )}

          <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        {/* Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              placeholder="Enter first name"
              className="input-field"
              value={form.firstName}
              onBlur={() => handleBlur("firstName")}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <div className="h-5 mt-1">
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              placeholder="Enter last name"
              className="input-field"
              value={form.lastName}
              onBlur={() => handleBlur("lastName")}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            <div className="h-5 mt-1">
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              placeholder="Enter email"
              className="input-field"
              value={form.email}
              onBlur={() => handleBlur("email")}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <div className="h-5 mt-1">
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number
            </label>
            <input
              placeholder="Enter phone number"
              className="input-field"
              value={form.phone}
              onBlur={() => handleBlur("phone")}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <div className="sm:w-55 h-5 mt-1">
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Attending */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Will you be attending the event?
          </label>

          <div className="flex gap-6 flex-wrap">
            {["Yes", "Maybe", "No"].map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition ${
                  form.attending === opt
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  checked={form.attending === opt}
                  onChange={() => handleChange("attending", opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* Adults / Kids */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Adults
            </label>
            <select
              className="input-field"
              value={form.adults}
              onChange={(e) => handleChange("adults", e.target.value)}
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Kids</label>
            <select
              className="input-field"
              value={form.kids}
              onChange={(e) => handleChange("kids", e.target.value)}
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Kid Ages */}
        {form.kidAges.map((_, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-medium mb-1">
              Age of Kid {index + 1}
            </label>
            <select
              className="input-field"
              value={form.kidAges[index]}
              onChange={(e) => {
                const updatedAges = [...form.kidAges];
                updatedAges[index] = Number(e.target.value);
                handleChange("kidAges", updatedAges);
              }}
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message to host (optional)
          </label>
          <textarea
            placeholder="Write something..."
            className="input-field h-28 resize-none"
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-md transition font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrantForm;
