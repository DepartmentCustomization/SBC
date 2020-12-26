SELECT Id,
status_name
	   ,claim_types_name
	   ,Created_at
	   ,Plan_finish_at
	   ,Claim_Number
from (
SELECT distinct
	   Claims.Id
	   ,Status.Id status_Id
	   ,Status.Name as status_name
	   ,Claim_types.Name as claim_types_name
	   ,convert(nvarchar(20), Claims.Created_at, 109) as Created_at
	   ,convert(nvarchar(20), Claims.Plan_finish_at, 109) as Plan_finish_at
	   ,concat('Заявка № ', Claims.Claim_Number) as Claim_Number
  FROM Claims
	left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
	left join Status on Status.Id = Claims.Status_ID
	left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
	left join Places on Places.Id = Claim_Order_Places.Place_ID
	where Places.Id = @Id
) t
	order by status_Id
offset @pageOffsetRows rows fetch next @pageLimitRows rows only