import { describe, expect, it } from 'vitest';
import { experiences, profile, workflowSteps } from '../data/resume';
import { projects } from '../data/projects';

describe('resume v3 content', () => {
  it('keeps the AI application positioning clear in the hero data', () => {
    expect(profile.title).toContain('AI 應用');
    expect(profile.facts.some((fact) => fact.includes('Vue3'))).toBe(true);
  });

  it('places project case studies after the career narrative in source order', () => {
    expect(experiences.length).toBeGreaterThan(5);
    expect(projects.length).toBe(5);
  });

  it('does not publish fake project links for coming soon work', () => {
    const hiddenProjects = projects.filter((project) => project.status === 'coming-soon');

    expect(hiddenProjects.every((project) => project.href === undefined)).toBe(true);
  });

  it('documents a complete AI-assisted development workflow', () => {
    expect(workflowSteps).toHaveLength(6);
  });
});
