SELECT 
      convert(nvarchar(13), [Appeals].[Date], 103) as appeals_date
      ,count([Appeals].[Contact_ID]) as count_appeals
     -- ,[Appeals].Id
  FROM [dbo].[Appeals]
	left join Claims on Claims.Id = Appeals.Claim_ID
	left join Claim_Order_Places on Claim_Order_Places.Claim_ID = Claims.Id
	left join Places on Places.Id = Claim_Order_Places.Place_ID
	where Places.Id = @Id

	group by convert(nvarchar(13), [Appeals].[Date], 103)
 order by convert(nvarchar(13), [Appeals].[Date], 103) 
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only