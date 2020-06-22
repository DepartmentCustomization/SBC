--  DECLARE @Id INT = 93718;

DECLARE @placeLogID INT = (
    SELECT
        Id
    FROM
        dbo.[Places_LOG]
    WHERE
        Place_ID = @Id
);
DECLARE @entityData NVARCHAR(100) = (
    SELECT
        [Object]
    FROM
        dbo.[Places_LOG]
    WHERE
        Id = @placeLogID
);

DECLARE @entity NVARCHAR(20) = (
    SELECT
        value
    FROM
        STRING_SPLIT(@entityData, ' ')
    ORDER BY
        (
            SELECT
                1
        ) OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY
);

DECLARE @entityID INT = (
    SELECT
        value
    FROM
        STRING_SPLIT(@entityData, ' ')
    ORDER BY
        (
            SELECT
                1
        ) OFFSET 1 ROWS FETCH NEXT 1 ROW ONLY
);

IF(@entity = N'Заявка') 
BEGIN
SELECT
DISTINCT 
    @entity AS entityType,
    claim.[Claim_Number] AS entityRowNum,
    claim.Id AS entityRowId
FROM
    dbo.[Claims] [claim]
    INNER JOIN dbo.[Claim_Order_Places] [claim_place] ON [claim].Id = [claim_place].Claim_ID
WHERE
    claim.Id = @entityID
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END
ELSE IF(@entity = N'Маршрут') 
BEGIN
SELECT
DISTINCT 
    @entity AS entityType,
    [route].Number AS entityRowNum,
    RouteID AS entityRowId
FROM
     dbo.[Area] [area]
INNER JOIN dbo.[Route] [route] ON [route].Id = [area].RouteID
WHERE
    RouteID = @entityID
ORDER BY 1 
OFFSET @pageOffsetRows ROWS FETCH NEXT @pageLimitRows ROWS ONLY;
END