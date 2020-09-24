-- DECLARE @Id INT = 9182; 

SELECT
	[Orders].[Id],
	concat(
		N'Виїзд № ',
		ROW_NUMBER() OVER(
			ORDER BY
				[Orders].[Id]
		)
	) AS row_num,
	c.Name,
	[Orders].[Pushed_at] AS Pushed_at, -- Дата та час виїзду
	[Orders].[Start_at] AS Start_at, -- Дата та час початку
	claims.Claim_Number,
	[Orders].Comment_result
FROM
	[dbo].[Orders] Orders
	LEFT JOIN [dbo].[Claims] Claims ON Claims.Id = Orders.Claim_ID
	LEFT JOIN [dbo].[Order_Jobs] AS oj ON oj.Order_id = Orders.Id
		AND oj.Is_main = 1
	LEFT JOIN dbo.Jobs AS j ON j.Id = oj.Job_id
	LEFT JOIN dbo.Contacts AS c ON c.Id = j.Contacts_ID
		AND Contact_type_ID = 3
WHERE
	Claims.Id = @Id
	AND #filter_columns#
		#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;