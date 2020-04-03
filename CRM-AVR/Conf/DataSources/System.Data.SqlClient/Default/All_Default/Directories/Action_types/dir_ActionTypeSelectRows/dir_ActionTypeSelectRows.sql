if @Claim_Id is not null
begin

SELECT distinct [Action_types].[Id]
      ,[Action_types].[Name]
      ,[Action_types].[Is_move]
      ,TypeAccess.Name as type_name
  FROM [dbo].[Action_types]
  left join [Claim_type_action_type] on [Claim_type_action_type].Action_type_id = [Action_types].[Id]
  left join TypeAccess on TypeAccess.id = Action_types.TypeAccess_ID 
WHERE Claim_type_action_type.Claim_type_id = 
(select top 1 Claim_type_ID from Claims
where id = @Claim_Id) 
and
    Action_types.TypeAccess_ID @TypeAccess
and
	 #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end
else
begin
SELECT distinct [Action_types].[Id]
      ,[Action_types].[Name]
      ,[Action_types].[Is_move]
      ,TypeAccess.Name as type_name
      ,Action_types.[Plan_duration]
    --   ,dateadd(hh, -3, Action_types.[Plan_duration]) as Plan_duration
      ,Units.ShortName
  FROM [dbo].[Action_types]
  left join [Claim_type_action_type] on [Claim_type_action_type].Action_type_id = [Action_types].[Id]
    left join TypeAccess on TypeAccess.id = Action_types.TypeAccess_ID 
    left join Units on Units.Id = Action_types.Units_Id
WHERE Action_types.TypeAccess_ID @TypeAccess
	and  #filter_columns#
     #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
end
