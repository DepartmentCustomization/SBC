
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
    --,  (select  case  when count(Id)=0 then 'Ні' else 'Так' end as offAdr 
    --        from Claim_SwitchOff_Address where Faucet_ID in (select Id from Faucet where Order_Id = @Order_Id) ) as sign
	,case when sign is null then 'Ні'
		when sign is not null then 'Так'  end as sign
  FROM [dbo].[Faucet]
	left join Action_types  as act on act.Id = Faucet.Action_types_Id
	left join Diameters on Diameters.Id = Faucet.Diametr_Id
	left join Places on Places.Id = Faucet.Place_Id
	left join (select Faucet_ID as sign from Faucet 
				left join Claim_SwitchOff_Address as sff on sff.Faucet_ID = Faucet.Id
				where Order_Id = @Order_Id group by Faucet_ID ) as t1  on  t1.sign = [Faucet].Id
  where Order_Id =  @Order_Id
  and  #filter_columns#
	   --#sort_columns#
	   order by Diameters.Size,  Places.Name, [Faucet].[Start_from]
offset @pageOffsetRows rows fetch next @pageLimitRows rows only