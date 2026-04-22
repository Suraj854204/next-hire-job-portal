export const forgotPasswordTemplate = (resetLink: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password</title>
</head>
<body style="margin:0;padding:0;background:#f6f9fc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6f9fc;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0f172a;padding:28px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;">NextHire</h1>
              <p style="margin:8px 0 0;color:#94a3b8;font-size:12px;">Secure account access</p>
            </td>
          </tr>

          <tr>
            <td style="padding:36px 30px;">
              <p style="margin:0 0 18px;color:#111827;font-size:15px;">Hi,</p>

              <p style="margin:0 0 18px;color:#374151;font-size:15px;line-height:1.7;">
                We received a request to reset your <strong>NextHire</strong> account password.
                Click the button below to continue.
              </p>

              <div style="text-align:center;margin:30px 0;">
                <a href="${resetLink}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 34px;border-radius:6px;font-size:14px;font-weight:600;">
                  Reset Password
                </a>
              </div>

              <p style="margin:0 0 10px;color:#6b7280;font-size:13px;">
                Or copy and paste this link into your browser:
              </p>

              <div style="background:#f3f4f6;padding:12px;border-radius:6px;font-size:12px;color:#2563eb;word-break:break-all;">
                ${resetLink}
              </div>

              <p style="margin:20px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                This link will expire in <strong>15 minutes</strong> for security reasons.
              </p>

              <p style="margin:14px 0 0;color:#9ca3af;font-size:13px;line-height:1.6;">
                If you did not request this, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#f9fafb;padding:22px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">© 2025 NextHire. All rights reserved.</p>
              <p style="margin:6px 0 0;color:#c0c6d4;font-size:11px;">This is an automated email. Please do not reply.</p>
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