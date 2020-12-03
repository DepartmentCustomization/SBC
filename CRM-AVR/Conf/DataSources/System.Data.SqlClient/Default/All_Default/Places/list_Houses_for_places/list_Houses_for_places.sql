SELECT
	Houses.Id,
	concat(
		Houses.Name,
		CASE
			WHEN Old_name IS NULL THEN Old_name
			ELSE concat ('   (', Old_name, ')')
		END,
CASE
			WHEN Territory IS NULL THEN Territory
			ELSE concat (' (', Territory, ')')
		END
	) AS [Name]
FROM
	dbo.Houses
	LEFT JOIN dbo.Streets ON Streets.Street_Id = Houses.Street_id
WHERE
Houses.[Number] <> N'sys'
AND (Houses.[Is_Active] = 1
	OR Houses.[Is_Active] IS NULL)
AND #filter_columns#
	#sort_columns#
OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;