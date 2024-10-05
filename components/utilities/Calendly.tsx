"use client"
import React from "react";
import { InlineWidget } from "react-calendly";

const Calendly = () => {
  return (
    <div className="App Calendly">
      <InlineWidget url="https://calendly.com/amauryfranssen/30min" />
    </div>
  );
};

export default Calendly;