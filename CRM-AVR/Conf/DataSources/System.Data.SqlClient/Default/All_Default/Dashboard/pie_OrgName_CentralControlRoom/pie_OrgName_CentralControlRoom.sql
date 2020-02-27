select
	Organizations.Id
	,Organizations.Short_name
	,(select count(Id) from Claims where Claims.Response_organization_ID = Organizations.Id and Claims.Status_ID <>5) as count_claim
	
from Organizations
where Organizations.Id @Org_Id
	and #filter_columns#
		#sort_columns#