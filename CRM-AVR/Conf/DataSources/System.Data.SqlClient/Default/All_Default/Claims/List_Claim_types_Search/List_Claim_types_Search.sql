DECLARE @TypeId INT = (
	SELECT
		TOP 1 Claim_types.[Id]
	FROM
		[dbo].[Claim_types]
	WHERE
		#filter_columns#) ;
		IF @TypeId = 1 
		BEGIN
		WITH [Parent_сlaim_types] AS (
			SELECT
				Claim_types.[Id],
				Claim_types.[Parent_сlaim_types_ID],
				Claim_types.[Claim_class_ID],
				Claim_types.[Name],
				Claim_types.[Full_Name],
				Claim_types.Sort_index,
				Claim_types.TypeAccess_ID AS TypeAccessId
			FROM
				[dbo].[Claim_types] Claim_types
			WHERE
				Is_delete != 1
				AND Claim_types.TypeAccess_ID @typeClaim
				AND #filter_columns#
		),
		[Child_claim_types] AS (
			SELECT
				[Id],
				[Parent_сlaim_types_ID],
				[Claim_class_ID],
				[Name],
				[Full_Name],
				Sort_index,
				TypeAccessId
			FROM
				[Parent_сlaim_types]
			WHERE
				TypeAccessId @typeClaim
			UNION
			ALL
			SELECT
				[Claim_types].[Id],
				[Claim_types].[Parent_сlaim_types_ID],
				[Claim_types].[Claim_class_ID],
				[Claim_types].[Name],
				[Claim_types].[Full_Name],
				[Claim_types].[Sort_index],
				Claim_types.TypeAccess_ID
			FROM
				[dbo].[Claim_types]
			WHERE
				EXISTS(
					SELECT
						1
					FROM
						[Parent_сlaim_types]
					WHERE
						[Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID]
						AND TypeAccessId @typeClaim
				)
		)
	SELECT
		[Id],
		[Parent_сlaim_types_ID],
		[Claim_class_ID],
		[Name],
		[Full_Name],
		TypeAccessId
	FROM
		[Child_claim_types]
	WHERE
		TypeAccessId @typeClaim
	ORDER BY
		Sort_index
END
ELSE 
BEGIN 
WITH [Parent_сlaim_types] AS (
	SELECT
		Claim_types.[Id],
		Claim_types.[Parent_сlaim_types_ID],
		Claim_types.[Claim_class_ID],
		Claim_types.[Name],
		Claim_types.[Full_Name],
		Claim_types.Sort_index,
		Claim_types.TypeAccess_ID AS TypeAccessId
	FROM
		[dbo].[Claim_types] Claim_types
	WHERE
		Is_delete != 1
		AND Claim_types.TypeAccess_ID @typeClaim
		AND #filter_columns#
),
[Child_claim_types] AS (
	SELECT
		[Id],
		[Parent_сlaim_types_ID],
		[Claim_class_ID],
		[Name],
		[Full_Name],
		Sort_index,
		TypeAccessId
	FROM
		[Parent_сlaim_types]
	UNION
	ALL
	SELECT
		[Claim_types].[Id],
		[Claim_types].[Parent_сlaim_types_ID],
		[Claim_types].[Claim_class_ID],
		[Claim_types].[Name],
		[Claim_types].[Full_Name],
		[Claim_types].[Sort_index],
		0 AS TypeAccessId
	FROM
		[dbo].[Claim_types]
	WHERE
		Claim_types.Id IN (
			SELECT
				Id
			FROM
				[Parent_сlaim_types]
			WHERE
				[Parent_сlaim_types].[Id] = [Claim_types].[Parent_сlaim_types_ID]
		)
)
SELECT
	[Id],
	[Parent_сlaim_types_ID],
	[Claim_class_ID],
	[Name],
	[Full_Name],
	TypeAccessId
FROM
	[Child_claim_types]
WHERE
	#filter_columns#
	#sort_Columns#
	OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY ;
END