-- DECLARE @Id INT = 9126 ;
SELECT
  [Id],
  IIF(
    (
      SELECT
        Surname + ' ' + First_name
      FROM
        Contacts
      WHERE
        Id = (
          SELECT
            Contacts_ID
          FROM
            Jobs
          WHERE
            [Login] = [User]
        )
    ) IS NULL,
    (
      SELECT
        ISNULL(LastName + N' ', '') + ISNULL(FirstName + N' ', '')
      FROM [#system_database_name#].dbo.[User]
      --  CRM_AVR_System.dbo.[User]
      WHERE
        UserID = [User]
    ),
    (
      SELECT
        Surname + ' ' + First_name
      FROM
        Contacts
      WHERE
        Id = (
          SELECT
            Contacts_ID
          FROM
            Jobs
          WHERE
            [Login] = [User]
        )
    )
  ) AS [User],
  [Field],
  [New_Value],
  [Date]
FROM
  [dbo].[Claims_History]
WHERE
  Claims_ID = @Id
  AND #filter_columns#
      #sort_columns#
  OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;