IF @Claim_Id IS NOT NULL 
BEGIN
SELECT
  DISTINCT 
  [Action_types].[Id],
  [Action_types].[Name],
  [Action_types].[Is_move],
  TypeAccess.Name AS [type_name]
FROM
  [dbo].[Action_types]
  LEFT JOIN [Claim_type_action_type] ON [Claim_type_action_type].Action_type_id = [Action_types].[Id]
  LEFT JOIN TypeAccess ON TypeAccess.id = Action_types.TypeAccess_ID
WHERE
  Claim_type_action_type.Claim_type_id = (
    SELECT
      TOP 1 Claim_type_ID
    FROM
      Claims
    WHERE
      id = @Claim_Id
  )
  AND Action_types.TypeAccess_ID @TypeAccess
  AND #filter_columns#
      #sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY
END
ELSE 
BEGIN
SELECT
  DISTINCT 
  [Action_types].[Id],
  [Action_types].[Name],
  [Action_types].[Is_move],
  [TypeAccess].[Name] AS [type_name],
  [Action_types].[Plan_duration],
  [Units].[ShortName],
  [place_type] = STUFF(
       (SELECT N', ' + pt.[Name]
        FROM dbo.Action_types [at]
        INNER JOIN dbo.Action_type_Place_type at_pt ON [at].Id = at_pt.Action_type_Id
		INNER JOIN dbo.Place_types pt ON pt.Id = at_pt.Place_type_Id
        WHERE [at].Id = [Action_types].Id 
        FOR XML PATH('')), 1, 1, '')
FROM
  [dbo].[Action_types]
  LEFT JOIN [dbo].[Action_type_Place_type] ON [Action_type_Place_type].Action_type_Id = [Action_types].Id
  LEFT JOIN [dbo].[Place_types] ON [Place_types].Id = [Action_type_Place_type].Place_type_Id
  LEFT JOIN [dbo].[TypeAccess] ON [TypeAccess].id = Action_types.TypeAccess_ID
  LEFT JOIN [dbo].[Units] ON [Units].Id = Action_types.Units_Id
WHERE
  Action_types.TypeAccess_ID @TypeAccess
  AND #filter_columns#
      #sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY
END