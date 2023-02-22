import React from "react";
import { Link, useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  console.log("location", location);

  return (
    <div>
      About
      <Link to="/">Home</Link>
    </div>
  );
};

export default About;
