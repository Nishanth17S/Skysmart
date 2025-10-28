import { useNavigate } from 'react-router-dom';
import { Home, Search, Plane } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/20 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-foreground mb-2">404 - Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Oops! Looks like this flight route doesn't exist. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button variant="outline" onClick={() => navigate('/flights/search')}>
              <Search className="w-4 h-4 mr-2" />
              Search Flights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
