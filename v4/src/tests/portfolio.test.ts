import { describe, expect, it } from 'vitest';
import { experiences, filterProjects, projectCategories, projects, workflowNodes } from '../data/portfolio';

describe('portfolio content', () => {
  it('keeps the portfolio filter categories usable', () => {
    expect(projectCategories).toContain('全部');
    expect(filterProjects('全部')).toHaveLength(projects.length);
    expect(filterProjects('AI 應用').every((project) => project.category === 'AI 應用')).toBe(true);
  });

  it('contains the requested AI workflow and technical timeline content', () => {
    expect(workflowNodes.map((node) => node.tool)).toEqual(['ChatGPT', 'Codex', 'Gemini / Antigravity', '人工判斷']);
    expect(experiences.some((item) => item.period === '2024-2026' && item.company.includes('AI Coding'))).toBe(true);
  });

  it('documents private admin work inside the site instead of only linking out', () => {
    const adminProject = projects.find((project) => project.id === 'admin-ui');

    expect(adminProject?.privateNote).toBeTruthy();
    expect(adminProject?.responsibility).toContain('API 回應狀態處理');
  });

  it('turns every project modal into an interview-ready case study', () => {
    projects.forEach((project) => {
      expect(project.background.length).toBeGreaterThan(12);
      expect(project.responsibility.length).toBeGreaterThanOrEqual(3);
      expect(project.challenge.length).toBeGreaterThanOrEqual(3);
      expect(project.solution.length).toBeGreaterThanOrEqual(3);
      expect(project.outcome.length).toBeGreaterThanOrEqual(3);
      expect(project.screenshotChecklist.length).toBeGreaterThanOrEqual(4);
    });
  });
});
