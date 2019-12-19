/*
declare @Phone nvarchar(10) = N'0993896537'
declare @Email nvarchar(100) = N'email@com.ua'
declare @HouseId nvarchar(128)  = N'54185f30-371b-11e7-99db-000c29ff5864'
declare @Flat nvarchar(10) = N''
*/

SELECT  [applicants].[Id]
      ,[applicants].[PIB]
	    ,case when [applicants].[House_id] is null then null 
		      when isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'')+N', '+isnull([houses].[name_ofFirstLevel_shortToponym],N'')+N' '+isnull([houses].[name_ofFirstLevel_fullName],N'') = N' ,  ' then null
	        else isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'')+N', '+isnull([houses].[name_ofFirstLevel_shortToponym],N'')+N' '+isnull([houses].[name_ofFirstLevel_fullName],N'') end as Adress
      ,case when isnull([applicants].[Phone1],N'')+N', '+isnull([applicants].[Phone2],N'') = N', '
	        then null else isnull([applicants].[Phone1],N'')+ case when len(isnull([applicants].[Phone2],N''))=0 then N'' else N', '+isnull([applicants].[Phone2],N'') end end as Phones

    ,[applicants].[Phone1]
    ,[applicants].[Phone2]
    ,[applicants].[EMail]
    ,[houses].[id] as [houses_id]
    ,isnull([houses].[name_ofFirstLevel_fullName],N'') as [houses_name]
    ,[streets].[id] as [streets_id]
    ,isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'') as [streets_name]
    ,[applicants].[Flat]
    ,isnull([streets].[name_shortToponym],N'')+N' '+isnull([streets].[name_fullName],N'') as [streets_name2]
    ,isnull([houses].[name_ofFirstLevel_fullName],N'') as [houses_name2]
  FROM [dbo].[applicants]
  left join [dbo].[houses] on [houses].[id] = [applicants].[House_id]
  left join [dbo].[streets] on [streets].[id] = [houses].[ofStreet_id]
  where ([applicants].[Phone1] = @Phone or [applicants].[Phone2] = @Phone)
  or [applicants].[EMail] = @Email
  or (([applicants].[House_id] = CONVERT(uniqueidentifier,@HouseId) and ([applicants].[Flat] = @Flat or len(isnull(@Flat,N''))=0)))
  /*and  #filter_columns#
  #sort_columns#*/
  order by 2
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
option (OPTIMIZE FOR UNKNOWN)