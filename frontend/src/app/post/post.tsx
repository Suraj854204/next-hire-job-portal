"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PostJobPage() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    salary: "",
    job_type: "",
    description: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("http://13.51.173.65:5003/api/job/create", {
       method: "POST",
       headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

      const data = await res.json();
      alert("Job Posted Successfully ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Post a Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Job Title"
          onChange={(e) => setForm({...form, title: e.target.value})}
          className="w-full border p-2 rounded"/>

        <input placeholder="Location"
          onChange={(e) => setForm({...form, location: e.target.value})}
          className="w-full border p-2 rounded"/>

        <input placeholder="Salary"
          onChange={(e) => setForm({...form, salary: e.target.value})}
          className="w-full border p-2 rounded"/>

        <select
          onChange={(e) => setForm({...form, job_type: e.target.value})}
          className="w-full border p-2 rounded">
          <option>Full-time</option>
          <option>Part-time</option>
        </select>

        <textarea placeholder="Description"
          onChange={(e) => setForm({...form, description: e.target.value})}
          className="w-full border p-2 rounded"/>

        <Button type="submit">Post Job</Button>
      </form>
    </div>
  );
}