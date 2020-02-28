if N'#filter_columns#' <> N'(1 = 1)'
begin

	SELECT [Places].[Id]
		  ,Districts.Name as districts
		  ,[Places].[Name] as places_name
		  ,Place_types.Name as type_places
		  ,case when count(Flats.Number) = 0 or Places.Place_type_ID in (19)  then 'квартири відсутні' 
			else concat('Кількість квартир: ' , count(Flats.Number)) end as flats
		  ,Streets.Old_name
		  ,Streets.Territory
		  ,1 as sort
		  ,(select case when count(Id) > 0 then 'Відключен' end  
		    from Claim_SwitchOff_Address as csw where csw.Place_ID = Places.Id and csw.SwitchOff_finish is null) as is_swich
	  FROM [dbo].[Places]
		left join Districts on Districts.Id = Places.District_ID
		left join Houses on Houses.Id = Places.Street_id
		left join Streets on Streets.Street_Id = Houses.Street_id
		left join Place_types on Place_types.Id = Places.Place_type_ID
		left join Flats on Flats.Houses_ID = Houses.Id
		where  Place_types.Id in (11, 12,14,15,16,17,18)
-- 		and Places.Street_id in (select Id from Houses where Street_id = @str_id	) or Places.Street_id is null
and #filter_columns#

	group by Places.Id, Districts.Name, [Places].[Name], Place_types.Name, Places.Place_type_ID, Old_name, Territory
order by sort, places_name
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end
else 
begin

	SELECT [Places].[Id]
		  ,Districts.Name as districts
		  ,[Places].[Name] as places_name
		  ,Place_types.Name as type_places
		  ,case when count(Flats.Number) = 0 or Places.Place_type_ID in (19)  then 'квартири відсутні' 
			else concat('Кількість квартир: ' , count(Flats.Number)) end as flats
		  ,Streets.Old_name
		  ,Streets.Territory
		  ,1 as sort
		  ,(select case when count(Id) > 0 then 'Відключен' end  
		    from Claim_SwitchOff_Address as csw where csw.Place_ID = Places.Id and csw.SwitchOff_finish is null) as is_swich
	  FROM [dbo].[Places]
		left join Districts on Districts.Id = Places.District_ID
		left join Houses on Houses.Id = Places.Street_id
		left join Streets on Streets.Street_Id = Houses.Street_id
		left join Place_types on Place_types.Id = Places.Place_type_ID
		left join Flats on Flats.Houses_ID = Houses.Id
		where  Place_types.Id in (11, 12,14,15,16,17,18)
and 1=0

	group by Places.Id, Districts.Name, [Places].[Name], Place_types.Name, Places.Place_type_ID, Old_name, Territory

end


/*-- declare @str_id int = 4
-- @Claim_ID


	SELECT [Places].[Id]
		  ,Districts.Name as districts
		  ,[Places].[Name] as places_name
		  ,Place_types.Name as type_places
		  ,case when count(Flats.Number) = 0 or Places.Place_type_ID in (19)  then 'квартири відсутні' 
			else concat('Кількість квартир: ' , count(Flats.Number)) end as flats
		  ,Streets.Old_name
		  ,Streets.Territory
		  ,1 as sort
		  ,(select case when count(Id) > 0 then 'Відключен' end  
		    from Claim_SwitchOff_Address as csw where csw.Place_ID = Places.Id and csw.SwitchOff_finish is null) as is_swich
	  FROM [dbo].[Places]
		left join Districts on Districts.Id = Places.District_ID
		left join Houses on Houses.Id = Places.Street_id
		left join Streets on Streets.Street_Id = Houses.Street_id
		left join Place_types on Place_types.Id = Places.Place_type_ID
		left join Flats on Flats.Houses_ID = Houses.Id
		where  Place_types.Id in (11, 12,14,15,16,17,18)
-- 		and Places.Street_id in (select Id from Houses where Street_id = @str_id	) or Places.Street_id is null
and #filter_columns#

	group by Places.Id, Districts.Name, [Places].[Name], Place_types.Name, Places.Place_type_ID, Old_name, Territory
order by sort, places_name
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
*/
