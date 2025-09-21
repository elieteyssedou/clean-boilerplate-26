/**
 * Constants for MockAI service responses used in testing
 * Centralized values to ensure consistency across all tests
 */

// Component Names
export const MOCK_COMPONENT_NAME = 'MockButton';

// Component Codes
export const MOCK_COMPONENT_CODE = '<div className="bg-blue-500 text-white px-4 py-2 rounded">Mock Button</div>';
export const MOCK_COMPONENT_CODE_UPDATED = '<div className="bg-blue-500 text-white px-4 py-2 rounded">Mock Button Updated</div>';

// Descriptions
export const MOCK_COMPONENT_DESCRIPTION = 'A mock button component for testing purposes';
export const MOCK_COMPONENT_DESCRIPTION_UPDATED = 'An updated mock button component for testing iteration functionality';

// Technical Documentation
export const MOCK_TECHNICAL_DOCUMENTATION = `# MockButton Component

A simple button component for testing.

## Props
- label: string - Button label text
- variant: "primary" | "secondary" - Button style variant
- disabled: boolean - Whether the button is disabled

## Usage
\`\`\`jsx
<MockButton label="Click me" variant="primary" disabled={false} />
\`\`\``;

export const MOCK_TECHNICAL_DOCUMENTATION_UPDATED = `# MockButton Component (Updated)

An updated button component for testing iteration.

## Props
- label: string - Button label text
- variant: "primary" | "secondary" - Button style variant
- disabled: boolean - Whether the button is disabled

## Changes
- Updated styling and variant options

## Usage
\`\`\`jsx
<MockButton label="Updated Click Me" variant="secondary" disabled={false} />
\`\`\``;

// Generation Metadata
export const MOCK_GENERATION_METADATA = {
  model: 'claude-sonnet-4-20250514',
  totalTokens: 1000,
  promptTokens: 800,
  completionTokens: 200,
  requestId: 'mock-request-123',
};

export const MOCK_GENERATION_METADATA_UPDATED = {
  model: 'claude-sonnet-4-20250514',
  totalTokens: 1200,
  promptTokens: 900,
  completionTokens: 300,
  requestId: 'mock-conversation-request-123',
};

// Preset Props
export const MOCK_PRESET_PROPS_DEFAULT = {
  label: 'Click Me',
  variant: 'primary',
  disabled: false,
};

export const MOCK_PRESET_PROPS_DISABLED = {
  label: 'Click Me',
  variant: 'primary',
  disabled: true,
};

export const MOCK_PRESET_PROPS_UPDATED = {
  label: 'Updated Click Me',
  variant: 'secondary',
  disabled: false,
};

// Preset Names
export const MOCK_PRESET_NAME_DEFAULT = 'Default';
export const MOCK_PRESET_NAME_DISABLED = 'Disabled';
