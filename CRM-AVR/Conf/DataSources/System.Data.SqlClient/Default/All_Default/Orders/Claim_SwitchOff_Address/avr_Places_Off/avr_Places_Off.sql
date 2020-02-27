SELECT Plac.[Id] as Id
	  ,Districts.Name as district_name
	  ,case when  Plac.Id in (SELECT distinct pl.[Id]
								FROM [dbo].[Places] as pl
								left join Claim_SwitchOff_Address on Claim_SwitchOff_Address.Place_ID = pl.Id
								left join Claims on Claims.Id = Claim_SwitchOff_Address.Claim_ID
								where Claims.Status_ID in (1,2,3) ) 
			then  concat(N'По місту є відкрита заявка № ', (SELECT  
									(select distinct rtrim(Claims.Claim_Number) + N';' as 'data()' 
											from Claim_SwitchOff_Address as a
											left join Claims on Claims.Id = a.Claim_ID 
											where Claims.Status_ID in (1,2,3) and a.Place_ID = b.Place_ID FOR XML PATH('')
									) as tab1
								FROM Claim_SwitchOff_Address as b where b.Place_ID = Plac.Id group by Place_ID)  )
	    else N'' end as status_off
      ,Plac.Name as places_name
      ,Streets.Old_name
	  ,Streets.Territory
  FROM [dbo].[Places] as Plac
	left join Districts on Districts.Id = Plac.District_ID
	left join Houses on Houses.Id = Plac.Street_id
	left join Streets on Streets.Street_Id = Houses.Street_id
	where 
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only



/*
SELECT Plac.[Id] as Id
	  ,Districts.Name as district_name
	  ,case when  Plac.Id in (SELECT distinct pl.[Id]
								FROM [dbo].[Places] as pl
								left join Claim_SwitchOff_Address on Claim_SwitchOff_Address.Place_ID = pl.Id
								left join Claims on Claims.Id = Claim_SwitchOff_Address.Claim_ID
								where Claims.Status_ID in (1,2,3) ) then  concat(N'По місту є відкрита заявка № ', (SELECT  
																(select distinct rtrim(Claims.Claim_Number) + N';' as 'data()' 
																		from Claim_SwitchOff_Address as a
																		left join Claims on Claims.Id = a.Claim_ID 
																		where Claims.Status_ID in (1,2,3) and a.Place_ID = b.Place_ID FOR XML PATH('')
																) as tab1
															FROM Claim_SwitchOff_Address as b where b.Place_ID = Plac.Id group by Place_ID)  )
	    else N'' end as status_off
      ,Plac.Name as places_name
  FROM [dbo].[Places] as Plac
	left join Districts on Districts.Id = Plac.District_ID
	
	where 
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
*/
