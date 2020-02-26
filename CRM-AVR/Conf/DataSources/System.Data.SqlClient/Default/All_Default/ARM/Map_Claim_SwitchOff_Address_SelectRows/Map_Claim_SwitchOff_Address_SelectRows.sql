--declare @Adress nvarchar(250) = N'%'


select distinct 
Districts.Id as [District_id]
,Districts.Name as [District]
,Places.Id as [Place_Id] 
,Places.Name as [Place] 
,Claim_SwitchOff_Address.Claim_ID as [Claim]
,Claims.Created_at as [Create_Date]
,Claims.Plan_finish_at as [Finish_Date]
,Places.Lattitude
,Places.Longitude
,Claims.[Claim_type_ID] as Claim_types_Id
,Claim_types.[Full_Name] as Claim_type_Name
,Organizations.[Short_name] as Org_Short_name
from Claim_SwitchOff_Address
left join Places on Places.Id = Claim_SwitchOff_Address.Place_ID
left join Districts on Districts.Id = Places.District_ID 
left join Claims on Claims.Id = Claim_SwitchOff_Address.Claim_ID
left join [dbo].[Claim_types] on [Claim_types].Id = Claims.[Claim_type_ID]
left join [dbo].[Organizations] on [Organizations].Id = Claims.[Response_organization_ID]
where Claims.Status_ID in (1,2,3) 
and Places.Name like '%'+replace(@Adress,' ','%')+'%'
and Places.Lattitude is not null and Places.Longitude is not null
-- and Places.Lattitude not in (0) and Places.Longitude not in (0) 
order by Claims.Created_at
