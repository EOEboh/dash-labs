"use client";
import React, { useState } from "react";
import type { Lead } from "@/lib/ai/types/leads";
import type { ScoreResult } from "@/lib/ai/scoring";

export default function LeadRow({ lead }: { lead: Lead }) {
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function requestScore() {
    setLoading(true);
    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const data = await res.json();
      setScoreResult(data);
    } finally {
      setLoading(false);
    }
  }

  function badgeColor(score: number) {
    if (score >= 71) return "green";
    if (score >= 31) return "orange";
    return "red";
  }

  return (
    <tr>
      <td>{lead.name}</td>
      <td>{lead.company}</td>
      <td>
        {scoreResult ? (
          <div>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: "6px",
                background: badgeColor(scoreResult.score),
                color: "white",
              }}
            >
              {scoreResult.score}
            </span>
            <div style={{ fontSize: 12, color: "#666" }}>
              {scoreResult.reasons[0]}
            </div>
          </div>
        ) : (
          <button onClick={requestScore} disabled={loading}>
            {loading ? "Scoring…" : "Score"}
          </button>
        )}
      </td>
    </tr>
  );
}
