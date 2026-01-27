const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function searchFlights(params: {
  origin: string;
  destination: string;
  date: string;
}) {
  // Mapujemy Twoje IATA na klucze, których oczekuje API
  const body = {
    departureCity: params.origin,
    arrivalCity: params.destination,
    departureDate: params.date,
    maxPrice: 10000 // Wysoki limit, bo usunęliśmy kafelek ceny
  };

  const response = await fetch(`${API_BASE_URL}/api/flights/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  if (!response.ok) throw new Error('Failed to search flights');
  return response.json();
}

export async function addToWishlist(flightData: any) {
  const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      flightId: flightData.id || `${flightData.origin}-${flightData.destination}`,
      origin: flightData.origin,
      destination: flightData.destination,
      price: flightData.price,
      date: flightData.date
    }),
  });
  if (!response.ok) throw new Error('Failed to add to wishlist');
  return response.json();
}