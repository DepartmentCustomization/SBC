SELECT distinct
      [Houses].[Id]
	  ,Districts.Name as district
	  ,concat( Houses.Name, case when Old_name is null then Old_name
		else concat ('   (',Old_name,')')	end
		 ) as houses
	  ,(select IIF (count(Id) >= 1, concat('Кількість квартир: ', count(Id)), concat('Кількість квартир: ', 0))
	      from Flats where Flats.Houses_ID = Houses.Id) as flats
-- SELECT distinct
--       [Houses].[Id]
-- 	  ,Districts.Name as district
-- 	  ,concat(Streets.Name,' ', UkrName)  as streets_name
-- 	  ,Houses.Number
-- 	  ,Houses.Letter
-- 	  ,Houses.Name as houses
-- 	  ,(select IIF (count(Id) >= 1, concat('Кількість квартир: ', count(Id)), concat('Кількість квартир: ', 0))
-- 	      from Flats where Flats.Houses_ID = Houses.Id) as flats
  FROM [dbo].[Houses]
	left join Streets on Streets.Street_id = Houses.Street_id
	left join Street_Type on Street_Type.TypeId = Streets.Street_type_id
	left join Districts on Districts.Id = Houses.District_id
WHERE 
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only