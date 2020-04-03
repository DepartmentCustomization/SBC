select 
	count(Flats.Id)  as count_flats
from Claim_SwitchOff_Address as cso
	join  Claims on cso.Claim_ID = Claims.Id
	join Organizations as org on org.Id = Claims.Response_organization_ID
	join Places on Places.Id = cso.Place_ID
	join Houses on Houses.Id = Places.Street_id
	join Flats on Flats.Houses_ID = Houses.Id
where org.Id = @Id
and Claims.Status_ID <>5