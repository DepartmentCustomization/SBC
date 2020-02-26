

if @PlaceId = 0
begin
select distinct 
N'+ 1' as [AddAppeal]
, Districts.Id as [Район_Id]
,Districts.Name as [Район]
,Places.Id as [Місце_Id] 
,Places.Name as [Місце] 
,Claim_SwitchOff_Address.Claim_ID as [Заявка]
,Claims.Created_at as [Створена]
,Claims.Plan_finish_at as [План виконання]
from Claim_SwitchOff_Address
left join Places on Places.Id = Claim_SwitchOff_Address.Place_ID
left join Districts on Districts.Id = Places.District_ID 
left join Claims on Claims.Id = Claim_SwitchOff_Address.Claim_ID
where Claims.Status_ID in (1,2,3) 
order by Claims.Created_at
end
else 
begin
select distinct 
N'+ 1' as [AddAppeal]
,Districts.Id as [Район_Id]
,Districts.Name as [Район]
,Places.Id as [Місце_Id] 
,Places.Name as [Місце] 
,Claim_SwitchOff_Address.Claim_ID as [Заявка]
,Claims.Created_at as [Створена]
,Claims.Plan_finish_at as [План виконання]
from Claim_SwitchOff_Address
left join Places on Places.Id = Claim_SwitchOff_Address.Place_ID
left join Districts on Districts.Id = Places.District_ID 
left join Claims on Claims.Id = Claim_SwitchOff_Address.Claim_ID
where Claims.Status_ID in (1,2,3) 
and Places.Id = @PlaceId
order by Claims.Created_at
end