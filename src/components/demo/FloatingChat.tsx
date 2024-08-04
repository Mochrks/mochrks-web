import React from "react";
import { Widget } from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

export default function FloatingChat() {
  return (
    <>
      <div className="App">
        <Widget />
      </div>
    </>
  );
}
