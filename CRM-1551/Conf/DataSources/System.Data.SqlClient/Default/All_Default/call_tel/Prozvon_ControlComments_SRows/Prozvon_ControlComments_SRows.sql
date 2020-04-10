SELECT Id, [Name]
  FROM [dbo].[ControlComments]
  WHERE [control_type_id]=2
  AND #filter_columns#
  #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only
