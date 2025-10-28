import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Calendar, Plane, MapPin, QrCode, Mail, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  // Mock booking data - in real app, fetch from API
  const booking = {
    id: bookingId,
    confirmationCode: 'SKY-ABC123',
    status: 'Confirmed',
    flight: {
      airline: 'Delta Airlines',
      flightNumber: 'DL 123',
      from: 'New York (JFK)',
      to: 'London (LHR)',
      departure: '08:30 AM',
      arrival: '08:45 PM',
      date: 'Dec 15, 2025',
      duration: '7h 15m',
      terminal: 'Terminal 4',
      gate: 'A23',
    },
    passenger: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
    },
    fareClass: 'Economy',
    seat: '12A',
    baggage: '1 x 23kg checked bag',
    totalPrice: 489,
  };

  const handleDownload = () => {
    // In a real app, this would generate and download PDF
    alert('Downloading e-ticket PDF...');
  };

  const handleShare = () => {
    // In a real app, this would open share dialog
    alert('Share booking details...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-secondary/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your flight to London has been successfully booked
          </p>
          <Badge className="mt-4 bg-green-600">
            Confirmation Code: {booking.confirmationCode}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Download E-Ticket
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <Calendar className="w-4 h-4 mr-2" />
            View in Dashboard
          </Button>
        </div>

        {/* QR Code & Booking Details */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* QR Code */}
              <div className="text-center">
                <div className="w-48 h-48 bg-secondary/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-32 h-32 text-primary" />
                </div>
                <p className="text-muted-foreground">
                  Scan this QR code at the airport for check-in
                </p>
              </div>

              {/* Flight Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-1">Flight</p>
                  <p className="text-foreground">
                    {booking.flight.airline} • {booking.flight.flightNumber}
                  </p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground mb-1">Passenger</p>
                  <p className="text-foreground">{booking.passenger.name}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground mb-1">Class</p>
                    <p className="text-foreground">{booking.fareClass}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Seat</p>
                    <p className="text-foreground">{booking.seat}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground mb-1">Baggage</p>
                  <p className="text-foreground">{booking.baggage}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flight Itinerary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Flight Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Departure */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Plane className="w-6 h-6 text-primary rotate-45" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground">Departure</p>
                  <p className="text-foreground">{booking.flight.departure}</p>
                  <p className="text-muted-foreground">{booking.flight.from}</p>
                  <p className="text-muted-foreground">{booking.flight.date}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <Badge variant="secondary">
                      {booking.flight.terminal}
                    </Badge>
                    <Badge variant="secondary">
                      Gate {booking.flight.gate}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center pl-6">
                <div className="w-px h-12 bg-border"></div>
                <p className="text-muted-foreground ml-4">{booking.flight.duration}</p>
              </div>

              {/* Arrival */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground">Arrival</p>
                  <p className="text-foreground">{booking.flight.arrival}</p>
                  <p className="text-muted-foreground">{booking.flight.to}</p>
                  <p className="text-muted-foreground">{booking.flight.date}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Confirmation Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 text-muted-foreground">
              <Mail className="w-5 h-5" />
              <p>
                We've sent your e-ticket and booking details to{' '}
                <span className="text-foreground">{booking.passenger.email}</span>
              </p>
            </div>
            <p className="text-muted-foreground mt-4">
              Need help? Contact our support team at{' '}
              <a href="/support" className="text-primary hover:underline">
                support@skysmart.com
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="text-foreground mb-3">Important Reminders</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Check-in opens 24 hours before departure</li>
              <li>• Arrive at the airport at least 2 hours before international flights</li>
              <li>• Bring a valid passport and any required visas</li>
              <li>• Review baggage allowances and restrictions</li>
              <li>• Download your airline's mobile app for real-time updates</li>
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">What would you like to do next?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/flights/search')}>
              Book Another Flight
            </Button>
            <Button variant="outline" onClick={() => navigate('/status')}>
              Track Flight Status
            </Button>
            <Button variant="outline" onClick={() => navigate('/alerts')}>
              Set Price Alerts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
