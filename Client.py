# client.py
# Solana Governance Policy Engine – Python Client
# GitDigital Products

import requests
from typing import Any, Dict, Optional


class PolicyClient:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip("/")

    def evaluate(
        self,
        action: str,
        dao_id: str,
        wallet: str,
        proposal_id: Optional[str] = None,
        stake: Optional[int] = None,
        metadata: Optional[Dict[str, Any]] = None,
        context: Optional[Dict[str, Any]] = None,
        timeout: int = 5,
    ) -> Dict[str, Any]:

        payload = {
            "action": action,
            "dao_id": dao_id,
            "wallet": wallet,
            "proposal_id": proposal_id,
            "stake": stake,
            "metadata": metadata or {},
            "context": context or {},
        }

        resp = requests.post(
            f"{self.base_url}/evaluate",
            json=payload,
            timeout=timeout,
        )
        resp.raise_for_status()
        return resp.json()


# Example usage:
if __name__ == "__main__":
    client = PolicyClient("http://localhost:8000")

    result = client.evaluate(
        action="CREATE_PROPOSAL",
        dao_id="dao_123",
        wallet="Fg6PaFpoGXkYsidMpWxqSWYq8u9Vx1t9n1t9n1t9",
        stake=500_000_000,
        context={"cluster": "devnet"},
    )

    print("Policy decision:", result)
