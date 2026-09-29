/**
 * Syntropic Labs — Core Application Controller
 * Handles modal workflows, paper preview rendering, tab switching,
 * and contact inquiry handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // Infrastructure Architecture Tabs
  const tabButtons = document.querySelectorAll('.infra-tab-btn');
  const tabContents = document.querySelectorAll('.infra-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button styles
      tabButtons.forEach(b => {
        b.classList.remove('bg-cyan-500/10', 'text-cyan-400', 'border-cyan-400/40');
        b.classList.add('text-slate-400', 'border-transparent');
      });
      btn.classList.add('bg-cyan-500/10', 'text-cyan-400', 'border-cyan-400/40');
      btn.classList.remove('text-slate-400', 'border-transparent');

      // Update content panes
      tabContents.forEach(pane => {
        if (pane.id === targetTab) {
          pane.classList.remove('hidden');
        } else {
          pane.classList.add('hidden');
        }
      });
    });
  });

  // Modal Management
  const modalOverlay = document.getElementById('modalOverlay');
  const contactModal = document.getElementById('contactModal') || document.getElementById('dueDiligenceModal');
  const paperModal = document.getElementById('paperModal');

  function openModal(modalEl) {
    if (!modalOverlay || !modalEl) return;
    modalOverlay.classList.remove('hidden');
    // Force reflow
    void modalOverlay.offsetWidth;
    modalOverlay.classList.add('active');
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalOverlay.classList.add('hidden');
      if (contactModal) contactModal.classList.add('hidden');
      if (paperModal) paperModal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 200);
  }

  // Close triggers
  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Contact Modal Triggers
  document.querySelectorAll('.trigger-contact, .trigger-due-diligence').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(contactModal);
    });
  });

  // Paper Details Modal Data & Handlers
  const papersData = {
    'paper-amm': {
      title: 'Invariant Surface Dynamics in Concentrated Liquidity: Eliminating Loss-Versus-Rebalancing in Non-Linear AMMs',
      authors: 'Syntropic Research Group (Lead: Co-Founder & Quantitative Research Director)',
      date: 'June 2024 · SSRN / Quantitative Finance [q-fin.TR]',
      tags: ['Concentrated Liquidity', 'HJB Equations', 'LVR Arbitrage', 'Optimal Control'],
      abstract: `This paper introduces a continuous-time stochastic control framework for automated market makers (AMMs) operating on non-linear bonding invariant surfaces. We formalize the Loss-Versus-Rebalancing (LVR) metric as a stochastic integral of pool volatility and derive an optimal dynamic fee schedule γ*(t, σ) that proves mathematically sufficient to neutralize toxic latency arbitrage. By mapping the pool reserve state space to a Riemannian manifold with metric tensor g_ij, we establish closed-form solutions for impermanent loss bounds under jump-diffusion price processes. Empirical backtesting across 1.2M historical high-frequency ticks demonstrates a 41.8% reduction in LVR-induced inventory decay compared to standard static Uniswap v3 fee tiers.`,
      equations: [
        'dL_t = -\\frac{1}{2} \\sigma_t^2 S_t \\sqrt{\\frac{L_t}{S_t}} dt + \\gamma^*(t) dV_{t}^{retail}',
        '\\mathcal{H}(q, \\theta, \\nabla V) = \\sup_{v \\in \\mathcal{A}} \\left\\{ v \\cdot (\\Delta P - \\kappa v) + \\mathcal{L}V(q) \\right\\} = 0'
      ],
      link: 'research/whitepaper-amm-invariants.html'
    },
    'paper-orderflow': {
      title: 'High-Frequency Order Flow Imbalance and Cross-Venue Price Discovery in Fragmented Crypto Microstructures',
      authors: 'Syntropic Quantitative Research Labs',
      date: 'October 2024 · Working Paper Series No. 24-08',
      tags: ['Order Flow Imbalance', 'VPIN', 'Microstructure Alpha', 'Lead-Lag Econometrics'],
      abstract: `We investigate the predictive capacity of tick-by-tick Order Flow Imbalance (OFI) across fragmented centralized and decentralized digital asset venues. Using normalized multi-level limit order book snapshots recorded at microsecond granularity across Binance, Coinbase, and automated liquidity pools, we demonstrate that cross-venue OFI explains up to 64.2% of short-horizon (100ms - 5s) price innovation. We introduce an asymmetric kernel estimator for Volume-Synchronized Probability of Toxicity (VPIN) that isolates informed directional institutional flow from high-frequency quoting noise, enabling an algorithmic execution engine to cut adverse selection costs by 22.4 bps on average.`,
      equations: [
        'OFI_k(t) = I_{\\{\\Delta P_t \\ge 0\\}} \\Delta q_t^b - I_{\\{\\Delta P_t \\le 0\\}} \\Delta q_t^a',
        '\\Delta S_{t+\\tau} = \\alpha + \\sum_{m=1}^{M} \\beta_m OFI_m(t) + \\lambda \\cdot \\text{VPIN}_t + \\epsilon_t'
      ],
      link: 'research/whitepaper-order-flow-microstructure.html'
    },
    'paper-ergodic': {
      title: 'Non-Ergodic Risk Architecture: Continuous-Time Tail-Risk Hedging and Capital Growth Under Heavy Tails',
      authors: 'Syntropic Labs Risk Engineering & Mathematical Physics Team',
      date: 'January 2025 · Preprint [math.PR, q-fin.RM]',
      tags: ['Ergodicity Economics', 'Extreme Value Theory', 'Pareto Tail Hedging', 'Kelly Criterion'],
      abstract: `Traditional quantitative risk frameworks rely on ensemble-average ergodicity assumptions that fail catastrophically during liquidation cascades and structural liquidity blackouts. In this paper, we construct a time-average growth optimization model based on ergodicity economics and the Hill heavy-tail estimator (α < 2). We derive a dynamic fractional Kelly allocation matrix with continuous CVaR constraints that prevents absorbing barrier ruin states (p_ruin = 0). Numerical stress simulations modeled on March 2020 and November 2022 market shocks confirm that the syntropic non-ergodic filter preserves 98.7% of maximum cumulative portfolio equity while conventional mean-variance portfolios suffer 68%+ drawdowns.`,
      equations: [
        '\\langle g \\rangle_t = \\lim_{T \\to \\infty} \\frac{1}{T} \\int_0^T \\ln \\left( \\frac{W(t)}{W(0)} \\right) dt \\neq \\mathbb{E}\\left[ \\frac{dW_t}{W_t} \\right]',
        'f^* = \\arg\\max_f \\left\\{ \\mathbb{E}[\\ln(1 + f \\cdot R)] \\right\\} \\quad \\text{s.t.} \\quad \\mathbb{P}(W_t < W_{crit}) = 0'
      ],
      link: 'research/whitepaper-ergodic-risk.html'
    }
  };

  document.querySelectorAll('.trigger-paper-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const paperKey = btn.getAttribute('data-paper');
      const data = papersData[paperKey];
      if (!data) return;

      const titleEl = document.getElementById('modalPaperTitle');
      const metaEl = document.getElementById('modalPaperMeta');
      const abstractEl = document.getElementById('modalPaperAbstract');
      const tagsEl = document.getElementById('modalPaperTags');
      const formulasEl = document.getElementById('modalPaperFormulas');
      const fullLinkEl = document.getElementById('modalPaperFullLink');

      if (titleEl) titleEl.textContent = data.title;
      if (metaEl) metaEl.textContent = `${data.authors} · ${data.date}`;
      if (abstractEl) abstractEl.textContent = data.abstract;
      if (fullLinkEl) fullLinkEl.setAttribute('href', data.link);

      if (tagsEl) {
        tagsEl.innerHTML = data.tags.map(t => 
          `<span class="px-2.5 py-1 text-xs font-mono rounded bg-slate-800 text-cyan-400 border border-cyan-500/20">${t}</span>`
        ).join('');
      }

      if (formulasEl) {
        formulasEl.innerHTML = data.equations.map(eq => 
          `<div class="p-3 bg-black/40 rounded border border-white/5 font-mono text-sm text-cyan-300 overflow-x-auto">$$${eq}$$</div>`
        ).join('');
      }

      openModal(paperModal);

      // Re-trigger KaTeX rendering if available
      if (window.renderMathInElement) {
        renderMathInElement(formulasEl, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ]
        });
      }
    });
  });

  // Contact Form submission handler
  const contactForm = document.getElementById('contactForm') || document.getElementById('dueDiligenceForm');
  const contactSuccessState = document.getElementById('contactSuccessState') || document.getElementById('formSuccessState');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather form inputs
      const name = document.getElementById('contactName')?.value || 'Inquirer';
      const email = document.getElementById('contactEmail')?.value || 'Not provided';
      const subject = document.getElementById('contactSubject')?.value || 'Syntropic Labs Inquiry';
      const message = document.getElementById('contactMessage')?.value || '';

      // Prepare mailto link to akarliburak@gmail.com
      const recipient = 'akarliburak@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Syntropic Labs] ${subject}`);
      const mailtoBody = encodeURIComponent(
        `Dear Syntropic Labs Team,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
      );

      // Trigger user's mail client
      window.location.href = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Show success state in UI
      contactForm.classList.add('hidden');
      if (contactSuccessState) {
        contactSuccessState.classList.remove('hidden');
      }

      // Reset after 4 seconds
      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          contactForm.reset();
          contactForm.classList.remove('hidden');
          if (contactSuccessState) contactSuccessState.classList.add('hidden');
        }, 500);
      }, 4000);
    });
  }

  // Render mathematical notation on initial page load if KaTeX is loaded
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }
});
