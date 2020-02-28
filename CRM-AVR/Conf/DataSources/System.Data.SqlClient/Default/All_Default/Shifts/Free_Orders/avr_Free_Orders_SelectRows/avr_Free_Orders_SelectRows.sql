SELECT 
	   [Orders].[Id]
	   ,concat('Виїзд № ', [Orders].[Id]) as order_num
	   ,Orders.Created_at
      ,[Orders].[Start_at]
	  ,Places.Name
      ,[Orders].[Finished_at]
  FROM [dbo].[Orders]
	left join Claims on Claims.Id = Orders.Claim_ID
	left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
	Left join Places on Places.Id = Claim_Order_Places.Place_ID
WHERE Shift_ID is null
	and Claims.Response_organization_ID = @Id
	and Claim_Order_Places.Is_first_place = 1
	and Orders.Status_ID not in (9,10)
	and 	 
	  #filter_columns#
    -- #sort_columns#
    order by [Orders].[Start_at]
offset @pageOffsetRows rows fetch next @pageLimitRows rows only