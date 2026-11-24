[![make.fun](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![rank](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/jokelord45/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![reward](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/jokelord45/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)

# Pump.fun Replay Sprint — Dip Buyer with a Runner

A paper-trading bot for the [Pump.fun Replay Sprint — Paper Bot, Real Ranking](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122) bounty on [make.fun](https://make.fun). It trades 10 SOL of paper money on a 24h replay of pump.fun bonding-curve activity.

## Strategy

Buy the dip, not the launch spike: the bot watches every curve, and buys one that survived its launch, pulled back 18–40% from its high over the last 120 slots, still holds at least 1 SOL of real reserves, and still has buyers stepping in (net flow ≥ 0.02 SOL over the last 20 slots). It skips coins whose creator sold or bought heavily. Each position is small (up to 0.08 SOL, capped at 1% of the curve's real SOL reserve per order), exits are a −10% stop-loss, banking 30% at +20% and trailing the rest −25% from its best value, a +150% hard take-profit, and a 300-slot hold limit.

## Local grade (kit's own grader, dev window)

`node cli/makefun.mjs grade-local --kit . --bot <this repo> --driver process`

Net −0.072 SOL, 302 fills over 69 coins, 69 round trips, 30% win rate, 1.9% max drawdown; guardrails met (69 coins with a round trip of at least 0.01 SOL). The dev window is a losing window for every variant tried — the kit's own sniper pilot scores −0.475 SOL on it — so the edge here is the strict dip filter, not the dev numbers; the final window is a fresh 24h of data.

## Run

```sh
node main.ts
```

Node 22.18+ (the grader runs Node 22.23.4), standard library only, no dependencies, no network, no clock, no randomness — deterministic by construction, so the two grading executions agree byte for byte.

## Layout

- `main.ts` — entrypoint: runs the strategy through the replay shim.
- `strategy.ts` — the dip-buyer strategy (all tunable parameters in `DEFAULT_PARAMS`).
- `vendor/makefun-bot.ts` — the kit's `agent-fun/replay/v2` bot shim, copied unchanged from the kit's SDK.
