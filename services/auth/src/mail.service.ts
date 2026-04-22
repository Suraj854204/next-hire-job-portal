import { sendMail } from "./sendMail.js";
import { SUBJECTS } from "./subjects.js";
import {
  forgotPasswordTemplate,
  applicationSubmittedTemplate,
  applicationStatusTemplate,
  jobPostedTemplate,
} from "./templates/index.js";

export const sendForgotPasswordMail = async (
  email: string,
  resetLink: string
) => {
  return await sendMail({
    to: email,
    subject: SUBJECTS.FORGOT_PASSWORD,
    html: forgotPasswordTemplate(resetLink),
  });
};

export const sendApplicationSubmittedMail = async (
  email: string,
  candidateName: string,
  jobTitle: string,
  companyName: string
) => {
  return await sendMail({
    to: email,
    subject: SUBJECTS.APPLICATION_SUBMITTED,
    html: applicationSubmittedTemplate(candidateName, jobTitle, companyName),
  });
};

export const sendApplicationStatusMail = async (
  email: string,
  candidateName: string,
  jobTitle: string,
  companyName: string,
  status: "Submitted" | "Hired" | "Rejected"
) => {
  return await sendMail({
    to: email,
    subject: SUBJECTS.APPLICATION_STATUS,
    html: applicationStatusTemplate(
      candidateName,
      jobTitle,
      companyName,
      status
    ),
  });
};

export const sendJobPostedMail = async (
  email: string,
  recruiterName: string,
  jobTitle: string
) => {
  return await sendMail({
    to: email,
    subject: SUBJECTS.JOB_POSTED,
    html: jobPostedTemplate(recruiterName, jobTitle),
  });
};