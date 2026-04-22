export const applicationSubmittedTemplate = (
  candidateName: string,
  jobTitle: string,
  companyName: string
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f6f9fc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f6f9fc;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0f172a;padding:28px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:26px;">Application Received</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 30px;">
              <p style="margin:0 0 18px;color:#111827;font-size:15px;">Hi ${candidateName},</p>
              <p style="margin:0 0 18px;color:#374151;font-size:15px;line-height:1.7;">
                Your application for <strong>${jobTitle}</strong> at <strong>${companyName}</strong> has been submitted successfully.
              </p>
              <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:16px;border-radius:8px;color:#1e3a8a;font-size:14px;">
                Our team will review your application and update you if there is any progress.
              </div>
              <p style="margin:18px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                Thank you for using NextHire.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f9fafb;padding:22px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">© 2025 NextHire. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};