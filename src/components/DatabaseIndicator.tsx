import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Database, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default function DatabaseIndicator() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [details, setDetails] = useState<any>(null);

  const checkConnection = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-e56e4e4c/health`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        setStatus('connected');
        
        // Get detailed status
        const dbTestResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-e56e4e4c/db-test`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (dbTestResponse.ok) {
          const data = await dbTestResponse.json();
          setDetails(data);
        }
      } else {
        setStatus('disconnected');
      }
    } catch (error) {
      setStatus('disconnected');
      console.error('Database connection check failed:', error);
    }
  };

  useEffect(() => {
    checkConnection();
    // Check every 60 seconds
    const interval = setInterval(checkConnection, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4 animate-pulse" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Database Connected';
      case 'disconnected':
        return 'Database Disconnected';
      default:
        return 'Checking Connection...';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg bg-background border shadow-lg cursor-pointer hover:scale-105 transition-transform ${getStatusColor()}`}>
            <Database className="w-4 h-4" />
            {getStatusIcon()}
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{getStatusText()}</p>
            {details && status === 'connected' && (
              <>
                <p className="text-xs text-muted-foreground">
                  Users: {details.userCount || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  KV Store: {details.tests?.kvStore === 'passed' ? '✓' : '✗'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Auth: {details.tests?.auth === 'passed' ? '✓' : '✗'}
                </p>
              </>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Click profile → Database for details
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
