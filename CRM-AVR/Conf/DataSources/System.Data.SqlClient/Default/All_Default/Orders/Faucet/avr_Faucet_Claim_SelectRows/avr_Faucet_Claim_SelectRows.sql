
SELECT [Faucet].[Id]
      ,act.Name as action_name
      ,Places.Name as Places_name
    --   ,cast([Faucet].[Start_from] as date) as [Start_from]
      ,[Faucet].[Start_from]
    --   ,cast([Faucet].[Finish_at] as date) as [Finish_at]
      ,[Faucet].[Finish_at]
      ,Diameters.Size
    --   ,[Faucet].[Claim_Id]
    --   ,[Faucet].[Order_Id]
  FROM [dbo].[Faucet]
	left join Action_types  as act on act.Id = Faucet.Action_types_Id
	left join Diameters on Diameters.Id = Faucet.Diametr_Id
	left join Places on Places.Id = Faucet.Place_Id
  where Claim_Id =  @claim_id
  and  #filter_columns#
	   --#sort_columns#
	   order by Diameters.Size,  Places.Name, [Faucet].[Start_from]
offset @pageOffsetRows rows fetch next @pageLimitRows rows only