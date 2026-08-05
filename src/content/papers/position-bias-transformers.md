---
title: 'A Structural Theory of Position Bias in Transformers'
authors:
  - name: 'Hanna Herasimchyk'
    url: 'https://geranium12.github.io/'
  - name: 'Robin Labryga'
    url: '/'
  - name: 'Tomislav Prusina'
    url: 'https://tomo61098.github.io/'
  - name: 'Sören Laue'
    url: 'https://laue.ai'
year: 2026
status: ['Research']
keywords:
  - 'Position Bias'
  - 'Transformers'
  - 'Lost-in-the-Middle'
  - 'Attention Rollout'
  - 'Residual Connections'
  - 'Causal Masking'
  - 'Large Language Models'
arxivUrl: 'https://arxiv.org/abs/2602.16837'
---

Transformer models systematically favor certain token positions, yet the architectural origins of this position bias remain poorly understood. This bias is closely connected to the Lost-in-the-Middle phenomenon, where models underutilize information placed in the middle of the context. We show that Lost-in-the-Middle-type behavior can arise from the architecture of causal Transformers itself. To do so, we develop a structural theory of position bias based on residual-aware cumulative attention rollout. At finite depth, causal masking and residual connections induce broad, often U-shaped, influence profiles. At infinite depth, our framework resolves a discrepancy between prior attention-only collapse theory and practical Transformer behavior: residual connections fundamentally change cumulative attention dynamics. Empirically, the predicted profiles closely match measured input-token influence in pretrained language models.
