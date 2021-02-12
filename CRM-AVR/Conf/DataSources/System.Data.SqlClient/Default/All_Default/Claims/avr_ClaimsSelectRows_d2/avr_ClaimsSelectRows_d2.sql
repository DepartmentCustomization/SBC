SELECT DISTINCT 
	[Claims].[Id],
	[Claims].[Claim_Number],
	[Organizations].[Short_Name] AS Organization_name,
	[Route].Number,
	[Claim_content].[WalkerName],
	[Claims].[Created_at]
FROM
	[dbo].[Claims] [Claims]
	LEFT JOIN [dbo].[Organizations] [Organizations] ON [Organizations].[Id] = [Claims].[Response_organization_ID]
	LEFT JOIN [dbo].[Claim_content] ON [Claims].Id=[Claim_content].Claim_Id
	LEFT JOIN [dbo].[Route] ON [Claim_content].RouteID=[Route].Id
WHERE
	DisplayID = 2 --and [Organizations].Id @OrgID
	AND #filter_columns#
		#sort_columns#
	OFFSET @pageOffsetRows ROWS FETCH next @pageLimitRows ROWS ONLY;