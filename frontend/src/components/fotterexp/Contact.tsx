"use client";

import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/contact",
        form
      );

      alert(data.message || "Message sent successfully 🚀");

      setForm({ name: "", email: "", message: "" });
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-white via-slate-50 to-white px-5 py-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Contact Us 📩
          </h1>

          <p className="mt-4 text-slate-600">
            Have questions, feedback, or business inquiries? Fill out the form
            and our team will get back to you shortly.
          </p>

          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <p><strong>Email:</strong> surajkumar854000@gmail.com</p>
            <p><strong>Phone:</strong> +91 7250903724</p>
            <p><strong>Location:</strong> India</p>
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 p-5 text-sm text-blue-700">
            💡 We usually respond within 24 hours.
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Send a Message
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={5}
              required
              className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default Contact;