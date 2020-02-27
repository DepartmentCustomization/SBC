	SELECT distinct 
		  Place_types.Name as places_type_name
		 ,Districts.Name as districts_name
		 ,Places.Name as places_name
		,Flats.Number as flats
		,Claim_Order_Places.Id
	FROM  Orders 	
		left join Claim_Order_Places on Claim_Order_Places.Orders_ID = Orders.Id
		left join Places on Places.Id = Claim_Order_Places.Place_ID
		left join Flats on Flats.Id = Claim_Order_Places.Flats_ID
		left join Districts on Districts.Id = Places.District_ID
		left join Place_types on Place_types.Id = Places.Place_type_ID
	WHERE Claim_Order_Places.Orders_ID = @Id
	and Places.Id is not null
-- 	and Claim_Order_Places.Is_first_place <> 1
	and 
	#filter_columns#
     #sort_columns#
offset @pageOffsetRows rows fetch next @pageLimitRows rows only

/* до 26-11-2019
select distinct * from (
 SELECT distinct
		 Place_types.Name as places_type_name
	    ,Districts.Name as districts_name
		,Places.Name as places_name
		,'' as flats
	FROM Actions
		left join Places on Places.Id = Actions.Place_ID
		left join Districts on Districts.Id = Places.District_ID
		left join Place_types on Place_types.Id = Places.Place_type_ID
	WHERE Actions.Order_ID = @Id
	and Places.Id is not null

union all

	SELECT distinct 
		 Place_types.Name as places_type_name
		,Districts.Name as districts_name
		,case 
			when Actions.Place_ID = Moves.Start_place_ID then pl2.Name else Places.Name
			--when Actions.Place_ID = Moves.Finish_place_ID then Places.Name
 		end	as places_name
		,'' as flats
	FROM Actions	
		left join Moves on Moves.Action_ID = Actions.Id
		left join Places on Places.Id = Moves.Start_place_ID
		left join Places pl2 on pl2.Id = Moves.Finish_place_ID
		left join Districts on Districts.Id = Places.District_ID
		left join Place_types on Place_types.Id = Places.Place_type_ID
	WHERE Actions.Order_ID = @Id
	and Places.Id is not null

union all

	SELECT distinct 
		  Place_types.Name as places_type_name
		 ,Districts.Name as districts_name
		 ,Places.Name as places_name
		,Flats.Number as flats
	FROM  Orders 	
		left join Claim_Order_Places on Claim_Order_Places.Orders_ID = Orders.Id
		left join Places on Places.Id = Claim_Order_Places.Place_ID
		left join Flats on Flats.Id = Claim_Order_Places.Flats_ID
		left join Districts on Districts.Id = Places.District_ID
		left join Place_types on Place_types.Id = Places.Place_type_ID
	WHERE Claim_Order_Places.Orders_ID = @Id
	and Places.Id is not null
) as tab1
	where 
	#filter_columns#
     #sort_columns#
-- offset @pageOffsetRows rows fetch next @pageLimitRows rows only
*/