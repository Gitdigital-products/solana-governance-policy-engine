/* ============================================================
   Solana Governance Policy Engine – main.js
   GitDigital Products
   ============================================================ */

/* ------------------------------------------------------------
   1. Code Tab Switcher
   ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const tabGroups = document.querySelectorAll("[data-tabs]");

  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll(".code-tab");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-target");
        const parentCard = group.closest(".card-body") || document;
        const blocks = parentCard.querySelectorAll(".code-block");

        // deactivate all tabs + blocks
        tabs.forEach(t => t.classList.remove("active"));
        blocks.forEach(b => b.classList.remove("active"));

        // activate selected
        tab.classList.add("active");
        const targetBlock = parentCard.querySelector("#" + targetId);
        if (targetBlock) targetBlock.classList.add("active");
      });
    });
  });
});

/* ------------------------------------------------------------
   2. Smooth Scroll for Navigation
   ------------------------------------------------------------ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});

/* ------------------------------------------------------------
   3. Policy API Client (Browser)
   ------------------------------------------------------------ */

export async function evaluatePolicy(payload) {
  const API_URL = payload.baseUrl || "http://localhost:8000/evaluate";

  const body = {
    action: payload.action || "CREATE_PROPOSAL",
    dao_id: payload.daoId,
    wallet: payload.wallet,
    proposal_id: payload.proposalId,
    stake: payload.stakeLamports,
    metadata: payload.metadata || {},
    context: {
      cluster: payload.cluster || "mainnet-beta",
      slot: payload.slot || null,
      risk_flags: payload.riskFlags || []
    }
  };

  const res = await fetch: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error(`Policy API error: ${res.status}`);
  }

  return await res.json();
}

/* ------------------------------------------------------------
   4. Demo Button (Optional)
   ------------------------------------------------------------ */

window.demoPolicyCheck = async function () {
  const output = document.getElementById("policy-demo-output");
  if (output) output.textContent = "Evaluating policy…";

  try {
    const result = await evaluatePolicy({
      daoId: "dao_123",
      wallet: "Fg6PaFpoGXkYsidMpWxqSWYq8u9Vx1t9n1t9n1t9",
      proposalId: "prop_001",
      stakeLamports: 500000000,
      cluster: "devnet",
      riskFlags: []
    });

    if (output) {
      output.textContent = JSON.stringify(result, null, 2);
    }
  } catch (err) {
    if (output) output.textContent = "Error: " + err.message;
  }
};

/* ------------------------------------------------------------
   5. Lightweight Event Bus (for future UI modules)
   ------------------------------------------------------------ */

export const Bus = {
  events: {},
  on(event, handler) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(handler);
  },
  emit(event, data) {
    (this.events[event] || []).forEach(fn => fn(data));
  }
};

/* Example:
Bus.on("policy:checked", data => console.log("Policy result:", data));
Bus.emit("policy:checked", { allowed: true });
*/
