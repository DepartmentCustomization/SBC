select
	Organizations.Id
	,Organizations.Short_name
	,(select count(Id) from Claims where Claims.Response_organization_ID = Organizations.Id and Claims.Status_ID <>5
		and not exists (select Id from Claim_SwitchOff_Address where Claim_SwitchOff_Address.Claim_ID = Claims.Id)) as SwitchOff
	,(select count(Id) from Claims where Claims.Response_organization_ID = Organizations.Id and Claims.Status_ID <>5
	and  exists (select Id from Claim_SwitchOff_Address where Claim_SwitchOff_Address.Claim_ID = Claims.Id)) as SwitchOn
from Organizations
where Organizations.Id = @Id