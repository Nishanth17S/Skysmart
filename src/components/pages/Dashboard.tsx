import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { Plane, Calendar, Bell, TrendingDown, Download, MapPin, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';

export default function Dashboard() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const user = context?.user;

  // Mock data - in real app, fetch from API
  const upcomingFlights = [
    {
      id: '1',
      confirmationCode: 'SKY-ABC123',
      airline: 'Delta Airlines',
      flightNumber: 'DL 123',
      from: 'New York (JFK)',
      to: 'London (LHR)',
      departure: '08:30 AM',
      date: 'Dec 15, 2025',
      status: 'On Time',
      gate: 'A23',
    },
    {
      id: '2',
      confirmationCode: 'SKY-DEF456',
      airline: 'United Airlines',
      flightNumber: 'UA 456',
      from: 'Los Angeles (LAX)',
      to: 'Tokyo (NRT)',
      departure: '10:45 PM',
      date: 'Jan 10, 2026',
      status: 'Scheduled',
      gate: 'TBD',
    },
  ];

  const pastFlights = [
    {
      id: '3',
      confirmationCode: 'SKY-GHI789',
      airline: 'British Airways',
      flightNumber: 'BA 789',
      from: 'London (LHR)',
      to: 'New York (JFK)',
      date: 'Nov 5, 2024',
      status: 'Completed',
    },
  ];

  const activeAlerts = [
    {
      id: '1',
      route: 'New York → Paris',
      targetPrice: 450,
      currentPrice: 520,
      priceChange: -8,
    },
    {
      id: '2',
      route: 'San Francisco → Tokyo',
      targetPrice: 600,
      currentPrice: 580,
      priceChange: -12,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-2">Welcome back, {user?.name || 'Traveler'}!</h1>
          <p className="text-muted-foreground">Manage your flights, alerts, and preferences</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Upcoming Trips</p>
                  <p className="text-foreground">{upcomingFlights.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Plane className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Active Alerts</p>
                  <p className="text-foreground">{activeAlerts.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Total Savings</p>
                  <p className="text-foreground">$230</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          </TabsList>

          {/* Upcoming Trips */}
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {upcomingFlights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Plane className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-foreground">{flight.airline}</p>
                              <p className="text-muted-foreground">{flight.flightNumber}</p>
                            </div>
                          </div>
                          <Badge
                            className={
                              flight.status === 'On Time'
                                ? 'bg-green-600'
                                : 'bg-primary'
                            }
                          >
                            {flight.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-muted-foreground mb-1">From</p>
                            <p className="text-foreground">{flight.from}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">To</p>
                            <p className="text-foreground">{flight.to}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Departure</p>
                            <p className="text-foreground">{flight.departure}</p>
                            <p className="text-muted-foreground">{flight.date}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground mb-1">Gate</p>
                            <p className="text-foreground">{flight.gate}</p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-muted-foreground">
                            Confirmation: <span className="text-foreground">{flight.confirmationCode}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <Button
                          onClick={() => navigate(`/booking/confirmation/${flight.id}`)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          View Details
                        </Button>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download Ticket
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/status')}>
                          <Clock className="w-4 h-4 mr-2" />
                          Track Status
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {upcomingFlights.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Plane className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-foreground mb-2">No upcoming trips</h3>
                    <p className="text-muted-foreground mb-6">
                      Ready to plan your next adventure?
                    </p>
                    <Button onClick={() => navigate('/flights/search')} className="bg-accent hover:bg-accent/90">
                      Search Flights
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Past Trips */}
          <TabsContent value="past">
            <div className="space-y-4">
              {pastFlights.map((flight) => (
                <Card key={flight.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <Plane className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-foreground">{flight.airline} • {flight.flightNumber}</p>
                          <p className="text-muted-foreground">{flight.from} → {flight.to.split('(')[0]}</p>
                          <p className="text-muted-foreground">{flight.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{flight.status}</Badge>
                        <Button variant="outline" size="sm">
                          View Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Price Alerts */}
          <TabsContent value="alerts">
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <Card key={alert.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Bell className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <p className="text-foreground">{alert.route}</p>
                          <p className="text-muted-foreground">
                            Target: ${alert.targetPrice} • Current: ${alert.currentPrice}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {Math.abs(alert.priceChange)}% lower
                        </Badge>
                        <Button variant="outline" onClick={() => navigate('/alerts')}>
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-foreground mb-2">Create a Price Alert</h3>
                  <p className="text-muted-foreground mb-6">
                    Get notified when prices drop on your favorite routes
                  </p>
                  <Button onClick={() => navigate('/alerts')} className="bg-accent hover:bg-accent/90">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Up Alert
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
