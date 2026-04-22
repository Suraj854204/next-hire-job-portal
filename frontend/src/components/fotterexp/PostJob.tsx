"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { job_service } from "@/context/AppContext";

const PostJob = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    role: "",
    job_type: "Full-time",
    work_location: "On-site",
    openings: "",
    company_id: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ GET ALL ACTIVE JOBS
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        `${job_service}/api/job/active`
      );
      setJobs(data.jobs || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const token = Cookies.get("token");

    try {
      setLoading(true);

      await axios.post(
        `${job_service}/api/job/create`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Posted 🚀");

      fetchJobs(); // refresh list

    } catch (err: any) {
      alert(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-5 py-10">
      <div className="mx-auto max-w-6xl">

        {/* POST JOB FORM */}
        <form
          onSubmit={submitHandler}
          className="mb-12 space-y-4 rounded-xl border p-5"
        >
          <h2 className="text-xl font-bold">Post Job</h2>

          <input name="title" placeholder="Title" onChange={handleChange} className="w-full border p-2 rounded"/>
          <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded"/>
          
          <button className="bg-black text-white px-4 py-2 rounded">
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>

        {/* ACTIVE JOBS */}
        <h2 className="mb-5 text-2xl font-bold">All Active Jobs</h2>

        {loadingJobs ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {jobs.map((job) => (
              <div key={job.job_id} className="border p-4 rounded-xl shadow">
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.location}</p>
                <p className="text-sm">₹ {job.salary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostJob;