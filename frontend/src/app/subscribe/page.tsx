"use client";
import useRazorpay from "@/components/scriptLoader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { payment_service, useAppData } from "@/context/AppContext";
import toast from "react-hot-toast";
import Loading from "@/components/loading";
import { Shield, Crown, CheckCircle, Zap, Users } from "lucide-react";

const SubscriptionPage = () => {
  const razorpayLoaded = useRazorpay();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppData();

  const handleSubscribe = async () => {
    const token = Cookies.get("token");
    setLoading(true);
    try {
      const {
        data: { order },
      } = await axios.post(
        `${payment_service}/api/payment/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_Sg45nVsDD9YYLH",
        amount: order.amount,
        currency: "INR",
        name: "NextHire",
        description: "Find job easily",
        order_id: order.id,
        handler: async function (response: any) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          try {
            const { data } = await axios.post(
              `${payment_service}/api/payment/verify`,
              { razorpay_order_id, razorpay_payment_id, razorpay_signature },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            toast.success(data.message);
            setUser(data.updatedUser);
            router.push(`/payment/success/${razorpay_payment_id}`);
            setLoading(false);
          } catch (error: any) {
            setLoading(false);
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: {
          color: "#185FA5",
        },
      };

      if (!razorpayLoaded) {
        toast.error("Payment gateway failed to load. Please refresh.");
        setLoading(false);
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .nh-sub-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          background: #f0f4f8;
          font-family: 'DM Sans', sans-serif;
        }

        .dark .nh-sub-root {
          background: #0d1117;
        }

        .nh-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 60px -10px rgba(12,68,124,0.15);
          border: 0.5px solid rgba(0,0,0,0.06);
        }

        .dark .nh-card {
          background: #161b22;
          border-color: rgba(255,255,255,0.08);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3), 0 20px 60px -10px rgba(12,68,124,0.3);
        }

        /* ── Header ── */
        .nh-header {
          background: linear-gradient(135deg, #0c447c 0%, #185fa5 55%, #378add 100%);
          padding: 2.5rem 2rem 2.75rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .nh-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .nh-header-bg-crown {
          position: absolute;
          top: 1rem;
          right: 1.5rem;
          opacity: 0.08;
          pointer-events: none;
        }

        .nh-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .nh-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #7dd3fc;
          flex-shrink: 0;
        }

        .nh-plan-name {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.35rem;
          letter-spacing: -0.5px;
          line-height: 1.15;
        }

        .nh-plan-tagline {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          margin: 0;
        }

        .nh-price-row {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 3px;
          margin: 1.5rem 0 0.35rem;
        }

        .nh-price-currency {
          font-size: 22px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1;
          align-self: flex-start;
          padding-top: 8px;
        }

        .nh-price-amount {
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -2px;
        }

        .nh-price-period {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          align-self: flex-end;
          padding-bottom: 8px;
          font-weight: 300;
        }

        /* ── Body ── */
        .nh-body {
          padding: 2rem 2rem 0;
        }

        .nh-features {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .nh-feature {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .nh-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #dcfce7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .dark .nh-check {
          background: rgba(34,197,94,0.15);
        }

        .nh-feature-label {
          font-size: 13px;
          font-weight: 500;
          color: #1e293b;
          margin: 0 0 2px;
          line-height: 1.4;
        }

        .dark .nh-feature-label {
          color: #f1f5f9;
        }

        .nh-feature-desc {
          font-size: 12px;
          color: #64748b;
          margin: 0;
          font-weight: 300;
          line-height: 1.4;
        }

        .dark .nh-feature-desc {
          color: #94a3b8;
        }

        .nh-divider {
          border: none;
          border-top: 0.5px solid #e2e8f0;
          margin: 2rem 0 0;
        }

        .dark .nh-divider {
          border-top-color: rgba(255,255,255,0.08);
        }

        /* ── Footer ── */
        .nh-footer {
          padding: 1.75rem 2rem 2rem;
        }

        .nh-cta {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #0c447c 0%, #378add 100%);
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.2px;
          transition: opacity 0.2s ease, transform 0.15s ease;
          position: relative;
          overflow: hidden;
        }

        .nh-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }

        .nh-cta:hover {
          opacity: 0.93;
          transform: translateY(-1px);
        }

        .nh-cta:active {
          transform: scale(0.98);
        }

        .nh-cta:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .nh-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          margin-top: 14px;
          font-size: 12px;
          color: #94a3b8;
          font-weight: 400;
        }

        .dark .nh-guarantee {
          color: #64748b;
        }
      `}</style>

      <div className="nh-sub-root">
        <div className="nh-card">

          {/* ── Header ── */}
          <div className="nh-header">
            <Crown size={80} className="nh-header-bg-crown" color="white" />

            <div className="nh-badge">
              <span className="nh-badge-dot" />
              Premium Plan
            </div>

            <h1 className="nh-plan-name">NextHire Pro</h1>
            <p className="nh-plan-tagline">Get hired faster with priority visibility</p>

            <div className="nh-price-row">
              <span className="nh-price-currency">₹</span>
              <span className="nh-price-amount">119</span>
              <span className="nh-price-period">/ month</span>
            </div>
          </div>

          {/* ── Features ── */}
          <div className="nh-body">
            <ul className="nh-features">
              <li className="nh-feature">
                <span className="nh-check">
                  <CheckCircle size={14} color="#16a34a" />
                </span>
                <div>
                  <p className="nh-feature-label">Top of the recruiter feed</p>
                  <p className="nh-feature-desc">Your application is shown first — stand out from hundreds of candidates instantly</p>
                </div>
              </li>

              <li className="nh-feature">
                <span className="nh-check">
                  <CheckCircle size={14} color="#16a34a" />
                </span>
                <div>
                  <p className="nh-feature-label">Priority support</p>
                  <p className="nh-feature-desc">Dedicated assistance from our team whenever you need help</p>
                </div>
              </li>

              <li className="nh-feature">
                <span className="nh-check">
                  <CheckCircle size={14} color="#16a34a" />
                </span>
                <div>
                  <p className="nh-feature-label">Unlimited applications</p>
                  <p className="nh-feature-desc">Apply to every role that matches you — no limits, no restrictions</p>
                </div>
              </li>

              <li className="nh-feature">
                <span className="nh-check">
                  <CheckCircle size={14} color="#16a34a" />
                </span>
                <div>
                  <p className="nh-feature-label">Profile boost badge</p>
                  <p className="nh-feature-desc">A Pro badge on your profile signals seriousness to hiring managers</p>
                </div>
              </li>
            </ul>

            <hr className="nh-divider" />
          </div>

          {/* ── CTA ── */}
          <div className="nh-footer">
            <button
              className="nh-cta"
              onClick={handleSubscribe}
              disabled={loading}
            >
              <Crown size={16} />
              Unlock Premium Access
            </button>

            <p className="nh-guarantee">
              <Shield size={13} />
              Secured by Razorpay · Cancel anytime
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;