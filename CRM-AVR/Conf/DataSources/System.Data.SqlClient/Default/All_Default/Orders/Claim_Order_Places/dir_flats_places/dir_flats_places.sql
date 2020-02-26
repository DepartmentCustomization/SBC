SELECT [Flats].[Id]
      ,concat(
		case when Streets.Name is null then Streets.Name else Streets.Name end,
		case when Houses.Name is null then Houses.Name else N' ' + Houses.Name end,
		case when Flats.Number is null then cast(Flats.Number as nvarchar) else N' кв. ' + cast(Flats.Number as nvarchar) end,
		case when Flats.Letter is null then cast (Flats.Letter as nvarchar) else N' літ. '+ cast (Flats.Letter as nvarchar) end
	  ) as [name]
  FROM [dbo].[Flats]
  left join Houses on Houses.Id = Flats.Houses_ID
  left join Streets on Streets.Id= Houses.Street_id
  WHERE  
    [Flats].Houses_ID = (select Street_id from Places  where id = @place_id)
  and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only