SELECT [Places].[Id]
	 
      ,concat([Places].[Name],case when count(Flats.Number) = 0 or Places.Place_type_ID in (19)  then ''-- 'квартири відсутні' 
		else concat(', (кількість квартир: ' , count(Flats.Number),')') end ) as places
	   ,Districts.Name as districts
	  ,Place_types.Name as type_places
	,case when count(Flats.Number) = 0 or Places.Place_type_ID in (19)  then 'квартири відсутні' 
		else concat('Кількість квартир: ' , count(Flats.Number)) end as flats
	  ,Streets.Old_name
	  ,Streets.Territory
	  ,(select 'Відкриті заявки:' + ( SELECT 
			distinct rtrim(Claims.Claim_Number) + N';' as 'data()' 
			FROM Claims
				left join Claim_Order_Places as cop on cop.Claim_ID = Claims.Id
				--left join Places as pl on pl.Id = cop.Place_ID
				WHERE Claims.Status_ID in (1,2,3)
				and cop.Place_ID = Places.Id
  				FOR XML PATH('')
	  ) ) as open_claims
  FROM [dbo].[Places]
	left join Districts on Districts.Id = Places.District_ID
	left join Houses on Houses.Id = Places.Street_id
	left join Streets on Streets.Street_Id = Houses.Street_id
	left join Place_types on Place_types.Id = Places.Place_type_ID
	left join Flats on Flats.Houses_ID = Houses.Id
where
	 #filter_columns#

group by Places.Id, Districts.Name, [Places].[Name], Place_types.Name, Places.Place_type_ID, Old_name, Territory
#sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
 




/*SELECT [Places].[Id]
	  ,Districts.Name as districts
      ,concat([Places].[Name],case when count(Flats.Number) = 0 or Places.Place_type_ID in (19)  then ''-- 'квартири відсутні' 
		else concat(', (кількість квартир: ' , count(Flats.Number),')') end ) as places
	  ,Place_types.Name as type_places
	,case when count(Flats.Number) = 0 or Places.Place_type_ID in (19)  then 'квартири відсутні' 
		else concat('Кількість квартир: ' , count(Flats.Number)) end as flats
  FROM [dbo].[Places]
	left join Districts on Districts.Id = Places.District_ID
	left join Houses on Houses.Id = Places.Street_id
	left join Place_types on Place_types.Id = Places.Place_type_ID
	
	--left join Houses on Houses.Id = places.Relation_obj_ID
	left join Flats on Flats.Houses_ID = Houses.Id
where
	 #filter_columns#

group by Places.Id, Districts.Name, [Places].[Name], Place_types.Name, Places.Place_type_ID
#sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
 */