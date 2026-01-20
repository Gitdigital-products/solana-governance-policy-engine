# policy_cli.py
# CLI wrapper for the Solana Governance Policy Engine

import argparse
from client import PolicyClient


def main():
    parser = argparse.ArgumentParser(
        description="CLI for Solana Governance Policy Engine"
    )

    parser.add_argument("--url", default="http://localhost:8000")
    parser.add_argument("--action", required=True)
    parser.add_argument("--dao", required=True)
    parser.add_argument("--wallet", required=True)
    parser.add_argument("--stake", type=int, default=0)
    parser.add_argument("--proposal")
    parser.add_argument("--cluster", default="mainnet-beta")

    args = parser.parse_args()

    client = PolicyClient(args.url)

    result = client.evaluate(
        action=args.action,
        dao_id=args.dao,
        wallet=args.wallet,
        proposal_id=args.proposal,
        stake=args.stake,
        context={"cluster": args.cluster},
    )

    print("\n=== Policy Decision ===")
    print(result)


if __name__ == "__main__":
    main()
