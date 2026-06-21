import Navbar from "../components/Navbar";
import { useParams,Link } from "react-router-dom";
import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom";
import { useState } from "react";

function ReferralDetailsPage() {
    const [referralDetail,setReferralDetail]=useState({})
    const { id } = useParams();
    const url=`https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals/${id}`;
    const token=Cookies.get('jwt_token');
    if (!token) {
    return <Navigate to="/login" />
}
    const options={
        method:'GET',
        headers:{
            'Content-Type':'Application/json',
            'Authorization':`Bearer ${token}`
        }
    }
    const fetchdata=async ()=>{
        try{
            const response=await fetch(url,options)
            const data= await response.json()
            setReferralDetail(data.data.referrals)
        }catch(error){
            console.error('Error fetching referral details:', error);
        }
    }
    return (
        <>
        <Navbar />
        <Link to="/">← Back to dashboard</Link>
        <h1>Referral Details</h1>
        <p>Full information for this referral partner.</p>
        <section>
            <div>
                <h1>{referralDetail.name}</h1>
                <p>{referralDetail.serviceName}</p>
            </div>
            <div><p>Referral ID</p><h2>{id}</h2></div>
            <div><p>Name</p><h2>{referralDetail.name}</h2></div>
            <div><p>Service  Name</p><h2>{referralDetail.serviceName}</h2></div>
            <div><p>Date</p><h2>{referralDetail.date}</h2></div>
            <div><p>Profit</p><h2>{referralDetail.profit}</h2></div>
        </section>
        </>
    )
}

export default ReferralDetailsPage;