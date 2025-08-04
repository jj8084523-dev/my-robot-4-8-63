import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

interface AccessGateProps {
  requiredLevel: number;
  children: ReactNode;
  fallback?: ReactNode;
}

const AccessGate: React.FC<AccessGateProps> = ({ 
  requiredLevel, 
  children, 
  fallback 
}) => {
  const { getAccessLevel, isAuthenticated } = useAuth();
  const userLevel = getAccessLevel();

  if (userLevel >= requiredLevel) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  // Default fallback based on required level
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-8 text-center">
      <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {requiredLevel <= 2 ? <User size={24} className="text-myrobot-orange" /> : <Lock size={24} className="text-myrobot-orange" />}
      </div>
      <h3 className="text-xl font-semibold text-myrobot-navy mb-2">
        {requiredLevel <= 2 ? 'Basic Registration Required' : 
         requiredLevel <= 4 ? 'Full Account Required' : 'Premium Access Required'}
      </h3>
      <p className="text-myrobot-gray mb-6">
        {requiredLevel <= 2 ? 'Please create a basic account to view this content.' :
         requiredLevel <= 4 ? 'Create a full account to access detailed program information and pricing.' :
         'Register for programs to access this premium content.'}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!isAuthenticated ? (
          <>
            <Link to="/auth/register">
              <Button className="btn-primary">Create Account</Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </>
        ) : (
          <Link to="/programs">
            <Button className="btn-primary">Upgrade Access</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AccessGate;