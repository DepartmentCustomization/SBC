SELECT swOff.[Id]
      ,concat([Places].[Name],case when count(Flats.Number) = 0 or Places.Place_type_ID in (19) then ''-- 'квартири відсутні' 
		else concat(', (кількість квартир: ' , count(Flats.Number),')') end ) as places_name
	-- ,[Places].[Name] as places_name
	  ,SwitchOff_types.Name as switchoff_type_name
      ,swOff.[Claim_ID]
      ,swOff.[SwitchOff_start]
      ,swOff.[SwitchOff_finish]
  FROM [dbo].[Claim_SwitchOff_Address] as swOff
		left join Claims on Claims.Id = swOff.Claim_ID
		left join Places on Places.Id = swOff.Place_ID
		left join SwitchOff_types on SwitchOff_types.Id = swOff.SwitchOff_type_id
		left join Houses on Houses.Id = Places.Relation_obj_ID
		left join Flats on Flats.Houses_ID = Houses.Id
	WHERE swOff.[Claim_ID]= @Id
	and 
	 #filter_columns#
	group by swOff.Id, SwitchOff_types.Name, swOff.[Claim_ID],swOff.[SwitchOff_start],swOff.[SwitchOff_finish], Places.Name, Places.Place_type_ID
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only