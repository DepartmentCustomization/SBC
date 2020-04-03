SELECT [Action_types].[Id]
      ,[Action_types].[Name]
      ,[Action_types].[Is_move]
      ,[TypeAccess_ID]
      ,TypeAccess.name as type_name
    --   ,dateadd(hh, -3, Action_types.[Plan_duration]) as Plan_duration
    ,Action_types.[Plan_duration]
      ,Units.ShortName
      ,Units.Id as Units_Id
  FROM [dbo].[Action_types]
  left join TypeAccess on TypeAccess.id = Action_types.TypeAccess_ID
  left join Units on Units.Id = Action_types.Units_Id
WHERE Action_types.Id = @Id