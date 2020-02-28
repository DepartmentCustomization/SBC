
--set statistics io on

select
    Claims.Id
	,Claim_Number
	,org.Short_name as org_name
	,IIF(Claims.DisplayID = 2, 'МАРШРУТ ОБХІДНИКА', Places.Name) as Adress
	,(select count(Id) from Orders where Claim_ID = Claims.Id and convert(date,Orders.Pushed_at) = convert(date,getdate())
	) as orders
    ,Places.[Lattitude]
    ,Places.[Longitude]
    ,Districts.Name as District    
    ,Claim_types.Full_Name as ClaimType
    ,Diameters.Size
    -- ,concat(convert(nvarchar(10), cast(Claims.Created_at as date), 104),  ' ', 
-- 	convert(NVARCHAR(5),cast(Claims.Created_at as time), 108)) as Created_at
	,Claims.Created_at
    ,( SELECT TOP 1 [Comment_result] FROM [CRM_AVR_Analitics].[dbo].[Orders] where Claims.Id = Orders.Claim_ID order by Created_at desc ) as Comment
	,switch_places_name.[name] as [switch_places_name]
	,sequela_comm.comment as [description_sequela]
	,Claims.DisplayID
	
	from Claims
		left join Claim_Order_Places as cop on cop.Claim_ID = Claims.Id and cop.Is_first_place =1
		left join Places on Places.Id = cop.Place_ID
		left join Districts on Districts.Id = Places.District_ID
		left join Diameters on Diameters.Id = Claims.Diameters_ID
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
		left join Organizations as org on org.Id = Claims.Response_organization_ID
		left join  (select 
							p1.Claim_ID,
						(select rtrim(pp.Name) + N';' as 'data()' 
								from Claim_SwitchOff_Address p2 
										left join Places pp on pp.Id = p2.Place_ID
								where p2.Claim_ID = p1.Claim_ID for XML PATH('') ) as [name]
					from Claim_SwitchOff_Address p1 
					group by p1.Claim_ID
		            ) as switch_places_name  
	   on  switch_places_name.claim_id = Claims.Id
	   left join (select Claim_ID,
					(select rtrim([Description]) + N';' as 'data()'  from Sequela s2 where s2.Claim_ID = s1.Claim_ID for xml path('')) as comment
					from Sequela s1
					group by s1.Claim_ID
	   ) as sequela_comm on sequela_comm.Claim_ID = Claims.Id
	where Claims.Status_ID <> 5 
	and Claims.Response_organization_ID @Org_Id
	and #filter_columns#
	#sort_columns#







/*select
    Claims.Id
	,Claim_Number
	,org.Short_name as org_name
	,Places.Name as Adress
	,(select count(Id) from Orders where Claim_ID = Claims.Id and convert(date,Orders.Pushed_at) = convert(date,getdate())
	) as orders
    ,Places.[Lattitude]
    ,Places.[Longitude]
    ,Districts.Name as District    
    ,Claim_types.Full_Name as ClaimType
    ,Diameters.Size
    ,concat(convert(VARCHAR(10), cast(Claims.Created_at as date), 104),  ' ', 
	convert(VARCHAR(5),cast(Claims.Created_at as time), 108)) as Created_at
    ,( SELECT TOP 1 [Comment_result] FROM [CRM_AVR_Analitics].[dbo].[Orders] where Claims.Id = Orders.Claim_ID order by Created_at desc ) as Comment
	from Claims
		left join Claim_Order_Places as cop on cop.Claim_ID = Claims.Id and cop.Is_first_place =1
		left join Places on Places.Id = cop.Place_ID
		left join Districts on Districts.Id = Places.District_ID
		left join Diameters on Diameters.Id = Claims.Diameters_ID
		left join Claim_types on Claim_types.Id = Claims.Claim_type_ID
		left join Organizations as org on org.Id = Claims.Response_organization_ID
	where Claims.Status_ID <> 5 
    and Claims.Response_organization_ID @Org_Id
	and #filter_columns#
	#sort_columns#
    --order by Claims.Id asc
    
    */