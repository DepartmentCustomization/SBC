SELECT 
     [Orders].[Id]
	,Claims.Claim_Number
	    ,Claims.Id as claims_id
	,isnull(Shifts.Name,'') as shifts_name
	,Shifts.Id as shifts_id
	,Status.Name as status_name
    ,CONVERT( VARCHAR( 10 ),[Orders].[Created_at], 103) as Created_at
	,[Organizations].[Short_Name] as organization_name
	,Organizations.Id as organization_id
	,CONVERT( VARCHAR( 10 ),[Orders].[Pushed_at], 103) as Pushed_at
	,Orders.Plan_duration
 FROM [dbo].[Orders]
	left join Claims on Claims.Id = Orders.Claim_ID
	left join Shifts on Shifts.Id = Orders.Shift_ID
	left join Status on Status.Id = Orders.Status_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID
WHERE   Claims.Response_organization_ID @OrgID
 and	 #filter_columns#
	order by Status.Name desc
	-- #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only