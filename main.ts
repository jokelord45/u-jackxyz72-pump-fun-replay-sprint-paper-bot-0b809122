// Pump.fun Replay Sprint — Paper Bot, Real Ranking
// Entry: a dip buyer with a runner. Buys pump.fun curves that survived their launch
// spike, pulled back from their recent high, and still have buyers stepping in;
// cuts losers at -10%, banks half at +20% and trails the rest. See strategy.ts.

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy } from './strategy.ts';

await runBot(createStrategy());
