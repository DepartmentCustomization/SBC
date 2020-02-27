SELECT distinct
	DENSE_RANK() OVER(ORDER BY Claims.Claim_Number) as rnk_dense
	 ,Claims.Claim_Number
	,Places.Name as places_name
	,Districts.Name as districts_name
	,org.Name as organization_name
 	,FORMAT (cast(Claims.Created_at as datetime), 'dd.MM.yyyy HH:mm:ss', 'en-US' ) as Created_at
	,FORMAT (cast(Claims.Fact_finish_at as datetime), 'dd.MM.yyyy HH:mm:ss', 'en-US' ) as Fact_finish_at
	,Diameters.Size
	,ct.Full_Name
	,cc.Name as classes_name
	,Action_types.Name as action_name
	,FORMAT (cast(Actions.Start_from as datetime), 'dd.MM.yyyy HH:mm:ss', 'en-US' ) as Start_from 
	,Mechanisms.Name as MechanismsName
	,Materials.Name as MaterialsName

	,/*Claims.Created_at	  */NULL as [Filter_Created_at]
	,/*Claims.Status_ID 	  */NULL as [Filter_Status_ID]
	,/*cop.Place_ID			  */NULL as [Filter_Place_ID]
	,/*Streets.Id			  */NULL as [Filter_Street_Id]
	,/*Districts.Id			  */NULL as [Filter_Districts_Id]
	,/*Claims.Claim_class_ID  */NULL as [Filter_Claim_class_Id]
	,/*Claims.Claim_type_ID   */NULL as [Filter_Claim_type_ID]
	,/*Claims.Contact_ID      */NULL as [Filter_Contacts_ID]
	,/*Claims.[Description]   */NULL as [Filter_Description]
	,/*Claims.Diameters_ID    */NULL as [Filter_Diameters_ID]
	FROM Claims 
		left join Orders on Orders.Claim_ID = Claims.Id
		left join Actions on Actions.Order_ID = Orders.Id and Actions.Claim_ID = Claims.Id
		left join Action_type_Place_type atpt on atpt.Id = Actions.Action_type_ID
		left join Action_types on Action_types.Id = atpt.Action_type_Id
		left join Claim_Order_Places cop on cop.Claim_ID = Claims.Id
		left join Places on Places.Id = cop.Place_ID
		left join Houses on Houses.Id = Places.Street_id
		left join Streets on Streets.Street_id = Houses.Street_Id
		left join Districts on Districts.Id = Places.District_ID
		left join Organizations org on org.Id = Claims.Response_organization_ID
		left join Claim_classes cc on cc.Id = Claims.Claim_class_ID
		left join Claim_types ct on ct.Id = Claims.Claim_type_ID
		left join Diameters on Diameters.Id = Claims.Diameters_ID
		left join Moves on Moves.Action_ID = Actions.Id
		left join Mechanisms on Mechanisms.Id = Moves.Mechanism_ID
		left join Action_Materials on Action_Materials.Action_ID = Actions.Id
		left join Materials on Materials.Id = Action_Materials.Material_ID
where #filter_columns#
and cast(Claims.Created_at as date) >= cast(@date_from as date) and cast(Claims.Created_at as date) <= dateadd(day,1,cast(@date_to as date))
and ct.Full_Name like N'%'+@filter_Claim_types+'%'
order by Claims.Claim_Number