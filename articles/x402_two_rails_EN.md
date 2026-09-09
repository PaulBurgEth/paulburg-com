# Two Payment Rails in One HTTP 402

## How an ordinary rental site started charging software, and what the first three cents bought

### The system this is about

I run a site for Da Nang, in Vietnam, that answers two questions a newcomer has:
where to live, and who to call. Rentals on one side, about 8,250 long-term and
480 short-term at any moment, apartments, houses and rooms. A services directory
on the other, 283 providers across ten categories, from motorbike rental and
visa paperwork to doctors and home cooks. Around both of those, pages for each
apartment building and each district, and a search assistant that takes a plain
sentence in English, Vietnamese or Russian, or a screenshot of a map with a
circle drawn on it.

Almost all of that content is assembled from three sources: public posts in
Telegram groups, the same in Facebook groups, and Chợ Tốt, which is where
Vietnamese sellers put classifieds. The rest comes from landlords and providers
posting directly. It is a noticeboard rather than an agency: no commission, no
verification of owners, no deposits held, and every card links back to whoever
wrote the original post.

The site is three months old, and in that time two separate things happened to
who reads it. They are worth keeping apart, because only the second one leads
anywhere near this article's subject.

The first is a shift in the human traffic. An AI assistant now sends it more
visitors than Google organic does, and that referral did not exist in July.
There is still a person at the end of that chain: they ask a chatbot, a model
reads the pages, they arrive briefed. Interesting, and irrelevant to what
follows, because those readers pay nothing and never needed to.

The second is that renters started arriving with their own software. Two expats
I know here have built agents that do the apartment hunting for them: read
listings unattended, compare, leave a shortlist by morning. That is a reader
that never loads a page and never sees a signup form, and it is the one that
made the rest of this necessary.

So the board grew a machine-facing surface. Two of them, in fact: a plain REST
API for anything that speaks HTTP, and an MCP server for agents whose host wires
up tools for them. Four tools, every one of them a read. Nothing on this server
writes, and no response carries a phone number or a messenger handle, so an
agent that finds a match has to hand its person the listing URL.

Which produced the problem this article is actually about.

### The payer is software, and software cannot sign up

Serving that data costs money, and being read by agents means being read a lot.
So there is a free daily allowance, and past the allowance somebody has to pay.

The standard answer, an account and a card on file, has one hard requirement: a
person. Somebody must read the pricing, decide, enter a card and accept terms.

There is nobody on the other end of an agent. If the server answers "please
create an account", the agent either stops and waits for its owner or goes to a
source that did not ask. Either way the transaction does not happen.

### 402 and x402 are not the same thing

Worth separating, because the names collide.

**402** is an HTTP status code, Payment Required. It has been in the standard
since 1996, reserved and effectively unused.

**x402** is a protocol that gives it a meaning. It defines what the server puts
in the `PAYMENT-REQUIRED` header, the shape of the payment description, and the
API of the third party that settles the money. The version running here is v2.

The flow is three headers and two round trips. Past the free line the server
answers 402 with `PAYMENT-REQUIRED`, a base64 JSON description of what it will
accept. The client signs a payment and repeats the identical request with
`PAYMENT-SIGNATURE`. The server hands the pair to a facilitator, which verifies
and broadcasts, and answers 200 with `PAYMENT-RESPONSE` carrying the transaction
hash.

One constraint decides everything downstream: **the server holds no private
key.** Broadcasting a transfer costs gas, which means a funded wallet, which
means a key sitting on an application server that also serves rental listings.
The facilitator is the only party in the flow that needs one, and it cannot
alter the amount or the recipient, because both are inside the signature it
relays. The application holds a receiving address and nothing else.

### Why one challenge carries two chains

The interesting part of the specification is that `accepts` is an array.

The array exists so the client can choose. The alternatives are a second
endpoint, a versioned API, or a documentation page explaining which URL to use
for which chain. All three require telling every integrator something out of
band. The array requires telling them nothing: a generic x402 client reads the
challenge, finds an entry on a network where it holds funds, and pays, without
reading a word you wrote.

So the challenge carries two entries, USDC on Base and USDC on Solana, at the
same price, and the client picks. Here is the shape, from a live response:

```json
{
  "x402Version": 2,
  "accepts": [
    {
      "scheme": "exact",
      "network": "eip155:8453",
      "amount": "10000",
      "asset": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      "payTo": "<receiving address>",
      "maxTimeoutSeconds": 60,
      "extra": { "name": "USD Coin", "version": "2" }
    },
    {
      "scheme": "exact",
      "network": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      "amount": "10000",
      "asset": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "payTo": "<receiving address>",
      "maxTimeoutSeconds": 60,
      "extra": { "feePayer": "CjNFTjvBhbJJd2B5ePPMHRLx1ELZpa8dwQgGL727eKww" }
    }
  ]
}
```

Same scheme, same price. `10000` atomic units of a six decimal token is one
cent. The amount is a string on purpose: six decimal money in a float is a
rounding bug waiting for the first invoice that ends in a five.

One payment buys a block of five thousand calls rather than one call. Settling
per request would put an on-chain write between the agent and every listing it
reads, which is a good way to make a cheap API expensive and slow.

### Where the two rails stop resembling each other

Both entries say `scheme: "exact"`. After that word almost nothing carries over.

**On Base** the client signs an EIP-3009 authorization off chain. That is a
message saying "move this much of this token from me to that address", signed
against the token contract's EIP-712 domain. The server relays the signature and
the facilitator calls `transferWithAuthorization` on the contract.

**On Solana** there is no authorization object to relay. The client builds a
`TransferChecked` instruction, signs the transaction **partially**, and hands
over the serialized bytes. The facilitator adds itself as `feePayer`, signs, and
submits.

That is why `extra` carries different things in the two entries.

On Base it is the EIP-712 domain the signature is verified against: the token
contract's `name` and `version`. Get either wrong and the signature recovers to
the wrong address, and the failure reads like a client bug rather than your
misconfiguration. Do not copy these values from documentation. Read them off the
contract:

```
name()    on 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 -> "USD Coin"
version() on the same contract                          -> "2"
```

On Solana it carries `feePayer`, the public key the facilitator will sign as. A
client that cannot see it cannot build a transaction at all.

### Two things about addresses that cost people money

**`asset` is an address, and on Solana it is the mint.** Anyone can create an
SPL token and call it USDC. The symbol is not identity. The mint address is the
only thing that says which token you mean, and a server that reasons about
symbols anywhere in this flow has a hole in it.

**`payTo` is not where the money lands.** An SPL transfer under this scheme goes
to the associated token account derived from the pair (wallet, mint), not to the
wallet named in `payTo`. If that account does not exist, the payer's transaction
either fails or quietly pays the rent to create it, on a payment of one cent.

The second one is a design decision rather than a footnote. The server checks
that the receiving token account exists before it will advertise the Solana rail
at all, and refuses instead of creating it. Creating it is an on-chain write and
needs a funded keypair, which is the one thing the server is not allowed to
hold. The owner creates it once from their own wallet by sending any amount of
USDC to the address.

### The Solana entry is complete or it is absent

Four gates decide whether the second entry goes into the challenge:

1. the network is enabled in configuration
2. that network has its own facilitator named
3. the receiving wallet already holds a token account for the mint
4. `feePayer` was read successfully

Miss any one and the challenge goes out with a single entry. There is no partial
version, because a client that cannot see `feePayer` has nothing to sign, and an
entry with a hole in it costs an agent a failed payment to discover.

`feePayer` is read from the facilitator's own `/supported` endpoint while the
challenge is being built, not stored in configuration. The key belongs to them,
they rotate it, and a stale copy in your environment produces transactions
nobody will submit. The read is cached per process, and a failed read is
deliberately not cached, so a brief outage on their side cannot disable the rail
until the next deploy.

One more choice worth stating plainly: **one facilitator per rail, not one per
server.** Base settles through Mogami, Solana through PayAI. Adding a second
network is not a reason to move a rail that already works to a new counterparty,
and two tests assert that a Base payment never goes to the Solana facilitator.

### The three bugs, and why they needed real money

The test suite has almost three thousand tests. They were green through every
one of the following.

**One: a compute limit.** The facilitator pays the fee, so it caps what it will
sponsor. It accepts up to fifty thousand compute units. I was asking for two
hundred thousand. The specification says the default ceiling is four hundred
thousand, which is where my number came from. The error named the instruction
rather than the value, so it read as "your instruction is invalid" when the
truth was "your number is too big".

I searched for it from the wrong end: started at a hundred and fifty thousand,
worked upward as far as one and a half million, never went below a hundred
thousand, because I had assumed the number was too small. The check I skipped
cost one query against the chain: is this facilitator settling anyone else's
payments? It was, roughly fifteen a day, including in the minutes it was
refusing mine. Before concluding that somebody else's service is broken, find
out whether it works for other people.

**Two: a column width.** Settlement succeeded and the insert failed:
`value too long for type character varying(80)`. Solana signatures are
eighty-seven to eighty-eight characters. The money was on the chain, the row
recording it did not exist, and the payer got a 500 for a payment that had gone
through. Fixed with a migration.

Note what let it through. The test database was SQLite, which does not enforce
`varchar` length. Production is Postgres, which does. A test suite running on a
different engine from production is structurally blind to this entire class of
defect, and no amount of coverage helps.

**Three: my own timeout, which is the dangerous one.** The server gave the
facilitator fifteen seconds to settle. Mogami submits the transaction and waits
for confirmation, which does not fit in a quarter of a minute. My side timed
out, told the agent the service was unavailable, and the transfer landed anyway.
Twice, identically. Money taken, nothing delivered, and the only trace was two
lines in `journalctl`, which cannot be queried and cannot be reconciled against
the chain.

Two fixes came out of it. Settlement got its own deadline, separate from
verification, sized so both fit inside the window before the web worker is
killed. And a row is now written **before** the broadcast and closed with the
outcome afterwards. A dropped connection leaves it in state `unknown`, which is
the honest description: the money probably moved and there is no confirmation.
That row is visible in the admin, can be queried, and is matched against
unclaimed incoming transfers by an hourly job that finishes the payout without a
human.

Total cost of finding all three: three cents, taken and not delivered.

### What I would tell someone building this

Read the specification, not the articles about it. The wire format has already
moved once: in v1 the requirements sat in the response body as plain JSON and
the headers carried an `X-` prefix. In v2 they moved into a base64 header and
the prefix is gone. A client written for v1 does not see a v2 challenge at all,
and the failure is silent on both sides.

Put the payment description in the response, not in your documentation. The
point of the protocol is that a client which has never read your website can pay
you.

Test against your production database engine, and spend real money once. All
three defects above needed a chain to appear, and none of them needed a large
amount. One cent per attempt found every one.

Decide where the key lives before anything else. Every other decision in this
design follows from the server holding an address and nothing more.

---

The endpoint is live. Past the daily free allowance both surfaces answer 402
with the challenge above, on two chains. The description, and the challenge you
can pull yourself, are at
[helprentdanang.com/for-agents](https://helprentdanang.com/for-agents/).

Two machine payments exist so far, both mine, made to prove the path works end
to end. No outside agent has paid yet, and I would rather say that than imply
otherwise.
