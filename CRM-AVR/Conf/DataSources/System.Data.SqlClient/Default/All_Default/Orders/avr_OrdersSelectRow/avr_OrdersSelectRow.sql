

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
      ,Orders.Finish_at_actions
      
    --  ,Organizations.Name as organizations_name
     ,Organizations.Short_name as organizations_name
        , Organizations.Id as organizations_id
      ,st.Name as claim_status_name
        ,st.Id as claim_status_id
        ,Claims.Status_ID as claim_stat_id
      ,Claim_classes.Name as claim_classes_name
        ,Claim_classes.Id as claim_classes_id
        ,Organizations.Id as org_id
      ,Places.Id as places_id
        ,Places.Name as places_name
        ,Houses.Street_id
        ,Orders.Comment_result

		,case when User_id = '29796543-b903-48a6-9399-4840f6eac396' then N'Адміністратор'
			else con.Name
		 end as user_name
		,j.Job_name as position
		,case when  Orders.user_edit = '29796543-b903-48a6-9399-4840f6eac396' then N'Адміністратор'
			else con_close.Name
		 end as user_edit
		 ,j_close.Job_name as position_close
  FROM [dbo].[Orders]
	left join Claims on Claims.Id = Orders.Claim_ID
	left join Shifts on Shifts.Id = Orders.Shift_ID
	left join [Status] on Status.Id = Orders.Status_ID
	left join [Status] st on st.Id = Claims.Status_ID
	left join Claim_classes on Claim_classes.Id = Claims.Claim_class_ID
	left join Organizations on Organizations.Id = Claims.Response_organization_ID
	left join Claim_Order_Places on Claim_Order_Places.Orders_ID = Orders.Id
	left join Places on Places.Id = Claim_Order_Places.Place_ID
	left join Houses on Houses.Id = Places.Street_id
	left join Jobs as j on j.[Login] = Orders.[User_id]
	left join Jobs as j_close on j_close.[Login] = Orders.[user_edit]
	left join Contacts as con on con.external_Id = j.Contacts_ID
	left join Contacts as con_close on con_close.external_Id = j_close.Contacts_ID
where Orders.Id = @Id

-- select top 1
--       [user_edit]
--      from [dbo].[Orders_HistoryFull]
--      where order_id =  @Id
--      order by Log_Date desc