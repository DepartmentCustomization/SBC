;with CounClaims (is_on, is_off)
as
(
select 
  ( select Id from Claims where Id not in (select distinct Claim_ID from Claim_SwitchOff_Address ) and Id = c.Id )
  ,( select Id from Claims where Id in (select distinct Claim_ID from Claim_SwitchOff_Address ) and Id = c.Id )
  from Claims  as c
  where Status_ID <> 5
  and Response_organization_ID <> 28
)

select count(is_on) as is_on, count(is_off) as is_off
from CounClaims