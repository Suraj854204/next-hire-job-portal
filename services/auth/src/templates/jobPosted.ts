export const jobPostedTemplate = (
  recruiterName: string,
  jobTitle: string
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
              <h1 style="margin:0;color:#fff;font-size:26px;">Job Published Successfully</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 30px;">
              <p style="margin:0 0 18px;color:#111827;font-size:15px;">Hi ${recruiterName},</p>
              <p style="margin:0;color:#374151;font-size:15px;line-height:1.7;">
                Your job posting for <strong>${jobTitle}</strong> is now live on <strong>NextHire</strong>.
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