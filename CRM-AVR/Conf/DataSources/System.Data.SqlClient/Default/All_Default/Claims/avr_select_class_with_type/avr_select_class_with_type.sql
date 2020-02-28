select 
--cc.Id ,
cc.Name 
from Claim_types ct
left join  Claim_classes cc on cc.Id = ct.Claim_class_ID
	where  ct.Id = @types_id

return;