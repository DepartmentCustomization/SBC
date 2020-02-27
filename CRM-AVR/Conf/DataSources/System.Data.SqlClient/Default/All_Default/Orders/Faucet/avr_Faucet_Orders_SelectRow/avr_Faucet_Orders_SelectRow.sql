SELECT [Faucet].[Id]
      ,act.Name as action_name
	  ,act.Id as action_id
      ,Places.Name as places_name
	  ,Places.Id as places_id
      ,[Faucet].[Start_from]
      ,[Faucet].[Finish_at]
      ,Diameters.Size
	  ,Diameters.Id as size_id
      ,[Faucet].[Claim_Id]
      ,[Faucet].[Order_Id]
  FROM [dbo].[Faucet]
	left join Action_types  as act on act.Id = Faucet.Action_types_Id
	left join Diameters on Diameters.Id = Faucet.Diametr_Id
	left join Places on Places.Id = Faucet.Place_Id
  where [Faucet].[Id] =  @Id