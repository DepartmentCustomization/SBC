SELECT 
	Claims.Id
	
	,concat('# ', Claims.Claim_Number , 
	    '  від ' , FORMAT (cast(Claims.Created_at as date), 'dd.MM.yyyy', 'en-US'),
	    ' , тип заявки: ',ct.Full_Name,
	    ' , статус: ', Status.Name,
	    ', діаметр: ',isnull(Diameters.Size, '0')) as Claim_Number
	    
	 ,concat( org.Name,'. Oпис - ', Claims.Description ) as organization_name

	,concat(Districts.Name, ' ', Places.Name  )as places_name

	,Orders.Id as order_number
	,FORMAT (cast(Orders.Pushed_at as date), 'dd.MM.yyyy', 'en-US' ) as Pushed_at
	,Shifts.Name as shifts_name

	--,ct.Full_Name
-- 	,Diameters.Size
-- 	,Claims.Description
	,Action_types.Name as action_name
	,Claims.Claim_class_ID
	,Claims.Status_ID
	FROM Claims 
		left join Orders on Orders.Claim_ID = Claims.Id
		left join Actions on Actions.Order_ID = Orders.Id and Actions.Claim_ID = Claims.Id
		left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
		left join Action_types on Action_types.Id = atpt.Action_type_Id

		left join Claim_Order_Places cop on cop.Claim_ID = Claims.Id
		left join Places on Places.Id = cop.Place_ID
		left join Districts on Districts.Id = Places.District_ID

		left join Organizations org on org.Id = Claims.Response_organization_ID
		left join Shifts on Shifts.Id = Orders.Shift_ID

		left join Claim_types ct on ct.Id = Claims.Claim_type_ID
		left join Diameters on Diameters.Id = Claims.Diameters_ID
		left join Status on Status.Id = Claims.Status_ID
	where 
-- 	Claims.Status_ID not in (5,4,6) and 
	convert(date, Claims.Created_at) >= @date_from 
        and convert(date,Claims.Created_at) <= isnull(@date_to, getdate())
        and Actions.Do_not != 1
		and #filter_columns#
 		order by Claims.Claim_Number