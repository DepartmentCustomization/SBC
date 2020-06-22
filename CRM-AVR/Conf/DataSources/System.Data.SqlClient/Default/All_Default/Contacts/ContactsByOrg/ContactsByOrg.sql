-- DECLARE @OrgID INT = 65005 ;
SELECT
    [Id],
    [Name]
FROM
    dbo.Contacts
WHERE
    Organisation_ID = @OrgID
    AND #filter_columns#
        #sort_columns#
    OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY ;