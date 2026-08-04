---
title: 'Multi-Label Plant Species Prediction with Metadata-Enhanced Multi-Head Vision Transformers'
authors:
  - name: 'Hanna Herasimchyk'
    url: 'https://geranium12.github.io/'
  - name: 'Robin Labryga'
    url: '/'
  - name: 'Tomislav Prusina'
    url: 'https://tomo61098.github.io/'
year: 2025
status: ['Research', 'Kaggle']
keywords:
  - 'Multi-Label Classification'
  - 'DINOv2'
  - 'Vision Transformer'
  - 'Species Identification'
  - 'Vegetation Plot Images'
  - 'Biodiversity'
  - 'PlantCLEF'
arxivUrl: 'https://arxiv.org/abs/2508.10457'
---

We present a multi-head vision transformer approach for multi-label plant species prediction in vegetation plot images, addressing the PlantCLEF 2025 challenge. The task involves training models on single-species plant images while testing on multi-species quadrat images, creating a drastic domain shift. Our methodology leverages a pre-trained DINOv2 Vision Transformer Base (ViT-B/14) backbone with multiple classification heads for species, genus, and family prediction, utilizing taxonomic hierarchies. Key contributions include multi-scale tiling to capture plants at different scales, dynamic threshold optimization based on mean prediction length, and ensemble strategies through bagging and Hydra model architectures. The approach incorporates various inference techniques including image cropping to remove non-plant artifacts, top-n filtering for prediction constraints, and logit thresholding strategies. Experiments were conducted on approximately 1.4 million training images covering 7,806 plant species. Results demonstrate strong performance, making our submission 3rd best on the private leaderboard.
