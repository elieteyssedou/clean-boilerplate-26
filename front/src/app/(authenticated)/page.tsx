'use client';

import {
  Button,
  Card,
  CardBody,
} from '@heroui/react';
import { useUser } from '@stackframe/stack';
import Link from 'next/link';
import Icon from '@/app/_design/Icon';

export default function DashboardPage() {
  const user = useUser();

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
            Welcome to Clean Boilerplate
            {user?.displayName && (
              <span className="text-slate-600 dark:text-slate-400">, {user.displayName}!</span>
            )}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            A clean architecture boilerplate for AI-powered SaaS applications
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Resources */}
          <Card className="hover:shadow-soft-lg transition-all duration-200 cursor-pointer">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Icon icon="document-text" size="s" className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  Example Resources
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Manage your example resources with full CRUD operations and AI content generation.
              </p>
              <Button
                as={Link}
                href="/resources"
                size="sm"
                variant="flat"
                color="primary"
                className="w-full"
              >
                View Resources
              </Button>
            </CardBody>
          </Card>

          {/* AI Integration */}
          <Card className="hover:shadow-soft-lg transition-all duration-200">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Icon icon="cpu-chip" size="s" className="text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  AI Integration
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Built-in AI service with conversation management and content generation capabilities.
              </p>
              <Button
                size="sm"
                variant="flat"
                color="secondary"
                className="w-full"
                isDisabled
              >
                Coming Soon
              </Button>
            </CardBody>
          </Card>

          {/* File Upload */}
          <Card className="hover:shadow-soft-lg transition-all duration-200">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Icon icon="cloud-arrow-up" size="s" className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  File Upload
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                S3-based file upload system with team-based access control and presigned URLs.
              </p>
              <Button
                size="sm"
                variant="flat"
                color="success"
                className="w-full"
                isDisabled
              >
                Coming Soon
              </Button>
            </CardBody>
          </Card>

          {/* Clean Architecture */}
          <Card className="hover:shadow-soft-lg transition-all duration-200">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Icon icon="building-library" size="s" className="text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  Clean Architecture
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Domain-driven design with clear separation of concerns and dependency injection.
              </p>
              <Button
                as={Link}
                href="https://github.com/anthropics/claude-code"
                target="_blank"
                size="sm"
                variant="flat"
                color="warning"
                className="w-full"
              >
                Learn More
              </Button>
            </CardBody>
          </Card>

          {/* GraphQL API */}
          <Card className="hover:shadow-soft-lg transition-all duration-200">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <Icon icon="code-bracket" size="s" className="text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  GraphQL API
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Type-safe GraphQL API with auto-generated client types and Apollo integration.
              </p>
              <Button
                as={Link}
                href="/graphql"
                target="_blank"
                size="sm"
                variant="flat"
                color="secondary"
                className="w-full"
              >
                Explore API
              </Button>
            </CardBody>
          </Card>

          {/* Team Management */}
          <Card className="hover:shadow-soft-lg transition-all duration-200">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                  <Icon icon="user-group" size="s" className="text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                  Team Management
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Multi-tenant architecture with team-based access control and user management.
              </p>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                className="w-full"
                isDisabled
              >
                Managed by Stack Auth
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-6">
            Quick Actions
          </h2>
          <div className="flex justify-center gap-4">
            <Button
              as={Link}
              href="/resources/new"
              color="primary"
              variant="shadow"
              startContent={<Icon icon="plus" size="xs" />}
            >
              Create Resource
            </Button>
            <Button
              variant="flat"
              color="secondary"
              startContent={<Icon icon="document" size="xs" />}
              isDisabled
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}