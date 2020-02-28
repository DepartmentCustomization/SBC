SELECT 
	 Claims.Id
	,org.Short_name as org_name
	,concat(convert(VARCHAR(10), cast(Claims.Created_at as date), 104),  ' ', 
	convert(VARCHAR(5),cast(Claims.Created_at as time), 108)) as Created_at
	,Claims.Claim_Number
	,Places.Name as place_name
	,SUBSTRING(Districts.Name, 1, 5 ) as district
	,Claim_types.Full_Name
	,Diameters.Size
	,( select concat(ROW_NUMBER() over(order by [Orders].[Id]), ') ') 
	            + concat(convert(VARCHAR(10), cast(Orders.Created_at as date), 104),  ' ', 
	convert(VARCHAR(5),cast(Orders.Created_at as time), 108)) + CHAR(10)
	        from Orders where  Orders.Claim_ID =  Claims.Id FOR XML PATH (''),type
	  ) as orders
	,Claims.Description
	/*,( select Action_types.Name + ' ('+  cast(count(Action_types.Id) as nvarchar(8)) +'); '    from Actions
			left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types on Action_types.Id = atpt.Action_type_Id
		where Actions.Claim_ID = Claims.Id and Actions.Do_not = 0 group by Action_types.Name FOR XML PATH ('')
	  ) as actions*/
	  ,( select Action_types.Name + ' ('+  cast(count(Action_types.Id) as nvarchar(8)) +'); ' + CHAR(13)   from Actions
			left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
			left join Action_types on Action_types.Id = atpt.Action_type_Id
		where Actions.Claim_ID = Claims.Id and Actions.Do_not = 0 group by Action_types.Name FOR XML PATH (''),type
	  ) as actions
	,Claims.Claim_class_ID
	,Claims.Status_ID
	FROM Claims
		left join Organizations org on org.Id = Claims.Response_organization_ID
		left join Claim_Order_Places cop on cop.Claim_ID = Claims.Id and cop.Is_first_place = 1
		left join Places on Places.Id = cop.Place_ID
		left join Districts on Districts.Id = Places.District_ID
		left join Diameters on Diameters.Id = Claims.Diameters_ID
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
	WHERE 
		convert(date, Claims.Created_at) >= @date_from 
        and convert(date,Claims.Created_at) <= isnull(@date_to, getdate())
        and [Claims].[Response_organization_ID] @OrgID
		and #filter_columns#
		#sort_columns#
--  		order by Claims.Id