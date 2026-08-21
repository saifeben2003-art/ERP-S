'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center dark:bg-[#0e1019] bg-slate-50 p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold dark:text-slate-100 text-slate-900">
                Something went wrong
              </h2>
              <p className="text-sm dark:text-slate-400 text-slate-500">
                An unexpected error occurred. Please try again.
              </p>
              {this.state.error && (
                <p className="text-xs dark:text-red-400/70 text-red-500/70 font-mono bg-red-500/5 rounded-lg p-3 mt-3 text-left break-all">
                  {this.state.error.message}
                </p>
              )}
            </div>
            <Button
              onClick={this.handleRetry}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium"
            >
              <RefreshCw className="h-4 w-4 ml-2" />
              Try Again
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
