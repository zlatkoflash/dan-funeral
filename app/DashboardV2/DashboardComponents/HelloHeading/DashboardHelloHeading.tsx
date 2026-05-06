import Link from "next/link";
import { Button } from "react-bootstrap";

/**
 * Professional greetings based on the 24-hour clock.
 */
const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default function DashboardHelloHeading() {
  const greeting = getGreeting();

  return (
    <section className="dashboard-hello-heading">
      <div className="content">
        <h2>{greeting} 👋</h2>
        <p>Here’s an overview of your serenity directory profile.</p>
      </div>
      <div className="right-buttons">
        <Link href="/DashboardV2/EditBusiness" className="btn btn-success">Edit Profile</Link>
      </div>
    </section>
  );
}