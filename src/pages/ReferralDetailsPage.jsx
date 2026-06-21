import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import "../styles/referraldetail.css";

function ReferralDetailsPage() {
    const [referralDetail, setReferralDetail] = useState({});
    const { id } = useParams();
    const token = Cookies.get("jwt_token");

    useEffect(() => {
        const fetchAllDataAndFilter = async () => {
            const mainDashboardUrl = "https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";
            try {
                const response = await fetch(mainDashboardUrl, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                
                
                const allReferrals = data.data.referrals || [];
                const matchedPartner = allReferrals.find(each => Number(each.id) === Number(id));
                
                if (matchedPartner) {
                    setReferralDetail(matchedPartner);
                }
            } catch (error) {
                console.log("Error reading data", error);
            }
        };

        if (token) {
            fetchAllDataAndFilter();
        }
    }, [id, token]); 

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="dashboard-container">
            <Navbar />
            
            <Link to="/" className="back-link">← Back to dashboard</Link>
            <h1 className="details-main-title">Referral Details</h1>
            <p className="page-subtitle">Full information for this referral partner.</p>
            
            <div className="details-card">
                <div className="details-card-header">
                    <h1 className="profile-name-title">{referralDetail.name || "Loading..."}</h1>
                    {referralDetail.serviceName && (
                        <span className="profile-badge-pill">{referralDetail.serviceName}</span>
                    )}
                </div>
                
                <div className="detail-info-row">
                    <p className="info-row-label">Referral ID</p>
                    <p className="info-row-value">{id}</p>
                </div>
                <div className="detail-info-row">
                    <p className="info-row-label">Name</p>
                    <p className="info-row-value">{referralDetail.name || "---"}</p>
                </div>
                <div className="detail-info-row">
                    <p className="info-row-label">Service Name</p>
                    <p className="info-row-value">{referralDetail.serviceName || "---"}</p>
                </div>
                <div className="detail-info-row">
                    <p className="info-row-label">Date</p>
                    <p className="info-row-value">{referralDetail.date || "---"}</p>
                </div>
                <div className="detail-info-row">
                    <p className="info-row-label">Profit</p>
                    <p className="info-row-value">
                        {referralDetail.profit ? `$${referralDetail.profit}` : "---"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ReferralDetailsPage;
