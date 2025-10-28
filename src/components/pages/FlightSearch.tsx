import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plane, Clock, Calendar, TrendingDown, TrendingUp, Filter, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Flight {
  id: string;
  airline: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  aiScore: number;
  priceChange: number;
}

export default function FlightSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('recommended');
  const [maxPrice, setMaxPrice] = useState([1000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [stopsFilter, setStopsFilter] = useState<string[]>([]);

  // Mock flight data
  const flights: Flight[] = [
    {
      id: '1',
      airline: 'Delta Airlines',
      from: searchParams.get('from') || 'New York',
      to: searchParams.get('to') || 'London',
      departure: '08:30 AM',
      arrival: '08:45 PM',
      duration: '7h 15m',
      price: 489,
      stops: 0,
      aiScore: 95,
      priceChange: -12,
    },
    {
      id: '2',
      airline: 'United Airlines',
      from: searchParams.get('from') || 'New York',
      to: searchParams.get('to') || 'London',
      departure: '11:00 AM',
      arrival: '11:30 PM',
      duration: '7h 30m',
      price: 525,
      stops: 0,
      aiScore: 88,
      priceChange: 5,
    },
    {
      id: '3',
      airline: 'British Airways',
      from: searchParams.get('from') || 'New York',
      to: searchParams.get('to') || 'London',
      departure: '06:00 PM',
      arrival: '06:15 AM',
      duration: '7h 15m',
      price: 459,
      stops: 0,
      aiScore: 92,
      priceChange: -8,
    },
    {
      id: '4',
      airline: 'American Airlines',
      from: searchParams.get('from') || 'New York',
      to: searchParams.get('to') || 'London',
      departure: '03:30 PM',
      arrival: '03:45 AM',
      duration: '8h 15m',
      price: 399,
      stops: 1,
      aiScore: 78,
      priceChange: -15,
    },
  ];

  // Mock price trend data
  const priceTrend = [
    { date: 'Mon', price: 520 },
    { date: 'Tue', price: 495 },
    { date: 'Wed', price: 510 },
    { date: 'Thu', price: 489 },
    { date: 'Fri', price: 505 },
    { date: 'Sat', price: 475 },
    { date: 'Sun', price: 490 },
  ];

  const filteredFlights = flights.filter(flight => {
    if (flight.price > maxPrice[0]) return false;
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;
    if (stopsFilter.length > 0) {
      if (stopsFilter.includes('nonstop') && flight.stops !== 0) return false;
      if (stopsFilter.includes('1stop') && flight.stops !== 1) return false;
    }
    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    if (sortBy === 'recommended') return b.aiScore - a.aiScore;
    return 0;
  });

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-foreground mb-2">
            {searchParams.get('from')} → {searchParams.get('to')}
          </h1>
          <p className="text-muted-foreground">
            {searchParams.get('date')} · {searchParams.get('passengers')} passenger(s)
          </p>
        </div>

        {/* AI Insights */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground mb-2">AI Recommendation</h3>
                <p className="text-muted-foreground mb-4">
                  Prices are 12% lower than usual for this route. Book soon for the best deals!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground mb-2">Price Trend (Last 7 Days)</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={priceTrend}>
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis hide />
                        <Tooltip />
                        <Line type="monotone" dataKey="price" stroke="#007ACC" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center">
                    <Button className="bg-accent hover:bg-accent/90">
                      <Bell className="w-4 h-4 mr-2" />
                      Set Price Alert
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-foreground">Filters</h3>
                  <Button variant="ghost" size="sm">Reset</Button>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <Label className="mb-2 block">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price">Lowest Price</SelectItem>
                      <SelectItem value="duration">Shortest Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="mb-2 block">Max Price: ${maxPrice[0]}</Label>
                  <Slider
                    value={maxPrice}
                    onValueChange={setMaxPrice}
                    max={1000}
                    min={0}
                    step={50}
                    className="mb-2"
                  />
                </div>

                {/* Stops */}
                <div className="mb-6">
                  <Label className="mb-2 block">Stops</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="nonstop"
                        checked={stopsFilter.includes('nonstop')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStopsFilter([...stopsFilter, 'nonstop']);
                          } else {
                            setStopsFilter(stopsFilter.filter(s => s !== 'nonstop'));
                          }
                        }}
                      />
                      <label htmlFor="nonstop" className="text-foreground cursor-pointer">
                        Non-stop
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="1stop"
                        checked={stopsFilter.includes('1stop')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStopsFilter([...stopsFilter, '1stop']);
                          } else {
                            setStopsFilter(stopsFilter.filter(s => s !== '1stop'));
                          }
                        }}
                      />
                      <label htmlFor="1stop" className="text-foreground cursor-pointer">
                        1 Stop
                      </label>
                    </div>
                  </div>
                </div>

                {/* Airlines */}
                <div className="mb-6">
                  <Label className="mb-2 block">Airlines</Label>
                  <div className="space-y-2">
                    {['Delta Airlines', 'United Airlines', 'British Airways', 'American Airlines'].map((airline) => (
                      <div key={airline} className="flex items-center space-x-2">
                        <Checkbox
                          id={airline}
                          checked={selectedAirlines.includes(airline)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAirlines([...selectedAirlines, airline]);
                            } else {
                              setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                            }
                          }}
                        />
                        <label htmlFor={airline} className="text-foreground cursor-pointer">
                          {airline}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                {sortedFlights.length} flights found
              </p>
            </div>

            {sortedFlights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Plane className="w-5 h-5 text-primary" />
                          <span className="text-foreground">{flight.airline}</span>
                          {flight.aiScore >= 90 && (
                            <Badge className="bg-primary">AI Top Pick</Badge>
                          )}
                        </div>
                        {flight.priceChange < 0 && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            {Math.abs(flight.priceChange)}% off
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-muted-foreground">Departure</p>
                          <p className="text-foreground">{flight.departure}</p>
                          <p className="text-muted-foreground">{flight.from}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">{flight.duration}</p>
                          <div className="flex items-center justify-center my-2">
                            <div className="h-px bg-border flex-1"></div>
                            <Plane className="w-4 h-4 mx-2 text-muted-foreground" />
                            <div className="h-px bg-border flex-1"></div>
                          </div>
                          <p className="text-muted-foreground">
                            {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Arrival</p>
                          <p className="text-foreground">{flight.arrival}</p>
                          <p className="text-muted-foreground">{flight.to}</p>
                        </div>
                      </div>
                    </div>

                    <div className="md:border-l md:pl-6 flex flex-col items-end space-y-2">
                      <div className="text-right">
                        <p className="text-muted-foreground">From</p>
                        <p className="text-foreground">${flight.price}</p>
                      </div>
                      <Button
                        onClick={() => navigate(`/flights/details/${flight.id}`)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
