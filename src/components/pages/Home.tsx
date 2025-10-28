import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { Search, Calendar, Users, TrendingUp, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import ChatbotWidget from '../ChatbotWidget';

export default function Home() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      date: searchData.date,
      passengers: searchData.passengers,
    });
    navigate(`/flights/search?${params.toString()}`);
  };

  const trendingRoutes = [
    { from: 'New York', to: 'London', price: '$489', image: 'https://images.unsplash.com/photo-1517144447511-aebb25bbc5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjE1ODczNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { from: 'San Francisco', to: 'Tokyo', price: '$649', image: 'https://images.unsplash.com/photo-1549654501-5d270e56e92c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMHN1bnNldCUyMHRyYXZlbHxlbnwxfHx8fDE3NjE1NzI3MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { from: 'Los Angeles', to: 'Paris', price: '$529', image: 'https://images.unsplash.com/photo-1586351501894-489e1c20d2cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYXZlbGVyJTIwYWlycG9ydHxlbnwxfHx8fDE3NjE2NDYxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  ];

  const features = [
    { icon: Sparkles, title: 'AI-Powered Search', description: 'Smart recommendations based on your preferences' },
    { icon: TrendingUp, title: 'Fare Prediction', description: 'Know the best time to book with AI insights' },
    { icon: Check, title: 'Price Alerts', description: 'Get notified when prices drop on your routes' },
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Frequent Traveler', quote: 'SkySmart saved me $300 on my last booking!' },
    { name: 'Michael Chen', role: 'Business Consultant', quote: 'The AI chat makes booking so easy and fast.' },
    { name: 'Emma Williams', role: 'Digital Nomad', quote: 'Price alerts are a game-changer for budget travel.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-foreground mb-4">
              Smart Flight Booking with AI
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the best flights with AI-powered fare prediction, instant price alerts, and conversational booking
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="from"
                        placeholder="New York"
                        value={searchData.from}
                        onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="to"
                        placeholder="London"
                        value={searchData.to}
                        onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Departure</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={searchData.date}
                        onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Passengers</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="passengers"
                        type="number"
                        min="1"
                        max="9"
                        value={searchData.passengers}
                        onChange={(e) => setSearchData({ ...searchData, passengers: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Search className="w-4 h-4 mr-2" />
                  Search Flights
                </Button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-muted-foreground mb-2">Or try our AI assistant</p>
                <Button variant="outline" onClick={() => navigate('/chat')}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Chat with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-foreground mb-12">Why Choose SkySmart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Routes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-foreground">Trending Routes</h2>
            <Button variant="ghost" onClick={() => navigate('/flights/search')}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingRoutes.map((route, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full">
                    {route.price}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">From</p>
                      <p className="text-foreground">{route.from}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">To</p>
                      <p className="text-foreground">{route.to}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-foreground mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-4">Ready to Book Smarter?</h2>
          <p className="mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of travelers who save time and money with SkySmart's AI-powered booking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/signup')}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={() => navigate('/chat')}>
              <Sparkles className="w-4 h-4 mr-2" />
              Try AI Chat
            </Button>
          </div>
        </div>
      </section>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
