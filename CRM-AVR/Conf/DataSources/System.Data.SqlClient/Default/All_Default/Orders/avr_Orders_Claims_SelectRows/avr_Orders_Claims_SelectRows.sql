SELECT 
     [Orders].[Id]
     ,concat(N'Виїзд № ',ROW_NUMBER() over(order by [Orders].[Id]) ) as row_num
	,c.Name
	,[Orders].[Pushed_at] as Pushed_at -- Дата та час виїзду
    ,[Orders].[Start_at] as Start_at -- Дата та час початку

	,claims.Claim_Number
 FROM [dbo].[Orders]
	left join dbo.Claims on Claims.Id = Orders.Claim_ID
	left join [dbo].[Order_Jobs] as oj on oj.Order_id = Orders.Id and oj.Is_main = 1
	left join dbo.Jobs as j on j.Id = oj.Job_id 
	left join dbo.Contacts as c on c.external_Id = j.Contacts_ID
WHERE Claims.Id= @Id
and 
	 #filter_columns#
	 #sort_columns#
 offset @pageOffsetRows rows fetch next @pageLimitRows rows only


/* 25-11-2019
SELECT 
     [Orders].[Id]
     ,concat('Виїзд № ',ROW_NUMBER() over(order by [Orders].[Id]) ) as row_num
	,Shifts.Name as shifts_name
	,Shifts.Id as shifts_id
	,Status.Name as status_name
    ,CONVERT( VARCHAR( 10 ),[Orders].[Start_at], 104) as Start_at
	,Organizations.Short_name as organization_name
	,Organizations.Id as organization_id
	,CONVERT( VARCHAR( 10 ),[Orders].[Pushed_at], 104) as Pushed_at
	,claims.Claim_Number
 FROM [dbo].[Orders]
	left join Claims on Claims.Id = Orders.Claim_ID
	left join Shifts on Shifts.Id = Orders.Shift_ID
	left join Status on Status.Id = Orders.Status_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID
WHERE Claims.Id= @Id
and 
	 #filter_columns#
	 #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only
*/