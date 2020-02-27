select Districts.Id,Districts.Name, Latitude, Longitude 
from Houses
left join Districts on Districts.Id = Houses.District_ID
	where Houses.Id = @str_id