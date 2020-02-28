select 
	count(cso.Id) as count_houses
from Claim_SwitchOff_Address as cso
	join  Claims on cso.Claim_ID = Claims.Id
	join Organizations as org on org.Id = Claims.Response_organization_ID
where org.Id = @Id
and Claims.Status_ID <>5