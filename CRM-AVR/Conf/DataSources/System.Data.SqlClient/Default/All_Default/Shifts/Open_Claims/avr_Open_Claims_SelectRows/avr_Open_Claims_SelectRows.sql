SELECT [Claims].[Id]
      ,concat('Заявка № ',[Claims].[Claim_Number]) as Claim_Number
      ,[Claims].[Plan_start_date]
	  ,Places.Name
      ,[Claims].[Plan_finish_at]

  FROM [dbo].[Claims]
  left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
  left join Places on Places.Id = Claim_Order_Places.Place_ID
	where Claims.Status_ID in (1,2,3)
	and Claims.Id not in (
			SELECT [Claims].[Id]
			  FROM [dbo].[Claims]
			  left join Orders on Orders.Claim_ID = Claims.Id
			  where Claims.Status_ID in (1,2,3)
			  and ((Orders.Start_at <= getutcdate() and Orders.Closed_at is null)
			-- or Orders.Closed_at  <= getutcdate()
			  or [Claims].Plan_start_date >= getutcdate())
			)
		and [Claims].[Plan_start_date] is not null
	and Claims.Response_organization_ID = @Id
	and Claim_Order_Places.Is_first_place = 1
	and 	 
	  #filter_columns#
      --#sort_columns#
      order by [Claims].[Plan_start_date]
offset @pageOffsetRows rows fetch next @pageLimitRows rows only