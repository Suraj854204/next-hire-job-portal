"use client";

import { AppContextType, Application, AppProviderProps, User } from "@/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export const utils_service = "http://localhost:5001";
export const auth_service = "http://localhost:5000";
export const user_service = "http://localhost:5002";
export const job_service = "http://localhost:5003";
export const payment_service = "http://localhost:5004";

const AppContext = createContext<AppContextType | undefined>(undefined);

// Safe error message extractor
// Prevents crash when error.response is undefined (network error, CORS, timeout)
function getErrorMessage(error: any, fallback = "Something went wrong"): string {
  return error?.response?.data?.message ?? error?.message ?? fallback;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  // FIX: Per-job loading state
  // Previously: single btnLoading boolean → ALL cards entered loading together
  // Now: Set<number> tracks exactly which job_id is being applied to
  const [applyingJobIds, setApplyingJobIds] = useState<Set<number>>(new Set());

  const token = Cookies.get("token");

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${user_service}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function fetchApplications() {
    try {
      const { data } = await axios.get(`${user_service}/api/user/application/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProfilePic(formData: FormData) {
    setLoading(true);
    try {
      const { data } = await axios.put(`${user_service}/api/user/update/pic`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function updateResume(formData: FormData) {
    setLoading(true);
    try {
      const { data } = await axios.put(`${user_service}/api/user/update/resume`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  async function updateUser(name: string, phoneNumber: string, bio: string) {
    setBtnLoading(true);
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/update/profile`,
        { name, phoneNumber, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function logoutUser() {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out successfully");
  }

  async function addSkill(
    skill: string,
    setSkill: React.Dispatch<React.SetStateAction<string>>
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${user_service}/api/user/skill/add`,
        { skillName: skill },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
      setSkill("");
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    } finally {
      setBtnLoading(false);
    }
  }

  async function removeSkill(skill: string) {
    try {
      const { data } = await axios.put(
        `${user_service}/api/user/skill/delete`,
        { skillName: skill },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
      fetchUser();
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  }

  async function applyJob(job_id: number) {
    // Guard: already applying to this specific job → ignore duplicate click
    if (applyingJobIds.has(job_id)) return;

    // Mark ONLY this job as loading — all other cards stay unaffected
    setApplyingJobIds((prev) => new Set(prev).add(job_id));

    try {
      const { data } = await axios.post(
        `${user_service}/api/user/apply/job`,
        { job_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(data.message);
      fetchApplications();
    } catch (error: any) {
      // FIX: error.response can be undefined on network/CORS/timeout errors
      // Previously: error.response.data.message → TypeError crash
      toast.error(getErrorMessage(error, "Failed to apply. Please try again."));
    } finally {
      // Remove only this job from loading — not a full reset
      setApplyingJobIds((prev) => {
        const next = new Set(prev);
        next.delete(job_id);
        return next;
      });
    }
  }

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        btnLoading,
        applyingJobIds,
        setUser,
        isAuth,
        setIsAuth,
        setLoading,
        logoutUser,
        updateProfilePic,
        updateResume,
        updateUser,
        addSkill,
        removeSkill,
        applyJob,
        applications,
        fetchApplications,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
};