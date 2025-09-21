export enum IntegratedScenario {
  SIMPLE_RESOURCES = 'SIMPLE_RESOURCES',
  MULTI_RESOURCES = 'MULTI_RESOURCES',
}

export interface ScenarioOverrides {
  user?: Partial<{ email: string; displayName: string }>;
  team?: Partial<{ name: string; displayName: string }>;
  resources?: Partial<{ name: string; description: string; content?: string; tags?: string[] }>[];
}

export interface ScenarioResult {
  testToken: string;
  resources: import('@/domain/entities/ExampleResource').default[];
  team: import('@/domain/entities/Team').default;
  user: import('@/domain/entities/User').default;
}
