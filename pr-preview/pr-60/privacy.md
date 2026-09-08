# Privacy Policy

**Last updated:** 12 August 2026

This Privacy Policy explains what personal data **Checkpoint64** ("**we**", "**us**", "**our**") collects when you use the website at [checkpoint64.com](https://checkpoint64.com/), install the Checkpoint64 desktop app (the "**App**"), or use the Checkpoint64 cloud backup service (together, the "**Service**"), why we collect it, where it is stored, who we share it with, and the rights you have over it.

We are the **data controller** for the personal data described below. We are based in the United Kingdom and process personal data in line with the **UK GDPR** and the **Data Protection Act 2018**. If you are in the EEA, the **EU GDPR** applies on equivalent terms. Full controller identification and contact details are in Section 16.

## 1. The short version

- We collect the **minimum we need** to run the Service: your email and account details, the save files you ask us to back up, and basic technical information to keep the Service running and secure.
- We **never sell your data**, and we **never read the contents of your save files** for advertising, profiling, or model training. The one automated exception is malware scanning of **team** save files — see Section 2.7.
- Save files are **encrypted at rest** by our storage providers and **encrypted in transit**. They are **not** end-to-end encrypted — see Section 10.2 for exactly what that means.
- We use a small number of **third-party processors** to host the Service, send transactional email, process payments, monitor errors, and measure how the website is used. They are all listed in Section 8.
- You have **strong rights** over your data, including the right to access, correct, export, and delete it. Section 11 explains how to exercise them.

## 1.1 Quick answers

| If you want to know… | See |
| --- | --- |
| Exactly what personal information we collect | [Section 2](#2-the-data-we-collect) |
| Whether we collect IP addresses and device information | [Section 2.3](#23-technical-and-security-data-including-ip-addresses) |
| What analytics and telemetry run, on the site and in the App | [Sections 2.4–2.6](#24-analytics-on-the-marketing-website) |
| What cookies and tracking we use, and whether we ask for consent | [Section 4](#4-cookies-and-similar-technologies) |
| Where the servers are physically located | [Section 7](#7-where-your-data-is-stored) |
| Whether save files are encrypted at rest | [Section 10.2](#102-encryption-of-your-content) |
| Who our cloud and storage providers are | [Section 8](#8-the-processors-we-use) |
| How long backups remain after you delete them | [Section 9](#9-how-long-we-keep-your-data) |
| Whether your data can be disclosed to third parties | [Section 5](#5-who-we-share-data-with) |
| The legal basis for processing UK and EEA users' data | [Section 3](#3-why-we-use-your-data-and-the-lawful-basis) |
| Who is legally responsible for the Service | [Section 16](#16-who-we-are-controller-identity) |

The rest of this page is the long version.

## 2. The data we collect

### 2.1 Account data

If and when you register for an account, we collect:

- your **email address** and a **display name**;
- a **BCrypt hash of your password** (we never store your password in plaintext, and it only ever leaves your device over TLS);
- whether your email address is **verified**;
- if you sign in with **Google** or **GitHub**, the **OAuth identifier** that provider returns to us and the email address it supplies;
- if you activate or sign in via **Steam**, your **Steam ID** and the fact that activation came from Steam. Steam accounts that have never supplied an email address are given a non-deliverable internal placeholder address until you add a real one;
- if you pay through **Stripe**, your **Stripe customer ID** and subscription/purchase status. **We never see or store your card details** — Stripe holds them;
- access and **refresh tokens** we issue to keep you signed in. The App stores these in your operating system's secure credential store (Windows Credential Manager, macOS Keychain, or Secret Service on Linux). On systems with no credential store — notably the Steam Deck — the App falls back to a permission-restricted file next to its config.

### 2.2 The content you back up ("Your Content")

When you use the Service to back up game saves, we receive and store:

- the **save files** you choose to back up, transmitted over TLS and stored as deduplicated, content-addressed blobs (see Section 8 for which storage provider holds them);
- **manifests** describing how those blobs reconstruct your save folder, including file paths, file names, sizes, hashes, and timestamps. **File and folder names are visible to us**, because we need them to restore your saves correctly — avoid putting personal information in save file names;
- the **games you have added** to your account, plus any per-save settings, slot labels, and notes you create;
- in team / co-op namespaces, **lock state** (who currently holds the editing lock on a save) and an **activity log** of uploads, restores, and lock changes, including which member did what and when. Other members of a team you join can see your display name and your activity in that team.

Your Content stays yours — see Section 4 of the [Terms](/terms/).

### 2.3 Technical and security data, including IP addresses

To operate and protect the Service we collect or generate:

- **IP addresses.** Your IP address is processed by our hosting provider and our backend on every request. We use it for **rate limiting and abuse prevention**, and it appears in **server logs**. We do not use IP addresses to build advertising or behavioural profiles.
- **Server logs** containing request paths, HTTP status codes, timestamps, user IDs (where you are signed in), and IP addresses.
- **Device and app information**: App version, operating system and version, and CPU architecture. This is used to serve the correct binary update and to reproduce bugs.
- **Rate-limiting counters** keyed by user, namespace, and client IP.
- **Error reports and crash diagnostics** from the backend, including stack traces and the request context in which an error occurred (see Sentry in Section 8).
- **Usage counters** such as your storage consumption and the number of teams or saves on your account, used to enforce plan limits.

### 2.4 Analytics on the marketing website

The marketing website at checkpoint64.com loads two analytics tools **on its homepages** (including the German, French, and Spanish translations):

- **Google Analytics 4** — measures visits and on-page interactions. It may set cookies and receives your **IP address** (truncated by Google before storage), **user-agent**, **referrer**, **approximate location**, **screen size**, **device type**, and **interaction events** such as clicks and scrolls. We do not enable Google Analytics features that let Google use your data for its own advertising purposes.
- **Ahrefs Web Analytics** — a lightweight, cookieless visitor-counting tool used to measure traffic and referrers. It receives your IP address and user-agent at request time.

We do **not** use session-replay or heatmap tools. Microsoft Clarity and Simple Analytics were used previously and have both been **removed**.

The Site also loads **Google Fonts** from Google's servers, which means Google receives your browser's IP address when it fetches a font. We use **Google Search Console** and **Bing Webmaster Tools** for search-performance reporting; these rely on a verification file or meta tag and do not set tracking cookies on your visit.

**On consent:** Google Analytics sets cookies, so it does **not** load until you accept it. On your first visit to a homepage you will see a banner offering *Accept* and *Reject* as equally prominent choices. Nothing that stores cookies runs until you pick one, and closing or ignoring the banner is **not** treated as consent. Your choice is remembered in your browser and you can change it at any time via **Cookie settings** in the site footer. Ahrefs is cookieless, so it is not gated behind the banner.

### 2.5 Analytics and telemetry in the desktop app

The App sends pseudonymous product-analytics events to **Aptabase** — for example, "the user opened the Versions panel", "an auto-backup completed", or a **stable, content-free error label** when an operation fails. These events tell us which features are used and where the App breaks.

What these events **do not** contain: the contents of your save files, your file paths, your file names, your email address, or your password. Aptabase is EU-hosted and is designed not to use cookies or persistent device identifiers.

**The App does not currently offer a setting to turn this off.** An earlier version of this policy said one would be provided; that is not yet true, and we have corrected the statement rather than leave it standing. If you want your App telemetry excluded, email us at [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com) and we will tell you the current status and honour your objection.

### 2.6 Information you give us when you contact us

If you email us, use the in-app feedback form, request a game, or reach out via Discord, we receive whatever you choose to send, including your **contact details** and the **content of your message**. In-app feedback is stored as a thread against your account so we can reply to you.

### 2.7 Malware scanning of team save files

Save files uploaded into **team namespaces** are automatically scanned for malware. Each uploaded blob is streamed to a **ClamAV** scanner we run on our own private infrastructure, which returns a clean/infected verdict that we store against the file's hash. This exists because a team namespace lets one member's upload reach another member's PC.

Three things about this:

- It is **fully automated**. No person reads your save files, and no content is retained by the scanner beyond the verdict.
- It applies to **team namespaces only**. Files in your **personal** namespace are **never scanned**.
- The scanner runs on **our own servers**, not a third-party scanning service, so team save contents are not sent to an outside provider for this purpose.

## 3. Why we use your data, and the lawful basis

| What we use it for | Lawful basis under the UK/EU GDPR |
| --- | --- |
| Creating your account and operating the Service: authentication, backing up and restoring saves, enforcing per-namespace access, billing, team and lock features | **Contract** (Art. 6(1)(b)) — necessary to provide the Service you signed up for. |
| Sending transactional emails: account verification, password reset, deletion confirmation, receipts, security alerts, important Service notices | **Contract** (Art. 6(1)(b)); **legal obligation** (Art. 6(1)(c)) for invoices and tax records. |
| Keeping the Service secure: server logs, IP-based rate limiting, abuse detection, error monitoring, security review | **Legitimate interests** (Art. 6(1)(f)) — protecting the Service and our users against abuse, outage, and data loss. We have weighed this against your rights and consider the impact minimal, as the data is technical and retained briefly. |
| Malware scanning of team save files (Section 2.7) | **Legitimate interests** (Art. 6(1)(f)) — protecting members of a shared namespace from a malicious or infected upload by another member. |
| Optional integrations you initiate: Discord linking, Patreon supporter access, Steam achievements | **Contract** (Art. 6(1)(b)) where the feature is part of the Service; **consent** (Art. 6(1)(a)) for the act of linking an external account, which you can withdraw by unlinking. |
| Improving the App and Service: pseudonymous product analytics and crash reports | **Legitimate interests** (Art. 6(1)(f)) — understanding which features are used and where the App fails. |
| Marketing-website analytics — Google Analytics 4 | **Consent** (Art. 6(1)(a)), collected through the cookie banner before the tag loads, and withdrawable at any time from Cookie settings in the footer. |
| Marketing-website analytics — Ahrefs (cookieless) | **Legitimate interests** (Art. 6(1)(f)) — measuring traffic and content performance without storing anything on your device, so no PECR consent is required. |
| Complying with our legal obligations (responding to lawful requests, retaining accounting records) | **Legal obligation** (Art. 6(1)(c)). |
| Defending or pursuing legal claims | **Legitimate interests** (Art. 6(1)(f)). |

We do **not** use Your Content for any purpose other than providing the backup, restore, sharing, quota-enforcement, and malware-scanning features described above. We do not train machine-learning models on Your Content, and we do not sell or share Your Content with advertisers.

You can ask us for our legitimate-interests assessment on any row above by emailing [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com).

## 4. Cookies and similar technologies

The Service uses cookies and similar technologies (including browser local storage) for these purposes:

- **Strictly necessary** — keeping you signed in, CSRF protection, and rate-limit state. These do not require consent. The App additionally stores your session tokens in your OS credential store, and your interface preferences (language, theme) in local storage on your device. Your cookie choice itself is stored in local storage: that record is strictly necessary, because without it we could not honour a refusal.
- **Analytics** — Google Analytics 4 sets cookies on the marketing-site homepages, and **loads only if you accept it** in the consent banner. Ahrefs Web Analytics is cookieless and needs no consent. You can change or withdraw your choice at any time from **Cookie settings** in the footer.
- **Third-party content** — Google Fonts is fetched from Google's servers, which exposes your IP address to Google.

**How to block them.** You can block or delete cookies in your browser settings, use a content blocker (Google Analytics and Ahrefs are blocked by all mainstream blocking lists), send a Do Not Track / Global Privacy Control signal, or install Google's [opt-out browser add-on](https://tools.google.com/dlpage/gaoptout). Blocking analytics does not affect your use of the Service in any way. Blocking strictly-necessary cookies will prevent you from signing in.

The App itself contains **no advertising, no third-party trackers, and no cookies** beyond what is described here.

## 5. Who we share data with

**We do not sell your personal data, and we do not share it with advertisers or data brokers.** We do not participate in real-time bidding or any ad-tech data exchange.

We share the minimum necessary data with:

- **Our service providers (processors)** — the full list is in Section 8. Each is bound by a contract that limits their use of the data to providing services to us, on our instructions.
- **Payment providers (Stripe, Steam / Valve)** — to take and reconcile payments you make.
- **OAuth identity providers (Google, GitHub)** — only if you choose to sign in with them, and only for the sign-in handshake itself.
- **Steam / Valve** — if you use a Steam build, we send your **Steam ID** and an achievement identifier to Valve's Web API when you earn an in-game achievement, and we check your DLC entitlements to determine your plan.
- **Discord** — only if you link your Discord account. We store your Discord user ID and username, and we periodically check whether you are still a member of our Discord server, because server membership grants a storage bonus. Unlink at any time to stop this.
- **Patreon** — only if you link a Patreon account to grant or receive supporter access. We store the Patreon account identifier, campaign identifier, tier information, and an **encrypted** OAuth token, and we periodically check membership status to keep access in sync.
- **Other members of a team you join** — your display name and your activity within that namespace. Your email address is **never** shown to other users.
- **Authorities, courts, and other parties where legally required** — for example in response to a valid court order, a binding regulatory request, or to comply with a legal obligation. We will challenge requests we believe to be overbroad or unlawful, and we will notify you where we are legally permitted to do so.
- **To protect rights and safety** — where necessary to investigate fraud or abuse, or to establish, exercise, or defend legal claims.
- **A successor entity** — if the Service is involved in a merger, acquisition, restructuring, or sale of assets, your data may transfer to the successor, subject to the same protections set out in this policy. We will tell you before this happens.

## 6. International transfers

Some of our processors are based outside the United Kingdom and the EEA — in particular in the **United States** (see the "Where it processes data" column in Section 8). Where we transfer personal data to a country the UK or EU has not deemed adequate, we rely on appropriate safeguards, typically the **Standard Contractual Clauses** issued by the European Commission together with the **UK International Data Transfer Addendum**, plus supplementary technical measures such as encryption in transit and at rest.

We have deliberately kept **Your Content** (save files and manifests) within the **UK and EU** — see Section 7. The transfers to the United States concern account, billing, email, error-monitoring, and website-analytics data, not your save file contents.

You can request a copy of the safeguards applying to a specific transfer by emailing [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com).

## 7. Where your data is stored

| What | Where it physically lives |
| --- | --- |
| **Backend API servers** | **Fly.io**, in **London, United Kingdom (`lhr`)** and **Chicago, United States (`ord`)**. Both run continuously so that users are served from a nearby region. A request from the US may therefore be handled by the Chicago machine. |
| **Save-file blobs (Your Content)** | **Amazon S3** in **`eu-west-2` (London, UK)**, and/or **Cloudflare R2** provisioned with the **EU jurisdiction** restriction, which contractually keeps objects in the European Union. Which store holds a given save depends on the namespace it was created in. |
| **Database (accounts, manifests, namespaces, activity)** | **MongoDB**, on a managed cloud database service, EU/UK region. |
| **Operational logs and error reports** | Fly.io (UK/US, as above) and **Sentry** (United States). |
| **Marketing website** | **GitHub Pages**, served from a global CDN edge. |

Because our backend runs in both London and Chicago, **account and request data — including IP addresses and server logs — may be processed in the United States** in the ordinary course of serving you. Your **save file contents** are stored only in the UK and EU as set out above.

## 8. The processors we use

| Processor | What it does | Where it processes data |
| --- | --- | --- |
| **Fly.io** | Hosts the backend API; TLS termination | UK (London) + US (Chicago) |
| **Amazon Web Services (S3)** | Stores save-file blobs, encrypted at rest | UK (`eu-west-2`) |
| **Cloudflare (R2)** | Alternative save-file blob store, encrypted at rest | EU (jurisdiction-restricted) |
| **MongoDB** (managed cloud database) | Stores account, manifest, namespace, and activity data | EU / UK |
| **Sentry** | Backend error monitoring and crash diagnostics | US |
| **Stripe** | Processes payments; stores customer and payment records | US + EU |
| **Steam / Valve** | Steam sign-in, entitlement checks, payments, achievements | US |
| **Resend** | Sends transactional email (verification, password reset, receipts) | US |
| **Google (Sign-in / OAuth)** | Optional sign-in provider | US |
| **GitHub (OAuth)** | Optional sign-in provider | US |
| **Discord** | Optional account linking and notifications | US |
| **Patreon** | Optional supporter-access linking | US |
| **Aptabase** | Pseudonymous desktop-app product analytics | EU |
| **Google Analytics 4** | Marketing-website analytics | US (IP truncated) |
| **Ahrefs Web Analytics** | Marketing-website visitor counting (cookieless) | EU / US |
| **Google Fonts** | Serves web fonts on the marketing site | US / global |
| **GitHub Pages** | Hosts and caches the marketing site | Global edge |

Malware scanning (Section 2.7) runs on **our own private infrastructure** and is not a third-party processor.

This list is current as at the "Last updated" date. We will update this page **before** adding a new processor that handles personal data.

## 9. How long we keep your data

| Data | Retention |
| --- | --- |
| **Account data** | For as long as your account is active. After you confirm deletion, it is permanently erased **7 days** later (see Section 13). |
| **Your Content (save files and manifests)** | For as long as your account exists and you keep them. When you delete a save or a version, the underlying blobs are reclaimed by a scheduled sweep after a **7-day** grace window, provided no other version still references them (storage is deduplicated, so a blob shared with a version you kept survives until that version is deleted too). |
| **Server logs and rate-limit data** | We retain these for **no longer than 30 days**, except where a specific, documented security investigation requires us to preserve a record for longer. Rate-limit counters expire within hours. |
| **Error reports (Sentry)** | Up to **90 days**, per Sentry's retention settings. |
| **Activity logs (per-namespace)** | For as long as the namespace exists, so team members have a complete history. Deleted with the namespace. |
| **Billing and accounting records** | **7 years** after the transaction, to meet UK accounting and tax obligations. This retention survives account deletion because it is a legal obligation. |
| **Support and feedback correspondence** | **2 years** after the issue is closed. |
| **Website analytics** | Per Google's and Ahrefs' own retention settings; aggregated reporting data contains no identifiers and may be kept indefinitely. |

When we no longer need data, we delete it or irreversibly anonymise it.

## 10. How we protect your data

### 10.1 Security measures

- **TLS** for all data in transit between you, our backend, and our processors.
- **BCrypt** password hashing, with no plaintext storage anywhere.
- **JWT** access tokens with short lifetimes plus rotating refresh tokens, held in your OS credential store rather than browser local storage.
- **Rate limiting**, abuse detection, and HTTP security headers including a Content Security Policy.
- **Principle of least privilege** on internal access to systems and data.
- **Strict separation** between the App and the backend: the desktop client never holds cloud-storage credentials. It uploads and downloads via short-lived, single-purpose signed URLs issued by the backend.
- **Encrypted storage of third-party OAuth tokens** (for example Patreon) using AES-256.
- Regular **security review** of the App, backend, and infrastructure.

### 10.2 Encryption of Your Content

Your save files are:

- **Encrypted in transit** with TLS, always, between your PC and the storage provider.
- **Encrypted at rest.** Blobs in Amazon S3 are encrypted with **SSE-S3 (AES-256)**, applied as a bucket-level default so that every object is covered. Blobs in Cloudflare R2 are encrypted at rest by Cloudflare, also with AES-256. The buckets are private — objects are reachable only through time-limited signed URLs, never by public URL.

To be explicit about what this is **not**: Checkpoint64 is **not end-to-end encrypted and not zero-knowledge**. The encryption keys are managed by the storage provider, not by you, and we hold no separate user-held key. This means that we — and, if legally compelled, our storage providers — are technically capable of reading the contents of your save files. We do not do so, except for the automated malware scanning described in Section 2.7. If your threat model requires that no provider can ever read your data, encrypt your saves yourself before backing them up.

No system is perfectly secure, and you have a part to play too — see the [Terms](/terms/) on keeping your password and tokens safe. If we suffer a personal-data breach that is likely to result in a risk to your rights and freedoms, we will notify the ICO within 72 hours and tell you without undue delay where the risk is high.

## 11. Your rights

If you are in the UK or EEA, you have the following rights over your personal data:

- **Right of access** — get a copy of the personal data we hold about you. You can also self-serve this: the App has a built-in **account export** that produces a machine-readable archive of your account data and content.
- **Right to rectification** — correct inaccurate or incomplete data.
- **Right to erasure** ("right to be forgotten") — ask us to delete your data, subject to limited exceptions such as the billing records in Section 9. You can also self-serve this from the App (Section 13).
- **Right to restriction** — ask us to limit how we use your data while a question is being resolved.
- **Right to data portability** — receive a machine-readable copy of the data you provided, and ask us to transfer it to another provider where technically feasible. The account export covers this.
- **Right to object** — object to processing carried out on the basis of legitimate interests, including the website and App analytics described in Sections 2.4 and 2.5.
- **Right to withdraw consent** — where we rely on your consent (for example an optional Discord or Patreon link), withdraw it at any time, without affecting the lawfulness of processing before withdrawal.
- **Right not to be subject to solely automated decision-making** — we do not make decisions about you by solely automated means that produce legal or similarly significant effects. Malware scanning (Section 2.7) can block a specific file from being restored, but it never affects your account status, and you can contact us to have a verdict reviewed by a person.

Exercising these rights is **free**, and we will not treat you differently for doing so.

To exercise any right, email [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com). We will respond within **one month**, extendable by two further months for complex requests (we will tell you within the first month if we need longer). We may need to verify your identity first.

You also have the right to **complain to a data-protection authority**. In the UK that is the [Information Commissioner's Office (ICO)](https://ico.org.uk/make-a-complaint/); in the EEA, the supervisory authority where you live, work, or where the alleged infringement occurred. We would appreciate the chance to put things right first.

## 12. Children

The Service is not directed to children, and we do not knowingly collect personal data from anyone under 16. We do not ask for date of birth, and we do not knowingly profile users by age. If you believe a child has provided us with personal data, contact [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com) and we will delete it.

## 13. Deletion and account closure

You can close your account from the App's settings, or by emailing [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com). The process is:

1. You request deletion. We email you a **confirmation link**, so that a request can't be triggered by someone else with access to an open session.
2. When you confirm, your account is **scheduled for deletion in 7 days**.
3. During those 7 days you can **cancel** — sign in from the App and reverse it. This is the entire grace period: after it expires, deletion is permanent and irreversible.
4. On deletion we permanently erase your account data, your saves and manifests, your namespaces, and your linked-account records. Save-file blobs are reclaimed by the storage sweep described in Section 9.

Two exceptions survive deletion: **billing and accounting records**, retained for 7 years as UK law requires, and **aggregated, anonymised analytics** that contain no identifier for you.

> **Note on a previous version:** this policy previously stated a 180-day post-closure recovery window. That was incorrect — the implemented window has always been **7 days**. If you are relying on being able to change your mind, please do so within 7 days of confirming.

## 14. Changes to this policy

We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top. If the changes are material — a new category of data, a new purpose, or a new processor handling your data — we will tell you by email or in-app notification before they take effect, and ask for your consent where the law requires it.

## 15. Contact and complaints

Privacy questions, data-subject requests, or anything else covered by this policy:

- **Email:** [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com)
- **Security issues:** [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com) — please report suspected vulnerabilities to us before disclosing them publicly.

You can also complain to the [Information Commissioner's Office](https://ico.org.uk/make-a-complaint/) at any time.

## 16. Who we are (controller identity)

The **data controller** responsible for the personal data described in this policy is:

- **Controller:** **Adam Meadows**, a sole trader trading as **Checkpoint64**
- **Country of establishment:** United Kingdom
- **Contact for data-protection matters:** [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com)
- **Postal address:** available on request — email [privacy@checkpoint64.com](mailto:privacy@checkpoint64.com) and we will provide it, for example if you need to serve notice or to give our details to the ICO.

Checkpoint64 is **not a registered company**, and no "Ltd" or "Limited" entity stands behind the Service. It is operated by an individual sole trader, who is the data controller and is personally responsible for the obligations in this policy.

We have not appointed a statutory Data Protection Officer, as we are not required to under Article 37 of the UK GDPR. Data-protection questions go to the email address above and are handled by the operator of the Service.

---

Canonical HTML version: https://checkpoint64.com/privacy/
Last updated: 2026-08-12
Site index for AI assistants: https://checkpoint64.com/llms.txt
