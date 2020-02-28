SELECT [Moves].[Id]
	 ,Orders.Id as orders_id
	 ,Organizations.Name as organizations_name
	 ,Orders.Created_at
	 ,Status.Name as status_name
  FROM [dbo].[Moves]
	left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
	left join Actions on Actions.Id = Moves.Action_ID
	left join Orders on Orders.Id = Actions.Order_ID
	left join Claims on Claims.Id = Orders.Claim_ID
	left join Status on Status.Id = Claims.Status_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID
WHERE  Moves.Mechanism_ID = @Id
	and
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only