import requests

response = requests.post("http://backend:8000/update-tracked-flights")
if response.status_code == 200:
    print("Successfully updated tracked flights.")
else:
    print(
        f"Failed to update tracked flights. Status code: {response.status_code}, Response: {response.text}"
    )
