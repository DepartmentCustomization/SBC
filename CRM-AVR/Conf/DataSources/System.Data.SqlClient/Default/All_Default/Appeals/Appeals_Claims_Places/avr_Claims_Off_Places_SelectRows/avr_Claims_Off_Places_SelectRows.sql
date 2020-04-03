declare @place_off as nvarchar(max)

set @place_off = left((SELECT rtrim([Place_ID]) + ',' FROM [dbo].[Claim_SwitchOff_Address]where Claim_SwitchOff_Address.Claim_ID = @Id FOR xml path('') ),
					len((SELECT rtrim([Place_ID]) + ',' FROM [dbo].[Claim_SwitchOff_Address]where Claim_SwitchOff_Address.Claim_ID = @Id FOR xml path('')))-1);


declare @querytomysql nvarchar(max)
 set @querytomysql='
SELECT distinct
       [Claims].[Id]
	  ,Status.Name as status_name
	  ,Claim_types.Name as claims_types_name
	  ,Claims.Created_at
	  ,[Claims].[Plan_finish_at]
	  ,[Claims].[Claim_Number]
     
  FROM [dbo].[Claims]
	--left join Appeals on Appeals.Claim_ID = Claims.Id
	left join Status on Status.Id = Claims.Status_ID
	left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
	left join Claim_SwitchOff_Address on Claim_SwitchOff_Address.Claim_ID = Claims.Id
	where Claim_SwitchOff_Address.Place_ID in ('+@place_off+') 
	--and [Claims].[Id] <> @Id
	
'

exec sp_executesql @querytomysql
