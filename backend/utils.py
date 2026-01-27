def process_flight_data(raw_flight):
    flights_list = raw_flight.get("flights", [])

    if not flights_list:
        return None

    departure = flights_list[0]
    destination = flights_list[-1]

    transfer_ids = [transfer.get("id") for transfer in raw_flight.get("layovers", [])]

    return {
        "origin_airport": departure["departure_airport"]["name"],
        "origin_code": departure["departure_airport"]["id"],
        "departure_time": departure["departure_airport"]["time"],
        "destination_airport": destination["arrival_airport"]["name"],
        "destination_code": destination["arrival_airport"]["id"],
        "arrival_time": destination["arrival_airport"]["time"],
        "price": raw_flight.get("price"),
        "duration": raw_flight.get("total_duration"),
        "stop_airports": transfer_ids,
    }
