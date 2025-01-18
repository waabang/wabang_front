"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
export default function Searchbar() {
  const [text, setText] = useState("");
  return (
    <div
      style={{
        zIndex: "1",
        position: "absolute",
        top: "12px",
        left: "21px",
        width: "90%",
        height: "50px",
      }}
    >
      <Image
        src="/search.svg"
        alt="search"
        width={26}
        height={26}
        style={{ position: "absolute", top: "11px", left: "10px" }}
      />
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        style={{
          width: "100%",
          height: "100%",
          padding: "10px 45px",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
        placeholder="지역을 검색해보세요"
      />
    </div>
  );
}
