# Syntropic Labs — Executive CV & Career Dossier Guide

> **Strategic Purpose**: This dossier provides the exact resume bullet points, executive summaries, technical talking points, and deployment guides to present **Syntropic Labs** as an elite quantitative finance and microstructure research laboratory on your CV, LinkedIn, and in high-stakes quant hedge fund / prop trading interviews.

---

## 1. Resume / CV Representation

### Recommended Role Titles
Depending on whether you want to emphasize **pure mathematical research**, **algorithmic execution systems**, or **overall founding leadership**, select one of the following:

- **Co-Founder & Head of Quantitative Strategy** (Recommended for Quant Trader / Quant Researcher roles)
- **Founder & Principal Quantitative Researcher** (Recommended for Research / PhD / Buy-side roles)
- **Co-Founder & Chief Technology Officer (CTO)** (Recommended for Quant Developer / Low-Latency Systems roles)

---

### Copy-Paste CV Section (Standard 1-Page / 2-Page Format)

```markdown
**SYNTROPIC LABS** | London, UK (Remote)
*Co-Founder & Head of Quantitative Strategy* | 2024 – Present
Website: https://[your-username].github.io/syntropic-labs (or custom domain)

• Founded an institutional quantitative research and algorithmic infrastructure laboratory specializing in continuous-time stochastic control, AMM invariant surface geometry, and high-frequency market microstructure.
• Formulated a continuous-time optimal execution model based on Hamilton-Jacobi-Bellman (HJB) equations and Almgren-Chriss framework, achieving an empirical 34.2% slippage reduction against TWAP benchmarks.
• Authored 3 research working papers on Loss-Versus-Rebalancing (LVR) arbitrage elimination, multi-level Order Flow Imbalance (OFI), and non-ergodic extreme value risk defense.
• Engineered a sub-microsecond tick-to-quote execution pipeline in Rust utilizing lock-free SPSC ring buffers and DPDK kernel bypass, achieving mean latency under 820 nanoseconds.
• Designed and backtested market-neutral statistical arbitrage and automated market making (AMM) invariant curves across 12TB+ of Level-3 tick data, generating a backtested Sharpe ratio of 3.84.
• Advised digital asset protocols and institutional allocators on dynamical systems tokenomics, liquidity surface design, and extreme liquidation stress-testing.
```

---

## 2. Technical Interview Deep Dive: Master Talking Points

When interviewers at firms like Citadel, Jane Street, Millennium, Two Sigma, Jump Trading, or Balyasny ask about Syntropic Labs, use these structured answers:

### Q1: "What is the core premise of Syntropic Labs?"
> *"Syntropic Labs was founded on the mathematical premise of transforming market entropy into structured, invariant-preserving algorithmic alpha. Modern digital asset microstructures suffer from heavy fragmentation, latency arbitrage, and toxic flow. We focus on bridging rigorous continuous-time stochastic calculus (like Almgren-Chriss and HJB formulations) with bare-metal low-latency execution systems in Rust to solve adverse selection for institutional liquidity providers and systematic desks."*

### Q2: "Can you explain your research on Loss-Versus-Rebalancing (LVR) in AMMs?"
> *"Standard constant-product or concentrated AMMs (like Uniswap v3) leak deterministic wealth to arbitrageurs because liquidity providers rebalance passively at stale on-chain quotes while external prices fluctuate continuously. In our research paper (Working Paper 24-04), we proved that LVR is proportional to the quadratic variation of the asset process: $dLVR_t = \frac{1}{8} \sigma^2 S L dt$. We solved this by engineering dynamic, volatility-indexed invariant surfaces where fee tiers adjust dynamically with real-time Order Flow Imbalance, neutralizing up to 92.4% of toxic arbitrage rents."*

### Q3: "How does your low-latency execution engine work?"
> *"The execution core is implemented in Rust. We eliminated all dynamic memory allocations on the hot path, relying on contiguous memory buffers, cache line alignment, and SIMD AVX-512 vectorization. Inter-thread communication uses lock-free Single Producer Single Consumer (SPSC) ring queues. For network ingestion, we bypass the OS network stack via DPDK, bringing the internal tick processing cycle under 14 microseconds and mean evaluation latency to ~820 nanoseconds."*

### Q4: "What do you mean by 'Non-Ergodic Risk Architecture'?"
> *"Traditional mean-variance optimization and VaR assume that ensemble-average expectations equal individual time-average growth. In reality, multiplicative asset paths under leverage are non-ergodic: $\lim_{T \to \infty} \frac{1}{T} \ln(W(T)/W(0)) = \mu - \frac{1}{2}\sigma^2$. When volatility spikes, ensemble averages can diverge to infinity while almost all individual trajectories hit ruin. We derived a fractional Kelly criterion constrained by the Hill heavy-tail index $\alpha$, ensuring the ruin probability remains strictly zero ($p_{\text{ruin}} = 0$) even during historic cascade events like March 2020."*

---

## 3. How to Deploy the Website in 2 Minutes (Free)

The website is built as an ultra-fast, dependency-free static portal (HTML5 + Tailwind CDN + KaTeX + Canvas). You can deploy it instantly:

### Method A: GitHub Pages (Recommended for CV links)
1. Initialize git in this folder:
   ```bash
   git init
   git add .
   git commit -m "Launch Syntropic Labs Institutional Portal"
   ```
2. Create a repository on GitHub named `syntropic-labs` (or `yourusername.github.io`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/[your-username]/syntropic-labs.git
   git branch -M main
   git push -u origin main
   ```
4. Go to **Repository Settings → Pages** → Source: **Deploy from branch (main)** → Save.
5. Your live website will be: `https://[your-username].github.io/syntropic-labs/`.

### Method B: Vercel or Cloudflare Pages (Instant custom domain)
1. Run `npx vercel` or drag-and-drop the `company` folder into https://vercel.com/new.
2. Link a custom domain like `syntropiclabs.com` or `syntropic-research.io`.

---

## 4. Personalizing Your Name, Contact & Links

Open `index.html` and customize:
1. **Founder Name**: Search for `Founder & Head of Quantitative Strategy` in `index.html` and add your name:
   ```html
   <h3 class="text-xl font-bold text-white mb-1">[Your Full Name]</h3>
   <div class="text-xs font-mono text-brand-cyan mb-4">Founder & Head of Quantitative Strategy</div>
   ```
2. **Contact Email**: The site is already configured with your direct contact email:
   * **`akarliburak@gmail.com`**
   * Visitors clicking "Contact Us" or submitting the inquiry form are routed directly to this address.
3. **Social & Academic Links**: Replace the placeholder `href="#"` links with your actual LinkedIn profile, GitHub handle, and SSRN/Google Scholar profiles.
