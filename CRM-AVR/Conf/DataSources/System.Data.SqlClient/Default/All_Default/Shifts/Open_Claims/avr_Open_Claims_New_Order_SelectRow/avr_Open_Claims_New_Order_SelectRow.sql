SELECT [Orders].[Id]
	,Orders.Claim_ID as claims_number
		--,claims.Id as claims_id Orders.Claim_ID
	,case when len(claims.Id) = 0 then NULL else claims.Id end as claims_id
	,Shifts.Name as shifts_name
		,Shifts.Id as shifts_Id
	,Status.Name as status_name
		,Status.Id as status_id
    ,[Orders].[Created_at]
	,[Orders].[Pushed_at]
      ,[Orders].[Start_at]
      ,[Orders].[Plan_duration]
      ,[Orders].[Finished_at]
      ,[Orders].[Closed_at]
      
     ,Organizations.Name as organizations_name
        , Organizations.Id as organizations_id
      ,st.Name as claim_status_name
        ,st.Id as claim_status_id
      ,Claim_classes.Name as claim_classes_name
        ,Claim_classes.Id as claim_classes_id
        ,Organizations.Id as org_id
  FROM [dbo].[Orders]
	left join Claims on Claims.Id = Orders.Claim_ID
	left join Shifts on Shifts.Id = Orders.Shift_ID
	left join Status on Status.Id = Orders.Status_ID
	left join Status st on st.Id = Claims.Status_ID
	left join Claim_classes on Claim_classes.Id = Claims.Claim_class_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID
--where Orders.Id = @Id