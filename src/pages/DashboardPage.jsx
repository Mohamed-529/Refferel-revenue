function DashboardPage() {

    return (
        <div>
            <h1>Referral Dashboard</h1>
            <p>Track your referrals, earnings and partner activity in one place.</p>
            <section>
                <h2>Overview</h2>
            </section>
            <section>
                <h2>Service summary</h2>
            </section>
            <section>
                <h2>Refer friends and earn more</h2>
                <div>
                    <div><label htmlFor="YourReferralLink">Your Referral Link</label><button type="button">Copy</button></div>
                    <div><label htmlFor="YourReferralCode">Your Referral Code</label><button type="button">Copy</button></div>
                </div>
            </section>
        </div>
    )

}

export default DashboardPage;