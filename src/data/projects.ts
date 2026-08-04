import type { ImageMetadata } from 'astro';
import geoProdViz2D from '../assets/images/GeoProdViz2D.png';

export interface Project {
  title: string;
  description: string;
  image: ImageMetadata | string;
  tech: string[];
  websiteUrl: string;
  sourceUrl: string;
}

export const projects: Project[] = [
  {
    title: 'GeoProdViz2D',
    description: 'Interactive 2D geometric product visualizer',
    image: geoProdViz2D,
    tech: ['JavaScript', 'Three.js', 'CSS'],
    websiteUrl: '/GeoProdViz2D/',
    sourceUrl: 'https://github.com/RobinLabryga/GeoProdViz2D',
  },
  {
    title: 'Project Two',
    description: 'Real project will appear here, once I get around to adding them.',
    image: '/assets/project2-placeholder.svg',
    tech: ['Python', 'Torch'],
    websiteUrl: '#',
    sourceUrl: '#',
  },
  {
    title: 'This Website',
    description: '',
    image: '/assets/project3-placeholder.svg',
    tech: ['HTML', 'CSS', 'JavaScript', 'Vibe Coding'],
    websiteUrl: 'https://robinlabryga.github.io/',
    sourceUrl: 'https://github.com/RobinLabryga/robinlabryga.github.io',
  },
];
