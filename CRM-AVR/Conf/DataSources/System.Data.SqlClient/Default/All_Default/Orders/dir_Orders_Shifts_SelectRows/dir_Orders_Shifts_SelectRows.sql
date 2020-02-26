
SELECT [Shifts].[Id]
      ,[Shifts].[Name]
      ,[Shifts].[Team_ID]
      ,[Shifts].[Mechanism_ID]
      ,[Shifts].[Shift_date]
      ,[Shifts].[Plan_start_time]
      ,[Shifts].[Plan_end_time]
      ,[Shifts].[Fact_start_time]
      ,[Shifts].[Fact_end_time]
	 -- ,case when len (concat([Shifts].[Name],' - ',Organizations.Name))= 0 
	  --  then NULL else concat([Shifts].[Name],' - ',Organizations.Name)end as shift
	    ,Organizations.Name as shift
  FROM [dbo].[Shifts]
  left join Teams on Teams.Id = Shifts.Team_ID
  left join Organizations on Organizations.Id = Teams.Organization_ID
  where Teams.Organization_ID  @Org and
    [Shifts].[Shift_date] >= cast (getutcdate() as date)
    and
	 #filter_columns#
    -- #sort_columns#
    order by [Shifts].[Shift_date] 
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only